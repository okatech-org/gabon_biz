// ─── iAsted Voice Agent Types ─────────────────────────────────────

// Re-export quotas from the single source of truth (rate-limiter.ts)
// These are server-side enforced values, re-exported for UI display
export { ROLE_QUOTAS, type RoleQuota } from '@/lib/iasted/rate-limiter';

/** Voice states for the iAsted conversational agent */
export type VoiceState = 'idle' | 'connecting' | 'listening' | 'thinking' | 'speaking';

/** Local command definition */
export interface LocalCommand {
  patterns: RegExp[]; // Regex patterns that match this command
  keywords: string[][]; // Keyword groups (all in a group must match)
  action: string; // Action identifier
  params?: Record<string, string>; // Static params for the action
  silent: boolean; // Execute without vocal confirmation
  confidence: number; // Base confidence for keyword match
}

/** Command match result */
export interface CommandMatch {
  action: string;
  params: Record<string, string>;
  confidence: number;
  silent: boolean;
}

/** iAsted function-calling tool definition (OpenAI format) */
export interface IAstedToolParam {
  type: string;
  description: string;
  enum?: string[];
}

export interface IAstedTool {
  name: string;
  description: string;
  parameters: {
    type: 'object';
    properties: Record<string, IAstedToolParam>;
    required?: string[];
  };
}

/** Return type for useRealtimeVoice hook */
export interface UseRealtimeVoiceReturn {
  voiceState: VoiceState;
  audioLevel: number;
  transcript: string;
  isConnected: boolean;
  /** Non-null when a fatal error prevents voice (e.g. quota exceeded) */
  error: string | null;
  connect: () => void;
  disconnect: () => void;
}

/** Session greeting data */
export interface GreetingSession {
  timestamp: number;
  period: 'morning' | 'afternoon' | 'evening';
  text: string;
}
