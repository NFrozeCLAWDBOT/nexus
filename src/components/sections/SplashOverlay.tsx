import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface SplashOverlayProps {
  onComplete: () => void;
  onAudioStart: () => void;
}

export function SplashOverlay({ onComplete, onAudioStart }: SplashOverlayProps) {
  const topPanelRef = useRef<HTMLDivElement>(null);
  const bottomPanelRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLButtonElement>(null);
  const lightLineRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  // Breathing glow animation on the text
  useGSAP(() => {
    if (reducedMotion || !textRef.current) return;

    gsap.to(textRef.current, {
      textShadow: "0 0 20px rgba(232, 232, 236, 0.6), 0 0 40px rgba(232, 232, 236, 0.3)",
      duration: 2,
      ease: "sine.inOut",
      yoyo: true,
      repeat: -1,
    });
  }, [reducedMotion]);

  const handleClick = () => {
    if (reducedMotion) {
      onAudioStart();
      onComplete();
      return;
    }

    const tl = gsap.timeline({
      onComplete: () => {
        // Remove overlay from DOM
        if (containerRef.current) {
          containerRef.current.style.display = "none";
        }
        onComplete();
      },
    });

    // (0s–1s) Text flash white then fade out + start audio
    tl.to(textRef.current, {
      color: "#FFFFFF",
      textShadow: "0 0 30px rgba(255, 255, 255, 0.8), 0 0 60px rgba(255, 255, 255, 0.5)",
      duration: 0.15,
      ease: "power2.out",
      onStart: () => {
        onAudioStart();
      },
    })
      .to(textRef.current, {
        opacity: 0,
        duration: 0.8,
        ease: "power2.out",
      })

      // (1s–2.5s) Pure black pause — tension builds
      .to({}, { duration: 1.5 })

      // (2.5s) Light line appears
      .fromTo(
        lightLineRef.current,
        { opacity: 0, scaleX: 0 },
        { opacity: 1, scaleX: 1, duration: 0.4, ease: "power2.out" },
      )

      // (2.5s–4.5s) Vault doors open — panels split
      .to(
        topPanelRef.current,
        { y: "-100vh", duration: 2, ease: "power3.inOut" },
        "-=0.1",
      )
      .to(
        bottomPanelRef.current,
        { y: "100vh", duration: 2, ease: "power3.inOut" },
        "<",
      )
      .to(
        lightLineRef.current,
        { opacity: 0, duration: 0.5 },
        "-=1",
      );
  };

  return (
    <div ref={containerRef} className="fixed inset-0 z-50">
      {/* Top panel */}
      <div
        ref={topPanelRef}
        className="absolute top-0 left-0 right-0 h-1/2"
        style={{ backgroundColor: "#0A0A0F" }}
      />

      {/* Bottom panel */}
      <div
        ref={bottomPanelRef}
        className="absolute bottom-0 left-0 right-0 h-1/2"
        style={{ backgroundColor: "#0A0A0F" }}
      />

      {/* Light line (appears at centre during split) */}
      <div
        ref={lightLineRef}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[2px] w-[30vw] opacity-0"
        style={{
          background: "linear-gradient(90deg, transparent, #E8E8EC, transparent)",
        }}
      />

      {/* "Enter NEXUS" text */}
      <button
        ref={textRef}
        onClick={handleClick}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 font-display tracking-wider text-platinum cursor-pointer bg-transparent border-none outline-none"
        style={{
          fontSize: "clamp(2rem, 5vw, 4rem)",
          textShadow: "0 0 10px rgba(232, 232, 236, 0.3), 0 0 20px rgba(232, 232, 236, 0.15)",
        }}
      >
        Enter NEXUS
      </button>
    </div>
  );
}
