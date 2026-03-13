'use client';

import React from 'react';
import { Brain, Loader2, Mic, MicOff } from 'lucide-react';
import type { VoiceState } from '@/types/iasted';
import { AudioBarsAnimated } from './AudioVisualizer';

interface VoiceMicButtonProps {
  voiceState: VoiceState;
  audioLevel: number;
  onConnect: () => void;
  onDisconnect: () => void;
}

/**
 * Microphone button with 5 visual states:
 * - idle: white mic icon, transparent bg
 * - connecting: yellow loader, pulsing
 * - listening: green mic, pulsing ring proportional to audioLevel
 * - thinking: brain icon, blue pulse
 * - speaking: audio bars animated
 */
export function VoiceMicButton({ voiceState, audioLevel, onConnect, onDisconnect }: VoiceMicButtonProps) {
  const handleClick = () => {
    if (voiceState === 'idle') {
      onConnect();
    } else if (voiceState !== 'connecting') {
      onDisconnect();
    }
  };

  // ─── Idle ─────────────────────────────────────
  if (voiceState === 'idle') {
    return (
      <button
        type="button"
        onClick={handleClick}
        className="p-2 rounded-full hover:bg-white/20 transition-colors"
        aria-label="Activer le micro"
        title="Activer le mode vocal"
      >
        <Mic className="w-4 h-4" />
      </button>
    );
  }

  // ─── Connecting ───────────────────────────────
  if (voiceState === 'connecting') {
    return (
      <button
        type="button"
        disabled
        className="p-2 rounded-full bg-yellow-500/30 animate-pulse cursor-wait"
        aria-label="Connexion en cours"
        title="Connexion au micro..."
      >
        <Loader2 className="w-4 h-4 animate-spin" />
      </button>
    );
  }

  // ─── Listening ────────────────────────────────
  if (voiceState === 'listening') {
    // Ring scale proportional to audio level
    const ringScale = 1 + audioLevel * 0.6;
    const ringOpacity = 0.3 + audioLevel * 0.5;

    return (
      <button
        type="button"
        onClick={handleClick}
        className="relative p-2 rounded-full bg-emerald-500/30 transition-colors"
        aria-label="Mode vocal actif — cliquer pour désactiver"
        title="Micro actif — cliquer pour couper"
      >
        {/* Animated ring */}
        <span
          className="absolute inset-0 rounded-full bg-emerald-400 transition-all duration-150"
          style={{
            transform: `scale(${ringScale})`,
            opacity: ringOpacity,
          }}
        />
        <Mic className="w-4 h-4 relative z-10 text-white" />
      </button>
    );
  }

  // ─── Thinking ─────────────────────────────────
  if (voiceState === 'thinking') {
    return (
      <button
        type="button"
        onClick={handleClick}
        className="p-2 rounded-full bg-blue-500/30 animate-pulse"
        aria-label="iAsted réfléchit"
        title="En train de réfléchir..."
      >
        <Brain className="w-4 h-4" />
      </button>
    );
  }

  // ─── Speaking ─────────────────────────────────
  if (voiceState === 'speaking') {
    return (
      <button
        type="button"
        onClick={handleClick}
        className="p-2 rounded-full bg-emerald-500/20"
        aria-label="iAsted parle — cliquer pour interrompre"
        title="En train de parler — cliquer pour interrompre"
      >
        <AudioBarsAnimated color="white" className="w-4 h-4" />
      </button>
    );
  }

  // Fallback (should never reach)
  return (
    <button
      type="button"
      onClick={handleClick}
      className="p-2 rounded-full hover:bg-white/20 transition-colors"
      aria-label="Micro"
    >
      <MicOff className="w-4 h-4 opacity-50" />
    </button>
  );
}
