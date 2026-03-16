// ─── Conversation Persistence Layer ──────────────────────────────
// Stores chat sessions in localStorage with auto-pruning.

const STORAGE_KEY = 'iasted_conversations';
const CURRENT_KEY = 'iasted_current_session';
const MAX_SESSIONS = 20;
const MAX_MESSAGES_PER_SESSION = 50;

export interface StoredMessage {
  role: 'user' | 'model';
  content: string;
  timestamp: number;
  feedback?: 'up' | 'down';
}

export interface ConversationSession {
  id: string;
  messages: StoredMessage[];
  createdAt: number;
  updatedAt: number;
  summary: string; // First user message as summary
  page: string; // Page where conversation started
}

/** Generate a simple session id */
function generateSessionId(): string {
  return `session_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
}

/** Get all stored sessions (newest first) */
export function getSessionHistory(): ConversationSession[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const sessions: ConversationSession[] = JSON.parse(raw);
    return sessions.sort((a, b) => b.updatedAt - a.updatedAt);
  } catch {
    return [];
  }
}

/** Get current active session ID */
export function getCurrentSessionId(): string | null {
  try {
    return localStorage.getItem(CURRENT_KEY);
  } catch {
    return null;
  }
}

/** Load messages from the current session */
export function loadCurrentConversation(): StoredMessage[] {
  try {
    const sessionId = getCurrentSessionId();
    if (!sessionId) return [];
    const sessions = getSessionHistory();
    const session = sessions.find((s) => s.id === sessionId);
    return session?.messages || [];
  } catch {
    return [];
  }
}

/** Save messages to current session (creates one if needed) */
export function saveConversation(messages: StoredMessage[], page: string = '/'): string {
  try {
    let sessions = getSessionHistory();
    let sessionId = getCurrentSessionId();
    const now = Date.now();

    // Truncate messages to limit
    const truncated = messages.slice(-MAX_MESSAGES_PER_SESSION);

    // Find summary from first user message
    const firstUserMsg = truncated.find((m) => m.role === 'user');
    const summary = firstUserMsg
      ? firstUserMsg.content.replace(/^🎙️\s*/, '').slice(0, 80)
      : 'Conversation';

    if (sessionId) {
      // Update existing session
      const idx = sessions.findIndex((s) => s.id === sessionId);
      if (idx >= 0) {
        sessions[idx].messages = truncated;
        sessions[idx].updatedAt = now;
        sessions[idx].summary = summary;
      } else {
        // Session was pruned — create new
        sessionId = generateSessionId();
        sessions.unshift({
          id: sessionId,
          messages: truncated,
          createdAt: now,
          updatedAt: now,
          summary,
          page,
        });
      }
    } else {
      // Create new session
      sessionId = generateSessionId();
      sessions.unshift({
        id: sessionId,
        messages: truncated,
        createdAt: now,
        updatedAt: now,
        summary,
        page,
      });
    }

    // Prune old sessions
    if (sessions.length > MAX_SESSIONS) {
      sessions = sessions.slice(0, MAX_SESSIONS);
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(sessions));
    localStorage.setItem(CURRENT_KEY, sessionId);
    return sessionId;
  } catch {
    return '';
  }
}

/** Start a new conversation (archive current) */
export function startNewConversation(): void {
  try {
    localStorage.removeItem(CURRENT_KEY);
  } catch {
    // ignore
  }
}

/** Record feedback on a message */
export function saveFeedback(messageIndex: number, feedback: 'up' | 'down'): void {
  try {
    const sessions = getSessionHistory();
    const sessionId = getCurrentSessionId();
    if (!sessionId) return;
    const session = sessions.find((s) => s.id === sessionId);
    if (!session || !session.messages[messageIndex]) return;
    session.messages[messageIndex].feedback = feedback;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(sessions));
  } catch {
    // ignore
  }
}

/** Check if this is a first-time user (no conversation history) */
export function isFirstTimeUser(): boolean {
  return getSessionHistory().length === 0;
}

/** Get count of past sessions */
export function getSessionCount(): number {
  return getSessionHistory().length;
}
