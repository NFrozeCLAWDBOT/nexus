import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { ScrollContainer } from "@/components/layout/ScrollContainer";
import { HeroSection } from "@/components/sections/HeroSection";
import { SystemSection } from "@/components/sections/SystemSection";
import { AppShowcase } from "@/components/sections/AppShowcase";
import { apps } from "@/data/apps";
import { ClosingSection } from "@/components/sections/ClosingSection";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

function App() {

  return (
    <>
      <ScrollContainer enabled={true}>
        <HeroSection animateEntrance={true} />

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
