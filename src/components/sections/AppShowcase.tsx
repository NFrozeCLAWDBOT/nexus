import { useRef, useCallback } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import type { AppData } from "@/types";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface AppShowcaseProps {
  app: AppData;
}

export function AppShowcase({ app }: AppShowcaseProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  const playVideo = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    video.play().catch(() => {
      // Mobile browsers may reject play() — safe to ignore
    });
  }, []);

  const pauseVideo = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    video.pause();
  }, []);

  useGSAP(() => {
    if (reducedMotion) return;

    const section = sectionRef.current;
    const title = titleRef.current;
    const desc = descRef.current;
    const panel = panelRef.current;
    const cta = ctaRef.current;
    if (!section || !title || !desc || !panel || !cta) return;

    // Calculate the scale needed to fill viewport from panel size
    // Panel is ~65% viewport width, so scale factor is ~1/0.65
    const scaleX = 1 / 0.65;
    const scaleY = window.innerHeight / (window.innerHeight * 0.6);
    const scaleFactor = Math.max(scaleX, scaleY) * 1.05; // slight overshoot for coverage

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: "+=200%",
        pin: true,
        scrub: true,
        onEnter: playVideo,
        onEnterBack: playVideo,
        onLeave: pauseVideo,
        onLeaveBack: pauseVideo,
      },
    });

    // Phase 1 — The Reveal (0% → 45%)
    tl.fromTo(
      title,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 0.15, ease: "none" },
      0,
    )
      .fromTo(
        panel,
        { opacity: 0, scale: 0.92 },
        { opacity: 1, scale: 1, duration: 0.2, ease: "none" },
        0.05,
      )
      .fromTo(
        desc,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.15, ease: "none" },
        0.15,
      )

      // Hold at Phase 1 peak
      .to({}, { duration: 0.15 })

      // Phase 2 — The Immersion (50% → 100%)
      .to(title, { opacity: 0, y: -30, duration: 0.1, ease: "none" }, 0.5)
      .to(desc, { opacity: 0, y: 30, duration: 0.1, ease: "none" }, 0.5)
      .to(
        panel,
        {
          borderColor: "transparent",
          borderRadius: 0,
          boxShadow: "none",
          backdropFilter: "blur(0px)",
          duration: 0.2,
          ease: "none",
        },
        0.55,
      )
      .to(
        panel,
        {
          scale: scaleFactor,
          duration: 0.3,
          ease: "none",
        },
        0.55,
      )
      .fromTo(
        cta,
        { opacity: 0 },
        { opacity: 1, duration: 0.1, ease: "none" },
        0.8,
      );
  }, [reducedMotion, playVideo, pauseVideo]);

  return (
    <section
      ref={sectionRef}
      data-app-section={app.name.toLowerCase()}
      className="relative h-screen w-full overflow-hidden"
      style={
        {
          "--app-accent": app.color.accent,
          "--app-glow": app.color.glow,
        } as React.CSSProperties
      }
    >
      {/* Background biome */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-700"
        style={{ background: app.color.gradient }}
      />

      {/* Content wrapper */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6">
        {/* App title */}
        <h2
          ref={titleRef}
          className="font-display tracking-wider mb-8 text-center"
          style={{
            fontSize: "clamp(3rem, 8vw, 7rem)",
            color: app.color.accent,
            opacity: reducedMotion ? 1 : 0,
          }}
        >
          {app.name.toUpperCase()}
        </h2>

        {/* Glassmorphic video panel */}
        <div
          ref={panelRef}
          className="relative w-[90vw] md:w-[65vw] aspect-video rounded-2xl overflow-hidden"
          style={{
            background: "rgba(10, 10, 15, 0.6)",
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
            border: `1px solid ${app.color.accent}`,
            boxShadow: `0 0 30px ${app.color.glow}, inset 0 0 30px ${app.color.glow}`,
            opacity: reducedMotion ? 1 : 0,
          }}
        >
          <video
            ref={videoRef}
            muted
            loop
            playsInline
            preload="none"
            className="absolute inset-0 h-full w-full object-cover"
            {...(reducedMotion ? { autoPlay: true } : {})}
          >
            <source src={`/${app.video}`} type="video/mp4" />
          </video>

          {/* CTA widget — small glassmorphic pill, bottom-right */}
          <div
            ref={ctaRef}
            className="absolute bottom-4 right-4 md:bottom-6 md:right-6"
            style={{ opacity: reducedMotion ? 1 : 0 }}
          >
            <a
              href={app.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 hover:scale-105"
              style={{
                background: "rgba(10, 10, 15, 0.5)",
                backdropFilter: "blur(16px)",
                WebkitBackdropFilter: "blur(16px)",
                border: `1px solid rgba(192, 192, 200, 0.15)`,
                boxShadow: `0 0 12px ${app.color.glow}`,
              }}
            >
              <span
                className="text-xs md:text-sm tracking-widest uppercase"
                style={{ color: app.color.accent }}
              >
                Launch
              </span>
              <span
                className="text-xs md:text-sm transition-transform duration-300 group-hover:translate-x-0.5"
                style={{ color: app.color.accent }}
              >
                &rarr;
              </span>
            </a>
          </div>
        </div>

        {/* Description */}
        <p
          ref={descRef}
          className="mt-8 max-w-2xl text-center text-silver text-base md:text-lg leading-relaxed"
          style={{ opacity: reducedMotion ? 1 : 0 }}
        >
          {app.description}
        </p>
      </div>
    </section>
  );
}
