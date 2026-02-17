import { useRef, useCallback } from "react";

const PEAK_VOLUME = 0.15;
const FADE_IN_DURATION = 1500; // ms
const FADE_OUT_DURATION = 5000; // ms
const FADE_INTERVAL = 50; // ms

export function useAudioPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fadeInRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const fadeOutRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const play = useCallback(() => {
    if (audioRef.current) return; // Already playing

    const audio = new Audio("/nexus_audio.mp3");
    audio.volume = 0;
    audio.loop = false;
    audioRef.current = audio;

    audio.play().catch(() => {
      // Browser may block — safe to ignore
    });

    // Fade in
    const volumeStep = PEAK_VOLUME / (FADE_IN_DURATION / FADE_INTERVAL);
    fadeInRef.current = setInterval(() => {
      if (!audioRef.current) {
        if (fadeInRef.current) clearInterval(fadeInRef.current);
        return;
      }
      const newVol = Math.min(audioRef.current.volume + volumeStep, PEAK_VOLUME);
      audioRef.current.volume = newVol;
      if (newVol >= PEAK_VOLUME) {
        if (fadeInRef.current) clearInterval(fadeInRef.current);
      }
    }, FADE_INTERVAL);

    // Fade out near the end
    const handleTimeUpdate = () => {
      if (!audioRef.current) return;
      const remaining = audioRef.current.duration - audioRef.current.currentTime;
      if (remaining <= 5 && !fadeOutRef.current) {
        const currentVol = audioRef.current.volume;
        const outStep = currentVol / (FADE_OUT_DURATION / FADE_INTERVAL);
        fadeOutRef.current = setInterval(() => {
          if (!audioRef.current) {
            if (fadeOutRef.current) clearInterval(fadeOutRef.current);
            return;
          }
          const newVol = Math.max(audioRef.current.volume - outStep, 0);
          audioRef.current.volume = newVol;
          if (newVol <= 0) {
            if (fadeOutRef.current) clearInterval(fadeOutRef.current);
          }
        }, FADE_INTERVAL);
      }
    };

    audio.addEventListener("timeupdate", handleTimeUpdate);
  }, []);

  return { play };
}
