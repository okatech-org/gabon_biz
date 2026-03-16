// ─── Audio Utilities for OpenAI Realtime API ─────────────────────
// PCM16 encoding/decoding for streaming audio via WebSocket

/**
 * Convert Float32Array audio samples to 16-bit PCM ArrayBuffer.
 * OpenAI Realtime API expects PCM16 (little-endian, 24kHz mono).
 */
export function floatTo16BitPCM(float32Array: Float32Array): ArrayBuffer {
  const buffer = new ArrayBuffer(float32Array.length * 2);
  const view = new DataView(buffer);
  for (let i = 0; i < float32Array.length; i++) {
    const s = Math.max(-1, Math.min(1, float32Array[i]));
    view.setInt16(i * 2, s < 0 ? s * 0x8000 : s * 0x7fff, true);
  }
  return buffer;
}

/**
 * Encode an ArrayBuffer as a base64 string.
 * Used to send PCM16 audio via WebSocket JSON messages.
 */
export function base64EncodeAudio(arrayBuffer: ArrayBuffer): string {
  const bytes = new Uint8Array(arrayBuffer);
  const chunks: string[] = [];
  const CHUNK_SIZE = 8192;
  for (let i = 0; i < bytes.length; i += CHUNK_SIZE) {
    const slice = bytes.subarray(i, Math.min(i + CHUNK_SIZE, bytes.length));
    chunks.push(String.fromCharCode.apply(null, slice as unknown as number[]));
  }
  return btoa(chunks.join(''));
}

/**
 * Decode a base64 string to Int16Array (PCM16 samples).
 * Used to play audio received from OpenAI Realtime API.
 */
export function base64DecodeToInt16(base64: string): Int16Array {
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return new Int16Array(bytes.buffer);
}

/**
 * Convert Int16Array PCM16 samples to Float32Array for AudioContext playback.
 */
export function int16ToFloat32(int16Array: Int16Array): Float32Array {
  const float32 = new Float32Array(int16Array.length);
  for (let i = 0; i < int16Array.length; i++) {
    float32[i] = int16Array[i] / (int16Array[i] < 0 ? 0x8000 : 0x7fff);
  }
  return float32;
}

/**
 * Resample audio from one sample rate to another using linear interpolation.
 * e.g., 48kHz → 24kHz for OpenAI Realtime API.
 */
export function resampleAudio(
  inputData: Float32Array,
  inputSampleRate: number,
  outputSampleRate: number,
): Float32Array {
  if (inputSampleRate === outputSampleRate) return inputData;

  const ratio = inputSampleRate / outputSampleRate;
  const outputLength = Math.round(inputData.length / ratio);
  const output = new Float32Array(outputLength);

  for (let i = 0; i < outputLength; i++) {
    const srcIndex = i * ratio;
    const srcIndexFloor = Math.floor(srcIndex);
    const srcIndexCeil = Math.min(srcIndexFloor + 1, inputData.length - 1);
    const frac = srcIndex - srcIndexFloor;
    output[i] = inputData[srcIndexFloor] * (1 - frac) + inputData[srcIndexCeil] * frac;
  }

  return output;
}

// ─── AudioWorklet Processor Code (inline, loaded as blob URL) ────

/**
 * Returns a blob URL for an AudioWorklet processor that captures raw PCM data
 * from the mic and posts it to the main thread.
 */
export function createCaptureWorkletURL(): string {
  const code = `
    class CaptureProcessor extends AudioWorkletProcessor {
      process(inputs) {
        const input = inputs[0];
        if (input && input[0] && input[0].length > 0) {
          // Copy the float32 data and post to main thread
          this.port.postMessage(new Float32Array(input[0]));
        }
        return true;
      }
    }
    registerProcessor('capture-processor', CaptureProcessor);
  `;
  const blob = new Blob([code], { type: 'application/javascript' });
  return URL.createObjectURL(blob);
}
