import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface ScrollContainerProps {
  children: React.ReactNode;
  enabled: boolean;
}

export function ScrollContainer({ children, enabled }: ScrollContainerProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useGSAP(() => {
    if (!enabled || reducedMotion) return;

    const smoother = ScrollSmoother.create({
      wrapper: wrapperRef.current!,
      content: "#smooth-content",
      smooth: 1.2,
      effects: true,
      normalizeScroll: false,
    });

    return () => {
      smoother.kill();
    };
  }, [enabled, reducedMotion]);

  return (
    <div id="smooth-wrapper" ref={wrapperRef}>
      <div id="smooth-content">{children}</div>
    </div>
  );
}
