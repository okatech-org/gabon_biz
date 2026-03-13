// ─── iAsted Voice Agent Types ─────────────────────────────────────

/** 5-state voice machine */
export type VoiceState = 'idle' | 'connecting' | 'listening' | 'thinking' | 'speaking';

/** Voice configuration */
export interface VoiceConfig {
  voice: string;               // SpeechSynthesis voice name
  rate: number;                // Speech rate (0.5–2)
  pitch: number;               // Speech pitch (0–2)
  volume: number;              // Volume (0–1)
  lang: string;                // BCP-47 language tag
}

/** Local command definition */
export interface LocalCommand {
  patterns: RegExp[];          // Regex patterns that match this command
  keywords: string[][];        // Keyword groups (all in a group must match)
  action: string;              // Action identifier
  params?: Record<string, string>; // Static params for the action
  silent: boolean;             // Execute without vocal confirmation
  confidence: number;          // Base confidence for keyword match
}

/** Command match result */
export interface CommandMatch {
  action: string;
  params: Record<string, string>;
  confidence: number;
  silent: boolean;
}

/** iAsted function-calling tool definition (Gemini format) */
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
  connect: () => void;
  disconnect: () => void;
}

/** Session greeting data */
export interface GreetingSession {
  timestamp: number;
  period: 'morning' | 'afternoon' | 'evening';
}

/** Quotas per role */
export interface RoleQuota {
  voicePerDay: number;
  textPerDay: number;
}

export const ROLE_QUOTAS: Record<string, RoleQuota> = {
  anonymous:     { voicePerDay: 3,   textPerDay: 10 },
  citoyen:       { voicePerDay: 20,  textPerDay: 50 },
  entrepreneur:  { voicePerDay: 50,  textPerDay: 100 },
  investisseur:  { voicePerDay: 50,  textPerDay: 100 },
  agent_menudi:  { voicePerDay: 100, textPerDay: 200 },
  admin:         { voicePerDay: 500, textPerDay: 9999 },
};
