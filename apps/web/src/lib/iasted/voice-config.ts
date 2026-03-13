import type { VoiceConfig } from '@/types/iasted';

// ─── Voice Configuration ─────────────────────────────────────────

export const DEFAULT_VOICE_CONFIG: VoiceConfig = {
  voice: '',  // Resolved at runtime — prefers masculine FR voice
  rate: 0.95, // Slightly slower for natural fluidity
  pitch: 0.9, // Lower pitch for masculine tone
  volume: 1.0,
  lang: 'fr-FR',
};

/** Preferred masculine French voice names — tried in order */
const PREFERRED_MALE_VOICES_FR = [
  'Thomas',            // macOS high-quality male FR
  'Microsoft Paul',    // Windows male FR
  'Microsoft Claude',  // Windows male FR (alternate)
  'Jacques',           // macOS male FR (alternate)
  'Google français',   // Chrome — often male by default
];

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

// ─── Helpers ─────────────────────────────────────────────────────

/** Find the best masculine French voice from available SpeechSynthesis voices */
export function findBestFrenchVoice(): SpeechSynthesisVoice | null {
  if (typeof window === 'undefined' || !window.speechSynthesis) return null;

  const voices = window.speechSynthesis.getVoices();
  if (!voices.length) return null;

  // 1. Try preferred masculine voices in order
  for (const pref of PREFERRED_MALE_VOICES_FR) {
    const match = voices.find(v =>
      v.lang.startsWith('fr') && v.name.toLowerCase().includes(pref.toLowerCase())
    );
    if (match) return match;
  }

  // 2. Fallback: any French voice (avoid explicitly feminine names)
  const feminineNames = ['amelie', 'audrey', 'marie', 'julie', 'sara', 'sophie'];
  const maleFr = voices.find(v =>
    v.lang.startsWith('fr') &&
    !feminineNames.some(f => v.name.toLowerCase().includes(f))
  );
  if (maleFr) return maleFr;

  // 3. Any French voice at all
  const anyFr = voices.find(v => v.lang.startsWith('fr'));
  if (anyFr) return anyFr;

  // 4. Last resort: first voice
  return voices[0];
}

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

/** Build voice greeting text */
export function getVocalGreeting(): string {
  return `${getTimeGreeting()}, je suis iAsted, votre assistant IA gabonais. Comment puis-je vous aider aujourd'hui ?`;
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
