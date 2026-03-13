'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Analyses microphone audio level from a MediaStream.
 * Returns a normalized 0–1 level updated every animation frame.
 */
export function useAudioLevel(stream: MediaStream | null) {
  const [level, setLevel] = useState(0);
  const frameRef = useRef<number>(0);
  const ctxRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    if (!stream) {
      setLevel(0);
      return;
    }

    const audioContext = new AudioContext();
    ctxRef.current = audioContext;
    const analyser = audioContext.createAnalyser();
    const source = audioContext.createMediaStreamSource(stream);
    source.connect(analyser);
    analyser.fftSize = 256;
    const dataArray = new Uint8Array(analyser.frequencyBinCount);

    const analyze = () => {
      analyser.getByteFrequencyData(dataArray);
      const avg = dataArray.reduce((sum, val) => sum + val, 0) / dataArray.length;
      setLevel(avg / 255); // Normalize to 0–1
      frameRef.current = requestAnimationFrame(analyze);
    };
    analyze();

    return () => {
      cancelAnimationFrame(frameRef.current);
      source.disconnect();
      audioContext.close();
      ctxRef.current = null;
    };
  }, [stream]);

  return level;
}
