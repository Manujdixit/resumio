import { Features } from "@/components/landing/Features";
import { Footer } from "@/components/landing/Footer";
import { Hero } from "@/components/landing/Hero";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { Navbar } from "@/components/landing/Navbar";
import { Pricing } from "@/components/landing/Pricing";

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-background text-white font-sans">
      {/* Grid Background Layer */}
      <div className="fixed inset-0 bg-grid-pattern bg-grid-sm opacity-[0.03] pointer-events-none z-0"></div>

      <div className="relative z-10 flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Hero />
          <Features />
          <HowItWorks />
          <Pricing />
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default App;
