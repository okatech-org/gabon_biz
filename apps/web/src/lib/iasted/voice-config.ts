// ─── Voice Configuration ─────────────────────────────────────────

/** Optimization constants */
export const IASTED_CONFIG = {
  USE_LOCAL_ROUTER: true,
  USE_FAQ_CACHE: true,
  MAX_CONVERSATION_HISTORY: 10,
  MAX_RESPONSE_TOKENS_VOICE: 500,
  MAX_RESPONSE_TOKENS_CHAT: 1000,
  AUTO_DISCONNECT_IDLE_MS: 120_000, // 2 minutes
  MIN_TRANSCRIPT_LENGTH: 3,
  LOCAL_CONFIDENCE_THRESHOLD: 0.6,
};

/** Session storage key for greeting persistence */
export const SESSION_GREETING_KEY = 'iasted_gabon_biz_greeting';

/** Get time period for greeting */
export function getTimePeriod(): 'morning' | 'afternoon' | 'evening' {
  const hour = new Date().getHours();
  if (hour >= 5 && hour < 12) return 'morning';
  if (hour >= 12 && hour < 18) return 'afternoon';
  return 'evening';
}

/** Get textual greeting for current time */
export function getTimeGreeting(): string {
  const period = getTimePeriod();
  if (period === 'morning') return 'Bonjour';
  if (period === 'afternoon') return 'Bon après-midi';
  return 'Bonsoir';
}

/** Build voice greeting text — varied per time period, formal (vouvoiement) */
export function getVocalGreeting(): string {
  const greetings: Record<string, string[]> = {
    morning: [
      'Bonjour ! Je suis iAsted, votre assistant IA sur GABON BIZ. Comment puis-je vous aider ce matin ?',
      "Bonjour ! Que puis-je faire pour vous aujourd'hui ?",
      'Bonjour et bienvenue sur GABON BIZ ! Je suis iAsted, à votre service.',
      "Bonjour ! C'est iAsted. Dites-moi ce dont vous avez besoin.",
    ],
    afternoon: [
      'Bon après-midi ! Je suis iAsted, votre assistant. Comment puis-je vous aider ?',
      'Bon après-midi ! iAsted à votre service. Que recherchez-vous ?',
      'Bon après-midi ! Dites-moi comment je peux vous assister.',
      "Bon après-midi ! Je suis prêt à vous aider. Qu'est-ce que je peux faire pour vous ?",
    ],
    evening: [
      'Bonsoir ! Je suis iAsted, votre assistant IA gabonais. Comment puis-je vous aider ?',
      "Bonsoir ! Qu'est-ce que je peux faire pour vous ce soir ?",
      'Bonsoir et bienvenue ! iAsted à votre écoute.',
      'Bonsoir ! Dites-moi ce dont vous avez besoin, je suis là pour ça.',
    ],
  };
  const period = getTimePeriod();
  const pool = greetings[period];
  return pool[Math.floor(Math.random() * pool.length)];
}

/** Strip markdown for TTS reading */
export function stripMarkdownForTTS(md: string): string {
  return md
    .replace(/\*\*(.*?)\*\*/g, '$1')
    .replace(/\*(.*?)\*/g, '$1')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/^[-*•] /gm, '')
    .replace(/^#{1,6} /gm, '')
    .replace(/\p{Emoji_Presentation}/gu, '')
    .replace(/\n{2,}/g, '. ')
    .replace(/\n/g, '. ')
    .trim();
}
