import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

function App() {
  return (
    <div className="min-h-screen bg-obsidian">
      <p className="text-platinum text-center pt-20 font-display text-6xl tracking-wider">
        NEXUS
      </p>
    </div>
  );
}

export default App;
