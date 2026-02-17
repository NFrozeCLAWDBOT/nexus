import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { apps } from "@/data/apps";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export function ClosingSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useGSAP(() => {
    if (reducedMotion) return;

    gsap.fromTo(
      contentRef.current,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          end: "top 40%",
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
      <div
        ref={contentRef}
        className="w-full max-w-4xl"
        style={{ opacity: reducedMotion ? 1 : 0 }}
      >
        {/* The Collection */}
        <h2 className="font-display text-4xl md:text-5xl tracking-wider text-center text-platinum mb-12">
          THE COLLECTION
        </h2>

        {/* App name strip */}
        <div className="flex flex-wrap justify-center gap-6 md:gap-10 mb-16">
          {apps.map((app) => (
            <a
              key={app.name}
              href={app.url}
              target="_blank"
              rel="noopener noreferrer"
              className="font-display text-xl md:text-2xl tracking-wider transition-opacity duration-200 hover:opacity-80"
              style={{ color: app.color.accent }}
            >
              {app.name.toUpperCase()}
            </a>
          ))}
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-chrome mb-12" />

        {/* Links */}
        <div className="flex flex-wrap justify-center gap-6 md:gap-8 text-sm text-silver">
          <a
            href="https://noahfrost.co.uk"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-platinum transition-colors duration-200"
          >
            Built by Noah Frost
          </a>
          <a
            href="https://github.com/NFrozeCLAWDBOT"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-platinum transition-colors duration-200"
          >
            GitHub (Jarvis)
          </a>
          <a
            href="https://github.com/nfroze"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-platinum transition-colors duration-200"
          >
            GitHub (Noah)
          </a>
          <a
            href="https://linkedin.com/in/nfroze"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-platinum transition-colors duration-200"
          >
            LinkedIn
          </a>
        </div>

      </div>
    </section>
  );
}
