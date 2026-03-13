// ─── Noise Filter for French/Gabonese Transcriptions ─────────────

/**
 * Determines if a transcription is noise (background audio, artifacts, etc.)
 * Adapted for French Gabonese context.
 */
export function isNoisyTranscription(text: string): boolean {
  const trimmed = text.trim();

  // 1. Too short (< 3 characters)
  if (trimmed.length < 3) return true;

  // 2. Non-latin scripts (Korean, Hindi, Chinese, Japanese, Arabic)
  const nonLatinPattern = /\p{Script=Hangul}|\p{Script=Devanagari}|\p{Script=Han}|\p{Script=Hiragana}|\p{Script=Katakana}|\p{Script=Arabic}/u;
  if (nonLatinPattern.test(trimmed)) return true;

  // 3. Common noise patterns
  const noisePatterns = [
    'ok', 'thanks', 'subscribe', 'like', 'um', 'uh', 'hmm',
    'merci pour cette vidéo', 'sous-titres', 'sous-titre',
    'musique', 'applaudissements', 'rires',
    'thank you', 'please subscribe', 'click the bell',
  ];
  if (noisePatterns.some(p => trimmed.toLowerCase().includes(p) && trimmed.length < p.length + 10)) return true;

  // 4. Less than 50% French/Latin characters
  const frenchChars = trimmed.replace(/[^a-zA-ZÀ-ÿ\s]/g, '').length;
  if (trimmed.length > 5 && frenchChars / trimmed.length < 0.5) return true;

  // 5. Isolated French articles/words
  const singleWords = [
    'la', 'le', 'un', 'une', 'les', 'des', 'du', 'de', 'et',
    'ou', 'ah', 'oh', 'euh', 'hein', 'voilà', 'bon', 'ben',
    'oui', 'non', 'quoi', 'donc',
  ];
  if (singleWords.includes(trimmed.toLowerCase())) return true;

  // 6. Repeated characters (e.g., "aaaaaa", "hmmmmm")
  if (/(.)\1{4,}/.test(trimmed)) return true;

  return false;
}
