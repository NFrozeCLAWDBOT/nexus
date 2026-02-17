import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { GlassPanel } from "@/components/layout/GlassPanel";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const systemPoints = [
  {
    title: "Designed",
    description:
      "App concepts and specs planned with Claude Desktop — requirements, architecture, and visual identity defined before a single line of code.",
  },
  {
    title: "Built",
    description:
      "Jarvis (OpenClaw agent on dedicated Mac) generates hero art, writes the build spec, dispatches Claude Code to execute.",
  },
  {
    title: "Deployed",
    description:
      "Claude Code builds the full stack, handles git, deploys to AWS. One shot. No manual intervention.",
  },
];

export function SystemSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const closingRef = useRef<HTMLParagraphElement>(null);
  const reducedMotion = useReducedMotion();

  useGSAP(() => {
    if (reducedMotion) return;

    const cards = cardsRef.current?.children;
    if (!cards) return;

    gsap.fromTo(
      Array.from(cards),
      { opacity: 0, y: 60 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          end: "center center",
          scrub: 1,
        },
      },
    );

    gsap.fromTo(
      closingRef.current,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        scrollTrigger: {
          trigger: closingRef.current,
          start: "top 85%",
          end: "top 65%",
          scrub: 1,
        },
      },
    );
  }, [reducedMotion]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex flex-col items-center justify-center px-6 py-24"
    >
      {/* Background atmosphere */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(168, 178, 193, 0.03) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 w-full max-w-6xl">
        {/* Section title */}
        <h2 className="font-display text-4xl md:text-5xl tracking-wider text-center text-platinum mb-16">
          THE SYSTEM
        </h2>

        {/* Triptych */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8"
        >
          {systemPoints.map((point) => (
            <GlassPanel
              key={point.title}
              className="text-center"
              style={{ opacity: reducedMotion ? 1 : 0 }}
            >
              <h3 className="font-display text-2xl md:text-3xl tracking-wider text-platinum mb-4">
                {point.title}
              </h3>
              <p className="text-silver text-sm md:text-base leading-relaxed">
                {point.description}
              </p>
            </GlassPanel>
          ))}
        </div>

        {/* Closing text */}
        <p
          ref={closingRef}
          className="mt-16 text-center text-silver italic text-lg"
          style={{ opacity: reducedMotion ? 1 : 0 }}
        >
          Scroll to explore what came out the other end.
        </p>
      </div>
    </section>
  );
}
