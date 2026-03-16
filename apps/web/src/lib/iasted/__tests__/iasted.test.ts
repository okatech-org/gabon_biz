// ─── Unit Tests for iAsted Agent Core Modules ───────────────────
// Run: npx vitest run src/lib/iasted/__tests__/iasted.test.ts

import { describe, it, expect } from 'vitest';
import {
  floatTo16BitPCM,
  base64EncodeAudio,
  base64DecodeToInt16,
  int16ToFloat32,
  resampleAudio,
} from '../audio-utils';
import { isNoisyTranscription } from '../noise-filter';
import { matchCommand } from '../commands';
import { getSuggestions } from '../suggestions';

// ═══ audio-utils ═══════════════════════════════════════════════

describe('audio-utils', () => {
  describe('floatTo16BitPCM ↔ int16ToFloat32', () => {
    it('round-trips simple values', () => {
      const input = new Float32Array([0, 0.5, -0.5, 1.0, -1.0]);
      const pcm16 = floatTo16BitPCM(input);
      const int16 = new Int16Array(pcm16);
      const output = int16ToFloat32(int16);
      // Allow minor quantization error
      for (let i = 0; i < input.length; i++) {
        expect(output[i]).toBeCloseTo(input[i], 2);
      }
    });

    it('clamps values outside [-1, 1]', () => {
      const input = new Float32Array([2.0, -2.0]);
      const pcm16 = floatTo16BitPCM(input);
      const int16 = new Int16Array(pcm16);
      const output = int16ToFloat32(int16);
      expect(output[0]).toBeCloseTo(1.0, 2);
      expect(output[1]).toBeCloseTo(-1.0, 2);
    });
  });

  describe('base64EncodeAudio ↔ base64DecodeToInt16', () => {
    it('round-trips PCM16 data through base64', () => {
      const original = new Float32Array([0, 0.25, -0.25, 0.75, -0.75]);
      const pcm16 = floatTo16BitPCM(original);
      const encoded = base64EncodeAudio(pcm16);
      const decoded = base64DecodeToInt16(encoded);
      const expectedInt16 = new Int16Array(pcm16);
      expect(decoded.length).toBe(expectedInt16.length);
      for (let i = 0; i < decoded.length; i++) {
        expect(decoded[i]).toBe(expectedInt16[i]);
      }
    });

    it('handles empty buffer', () => {
      const encoded = base64EncodeAudio(new ArrayBuffer(0));
      expect(encoded).toBe('');
    });

    it('handles large buffers efficiently', () => {
      // 1 second of 24kHz mono audio = 48000 bytes
      const large = new Float32Array(24000);
      for (let i = 0; i < large.length; i++) large[i] = Math.sin(i * 0.01);
      const pcm16 = floatTo16BitPCM(large);
      const encoded = base64EncodeAudio(pcm16);
      const decoded = base64DecodeToInt16(encoded);
      expect(decoded.length).toBe(24000);
    });
  });

  describe('resampleAudio', () => {
    it('returns same data when rates match', () => {
      const input = new Float32Array([1, 2, 3, 4]);
      const output = resampleAudio(input, 24000, 24000);
      expect(output).toBe(input); // Same reference
    });

    it('downsamples 48kHz → 24kHz (halves length)', () => {
      const input = new Float32Array([0, 0.5, 1.0, 0.5, 0, -0.5, -1.0, -0.5]);
      const output = resampleAudio(input, 48000, 24000);
      expect(output.length).toBe(4);
    });
  });
});

// ═══ noise-filter ══════════════════════════════════════════════

describe('isNoisyTranscription', () => {
  it('rejects too-short transcriptions', () => {
    expect(isNoisyTranscription('')).toBe(true);
    expect(isNoisyTranscription('ab')).toBe(true);
    expect(isNoisyTranscription('  ')).toBe(true);
  });

  it('rejects single French articles', () => {
    expect(isNoisyTranscription('la')).toBe(true);
    expect(isNoisyTranscription('euh')).toBe(true);
    expect(isNoisyTranscription('oui')).toBe(true);
    expect(isNoisyTranscription('voilà')).toBe(true);
  });

  it('rejects repeated characters', () => {
    expect(isNoisyTranscription('aaaaaa')).toBe(true);
    expect(isNoisyTranscription('hmmmmm')).toBe(true);
  });

  it('accepts valid French sentences', () => {
    expect(isNoisyTranscription('Comment créer une entreprise')).toBe(false);
    expect(isNoisyTranscription('Emmène-moi sur le guichet')).toBe(false);
    expect(isNoisyTranscription('Je veux investir au Gabon')).toBe(false);
  });

  it('accepts short but valid phrases', () => {
    expect(isNoisyTranscription('marché public')).toBe(false);
    expect(isNoisyTranscription('créer SARL')).toBe(false);
  });
});

// ═══ commands ══════════════════════════════════════════════════

