// ─── Simple In-Memory Rate Limiter for iAsted API Routes ─────────
// Uses a sliding window per IP address. Resets on server restart.
// For production, consider Redis-based rate limiting.

interface RateEntry {
  count: number;
  resetAt: number;
}

const rateLimitMap = new Map<string, RateEntry>();

// Clean up stale entries every 5 minutes
let lastCleanup = Date.now();
function cleanup() {
  const now = Date.now();
  if (now - lastCleanup < 300_000) return; // Every 5 min
  lastCleanup = now;
  for (const [key, entry] of rateLimitMap) {
    if (entry.resetAt < now) rateLimitMap.delete(key);
  }
}

/**
 * Check if a request should be rate limited.
 * @param identifier - Unique identifier (IP + optional role)
 * @param maxRequests - Max requests per window
 * @param windowMs - Time window in milliseconds (default: 60s)
 * @returns { allowed: boolean, remaining: number, retryAfterMs?: number }
 */
export function checkRateLimit(
  identifier: string,
  maxRequests: number,
  windowMs: number = 60_000
): { allowed: boolean; remaining: number; retryAfterMs?: number } {
  cleanup();
  const now = Date.now();
  const entry = rateLimitMap.get(identifier);

  if (!entry || entry.resetAt < now) {
    // New window
    rateLimitMap.set(identifier, { count: 1, resetAt: now + windowMs });
    return { allowed: true, remaining: maxRequests - 1 };
  }

  if (entry.count >= maxRequests) {
    return {
      allowed: false,
      remaining: 0,
      retryAfterMs: entry.resetAt - now,
    };
  }

  entry.count++;
  return { allowed: true, remaining: maxRequests - entry.count };
}

/**
 * Rate limit constants per route type.
 * Conservative defaults — adjust based on usage patterns.
 */
export const RATE_LIMITS = {
  /** /api/chat/stream — 30 requests per minute */
  chat: { maxRequests: 30, windowMs: 60_000 },
  /** /api/voice/tts — 20 requests per minute (OpenAI cost) */
  tts: { maxRequests: 20, windowMs: 60_000 },
  /** /api/voice/transcribe — 20 requests per minute (Whisper cost) */
  transcribe: { maxRequests: 20, windowMs: 60_000 },
} as const;

/**
 * Helper to extract IP from Next.js request (handles proxies).
 */
export function getRequestIP(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) return forwarded.split(',')[0].trim();
  const realIp = request.headers.get('x-real-ip');
  if (realIp) return realIp;
  return 'unknown';
}

/**
 * Returns a 429 Response if rate limited, or null if allowed.
 */
export function rateLimitResponse(
  request: Request,
  routeType: keyof typeof RATE_LIMITS
): Response | null {
  const ip = getRequestIP(request);
  const { maxRequests, windowMs } = RATE_LIMITS[routeType];
  const result = checkRateLimit(`${routeType}:${ip}`, maxRequests, windowMs);

  if (!result.allowed) {
    return new Response(
      JSON.stringify({
        error: 'Trop de requêtes. Réessaie dans un moment.',
        retryAfterMs: result.retryAfterMs,
      }),
      {
        status: 429,
        headers: {
          'Content-Type': 'application/json',
          'Retry-After': String(Math.ceil((result.retryAfterMs || 60000) / 1000)),
        },
      }
    );
  }

  return null;
}

// ─── Daily Role-Based Quotas ─────────────────────────────────────
// Uses ROLE_QUOTAS from types/iasted.ts to enforce per-user daily limits.

const ROLE_QUOTAS: Record<string, { voicePerDay: number; textPerDay: number }> = {
  anonymous:     { voicePerDay: 50,  textPerDay: 100 },
  citoyen:       { voicePerDay: 100, textPerDay: 200 },
  entrepreneur:  { voicePerDay: 200, textPerDay: 500 },
  investisseur:  { voicePerDay: 200, textPerDay: 500 },
  agent_menudi:  { voicePerDay: 500, textPerDay: 1000 },
  admin:         { voicePerDay: 9999, textPerDay: 9999 },
};

const DAY_MS = 86_400_000; // 24 hours

/**
 * Check daily quota for a user role.
 * @param identifier - User identifier (IP or user ID)
 * @param role - User role from auth
 * @param isVoice - Whether this is a voice request (vs text)
 * @returns 429 Response if quota exceeded, null if allowed
 */
export function checkDailyQuota(
  identifier: string,
  role: string,
  isVoice: boolean
): Response | null {
  const quota = ROLE_QUOTAS[role] || ROLE_QUOTAS.anonymous;
  const maxRequests = isVoice ? quota.voicePerDay : quota.textPerDay;
  const key = `quota:${role}:${isVoice ? 'voice' : 'text'}:${identifier}`;

  const result = checkRateLimit(key, maxRequests, DAY_MS);

  if (!result.allowed) {
    return new Response(
      JSON.stringify({
        error: `Quota journalier atteint (${maxRequests} ${isVoice ? 'requêtes vocales' : 'messages'}/jour pour le rôle ${role}). Connecte-toi ou change de profil pour plus de quota.`,
        quota: { role, max: maxRequests, remaining: 0, isVoice },
      }),
      {
        status: 429,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }

  return null;
}

/**
 * Extract user role from request cookies (JWT-based auth).
 * Falls back to 'anonymous' if no valid session.
 */
export function extractUserRole(request: Request): { role: string; userId: string } {
  try {
    const cookie = request.headers.get('cookie') || '';
    const sessionMatch = cookie.match(/gabon_biz_session=([^;]+)/);
    if (sessionMatch) {
      // JWT payload is base64 encoded in the second segment
      const payload = JSON.parse(atob(sessionMatch[1].split('.')[1]));
      return {
        role: payload.activeProfile || payload.role || 'anonymous',
        userId: payload.sub || payload.id || 'unknown',
      };
    }
  } catch {
    // Invalid cookie/JWT — treated as anonymous
  }
  return { role: 'anonymous', userId: 'anonymous' };
}

/**
 * Combined rate limit + daily quota check.
 * Use this instead of rateLimitResponse for quota-aware routes.
 */
export function rateLimitWithQuota(
  request: Request,
  routeType: keyof typeof RATE_LIMITS,
  isVoice: boolean
): Response | null {
  // Skip all limits in development (localhost)
  const ip = getRequestIP(request);
  if (ip === '127.0.0.1' || ip === '::1' || ip === 'localhost' || ip === 'unknown') {
    return null;
  }

  // 1. Per-minute rate limit (anti-abuse)
  const rateLimited = rateLimitResponse(request, routeType);
  if (rateLimited) return rateLimited;

  // 2. Daily role-based quota
  const { role, userId } = extractUserRole(request);
  const identifier = userId !== 'anonymous' ? userId : ip;
  const quotaLimited = checkDailyQuota(identifier, role, isVoice);
  if (quotaLimited) return quotaLimited;

  return null;
}
