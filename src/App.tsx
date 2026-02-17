import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { ScrollContainer } from "@/components/layout/ScrollContainer";
import { HeroSection } from "@/components/sections/HeroSection";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

function App() {

  return (
    <>
      <ScrollContainer enabled={true}>
        <HeroSection animateEntrance={true} />

        {/* Placeholder for remaining sections */}
        <div className="h-screen flex items-center justify-center">
          <p className="text-gunmetal text-lg">More sections coming...</p>
        </div>
      </ScrollContainer>
    </>
  );
}

export default App;