describe('matchCommand', () => {
  it('matches exact navigation commands', () => {
    const result = matchCommand('guichet entrepreneur');
    expect(result).not.toBeNull();
    expect(result?.action).toBe('navigate');
    expect(result?.params?.path).toBe('/services/guichet-entrepreneur');
  });

  it('matches marchés publics', () => {
    const result = matchCommand('marchés publics');
    expect(result).not.toBeNull();
    expect(result?.action).toBe('navigate');
    expect(result?.params?.path).toBe('/services/marches-publics');
  });

  // ── Theme commands (expanded patterns for voice transcription) ──

  it('matches "mode sombre"', () => {
    const result = matchCommand('mode sombre');
    expect(result).not.toBeNull();
    expect(result?.action).toBe('setTheme');
    expect(result?.params?.theme).toBe('dark');
  });

  it('matches "le mode sombre" (voice transcript with article)', () => {
    const result = matchCommand('le mode sombre');
    expect(result).not.toBeNull();
    expect(result?.action).toBe('setTheme');
    expect(result?.params?.theme).toBe('dark');
  });

  it('matches "mets le mode sombre"', () => {
    const result = matchCommand('mets le mode sombre');
    expect(result).not.toBeNull();
    expect(result?.action).toBe('setTheme');
    expect(result?.params?.theme).toBe('dark');
  });

  it('matches "active le mode sombre"', () => {
    const result = matchCommand('active le mode sombre');
    expect(result).not.toBeNull();
    expect(result?.action).toBe('setTheme');
    expect(result?.params?.theme).toBe('dark');
  });

  it('matches "passe en mode sombre"', () => {
    const result = matchCommand('passe en mode sombre');
    expect(result).not.toBeNull();
    expect(result?.action).toBe('setTheme');
    expect(result?.params?.theme).toBe('dark');
  });

  it('matches "dark mode" (English)', () => {
    const result = matchCommand('dark mode');
    expect(result).not.toBeNull();
    expect(result?.action).toBe('setTheme');
    expect(result?.params?.theme).toBe('dark');
  });

  it('matches "mode clair"', () => {
    const result = matchCommand('mode clair');
    expect(result).not.toBeNull();
    expect(result?.action).toBe('setTheme');
    expect(result?.params?.theme).toBe('light');
  });

  it('matches "passe en mode clair"', () => {
    const result = matchCommand('passe en mode clair');
    expect(result).not.toBeNull();
    expect(result?.action).toBe('setTheme');
    expect(result?.params?.theme).toBe('light');
  });

  it('matches "light mode" (English)', () => {
    const result = matchCommand('light mode');
    expect(result).not.toBeNull();
    expect(result?.action).toBe('setTheme');
    expect(result?.params?.theme).toBe('light');
  });

  it('matches "change le thème"', () => {
    const result = matchCommand('change le thème');
    expect(result).not.toBeNull();
    expect(result?.action).toBe('toggleTheme');
  });

  // ── Language commands (interface locale) ──

  it('matches "en anglais"', () => {
    const result = matchCommand('en anglais');
    expect(result).not.toBeNull();
    expect(result?.action).toBe('setLocale');
    expect(result?.params?.lang).toBe('en');
  });

  it('matches "mets le site en anglais"', () => {
    const result = matchCommand('mets le site en anglais');
    expect(result).not.toBeNull();
    expect(result?.action).toBe('setLocale');
    expect(result?.params?.lang).toBe('en');
  });

  it('matches "change la langue en français"', () => {
    const result = matchCommand('change la langue en français');
    expect(result).not.toBeNull();
    expect(result?.action).toBe('setLocale');
    expect(result?.params?.lang).toBe('fr');
  });

  it('matches "switch to english"', () => {
    const result = matchCommand('switch to english');
    expect(result).not.toBeNull();
    expect(result?.action).toBe('setLocale');
    expect(result?.params?.lang).toBe('en');
  });

  // ── Disconnect commands ──

  it('matches disconnect commands', () => {
    const result = matchCommand('stop');
    expect(result).not.toBeNull();
    expect(result?.action).toBe('disconnectVoice');
  });

  it('returns null for unknown commands', () => {
    const result = matchCommand('quelle est la météo demain');
    expect(result).toBeNull();
  });

  it('respects confidence threshold', () => {
    // With threshold 0.99, most keyword matches won't pass
    const result = matchCommand('innovation', 0.99);
    // Only exact regex matches give confidence 1.0
    expect(result).toBeNull();
  });
});

// ═══ suggestions ═══════════════════════════════════════════════

describe('getSuggestions', () => {
  it('returns homepage suggestions for /', () => {
    const suggestions = getSuggestions('/');
    expect(suggestions.length).toBeGreaterThan(0);
    expect(suggestions[0].label).toBeDefined();
    expect(suggestions[0].message).toBeDefined();
  });

  it('returns specific suggestions for known pages', () => {
    const suggestions = getSuggestions('/services/guichet-entrepreneur');
    expect(suggestions.length).toBeGreaterThan(0);
    expect(suggestions.some((s) => s.label.toLowerCase().includes('sarl'))).toBe(true);
  });

  it('falls back to prefix match for sub-pages', () => {
    const suggestions = getSuggestions('/dashboard/incubateur/mentoring');
    expect(suggestions.length).toBeGreaterThan(0);
  });

  it('falls back to homepage for unknown pages', () => {
    const suggestions = getSuggestions('/some/unknown/page');
    const homeSuggestions = getSuggestions('/');
    expect(suggestions).toEqual(homeSuggestions);
  });
});
