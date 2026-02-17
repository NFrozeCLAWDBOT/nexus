import { useState, useCallback, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { ScrollContainer } from "@/components/layout/ScrollContainer";
import { SplashOverlay } from "@/components/sections/SplashOverlay";
import { HeroSection } from "@/components/sections/HeroSection";
import { SystemSection } from "@/components/sections/SystemSection";
import { AppShowcase } from "@/components/sections/AppShowcase";
import { apps } from "@/data/apps";
import { ClosingSection } from "@/components/sections/ClosingSection";
import { useAudioPlayer } from "@/hooks/useAudioPlayer";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

function App() {
  const [splashDismissed, setSplashDismissed] = useState(false);
  const [heroAnimate, setHeroAnimate] = useState(false);
  const { play: playAudio } = useAudioPlayer();

  const handleSplashComplete = useCallback(() => {
    setSplashDismissed(true);
    // Small delay to let ScrollSmoother initialize before triggering hero
    setTimeout(() => {
      setHeroAnimate(true);
      // Refresh ScrollTrigger positions after splash removal
      ScrollTrigger.refresh();
    }, 100);
  }, []);

  const handleAudioStart = useCallback(() => {
    playAudio();
  }, [playAudio]);

  // Set up cross-section colour transitions
  useEffect(() => {
    if (!splashDismissed) return;

    // Wait for DOM to be ready
    const timer = setTimeout(() => {
      const sections = document.querySelectorAll<HTMLElement>("[data-app-section]");

      sections.forEach((section) => {
        const appName = section.dataset.appSection;
        const app = apps.find((a) => a.name.toLowerCase() === appName);
        if (!app) return;

        ScrollTrigger.create({
          trigger: section,
          start: "top 80%",
          end: "bottom 20%",
          onEnter: () => {
            gsap.to(document.documentElement, {
              "--accent-color": app.color.accent,
              "--glow-color": app.color.glow,
              duration: 0.8,
              ease: "power2.out",
            });
          },
          onEnterBack: () => {
            gsap.to(document.documentElement, {
              "--accent-color": app.color.accent,
              "--glow-color": app.color.glow,
              duration: 0.8,
              ease: "power2.out",
            });
          },
          onLeaveBack: () => {
            // Reset to neutral when scrolling back before first app
            if (appName === apps[0].name.toLowerCase()) {
              gsap.to(document.documentElement, {
                "--accent-color": "#A8B2C1",
                "--glow-color": "rgba(168, 178, 193, 0)",
                duration: 0.8,
                ease: "power2.out",
              });
            }
          },
        });
      });
    }, 200);

    return () => clearTimeout(timer);
  }, [splashDismissed]);

  return (
    <>
      {!splashDismissed && (
        <SplashOverlay
          onComplete={handleSplashComplete}
          onAudioStart={handleAudioStart}
        />
      )}

      <ScrollContainer enabled={splashDismissed}>
        <HeroSection animateEntrance={heroAnimate} />

        <SystemSection />

        {apps.map((app) => (
          <AppShowcase key={app.name} app={app} />
        ))}

        <ClosingSection />
      </ScrollContainer>
    </>
  );
}

export default App;
