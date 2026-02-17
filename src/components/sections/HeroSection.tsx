import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface HeroSectionProps {
  animateEntrance: boolean;
}

export function HeroSection({ animateEntrance }: HeroSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const indicatorRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useGSAP(() => {
    if (reducedMotion || !animateEntrance) return;

    const tl = gsap.timeline();

    tl.fromTo(
      titleRef.current,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 1.2, ease: "power2.out" },
    )
      .fromTo(
        taglineRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
        "-=0.8",
      )
      .fromTo(
        indicatorRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.6, ease: "power2.out" },
        "-=0.4",
      );
  }, [animateEntrance, reducedMotion]);

  return (
    <section
      ref={sectionRef}
      className="relative h-screen w-full overflow-hidden"
    >
      {/* Hero video background */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 h-full w-full object-cover"
      >
        <source src="/nexus_hero.mp4" type="video/mp4" />
      </video>

      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-obsidian/50" />

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6">
        <h1
          ref={titleRef}
          className="font-display tracking-wider text-platinum"
          style={{
            fontSize: "clamp(4rem, 12vw, 10rem)",
            lineHeight: 1,
            opacity: reducedMotion ? 1 : 0,
          }}
        >
          NFROZE
        </h1>

        <p
          ref={taglineRef}
          className="mt-6 max-w-xl text-center text-lg text-silver md:text-xl"
          style={{ opacity: reducedMotion ? 1 : 0 }}
        >
          Five tools. One system. Zero manual intervention.
        </p>
      </div>

      {/* Scroll indicator */}
      <div
        ref={indicatorRef}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        style={{ opacity: reducedMotion ? 1 : 0 }}
      >
        <div className="flex flex-col items-center gap-2 animate-pulse">
          <span className="text-xs uppercase tracking-widest text-gunmetal">
            Scroll
          </span>
          <svg
            width="20"
            height="12"
            viewBox="0 0 20 12"
            fill="none"
            className="text-gunmetal"
          >
            <path
              d="M1 1L10 10L19 1"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </div>
      </div>
    </section>
  );
}
