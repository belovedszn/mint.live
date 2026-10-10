import Hero from "@/components/sections/Hero";
import Nav from "@/components/navigation/Nav";
import Showcase from "@/components/sections/Showcase";
import Prototype from "@/components/product/Prototype";
import ProductTabs from "@/components/sections/ProductTabs";
import Dashboard from "@/components/charts/Dashboard";
import AfricaMap from "@/components/sections/AfricaMap";
import { WhyNow, GrowthLoop, Business, Infra, Scale } from "@/components/sections/Scenes";
import { CreatorSection, Audience, Vision, Roadmap, Contact, Footer } from "@/components/sections/Closing";
import { Marquee, SmoothScroll } from "@/components/ui/Kit";
import { Motion } from "@/components/ui/Reveal";
const cats = ["MUSIC", "GAMING", "COMEDY", "FOOTBALL", "TECHNOLOGY", "FASHION", "CULTURE", "EDUCATION"], cities = ["LAGOS", "ACCRA", "NAIROBI", "JOHANNESBURG", "KIGALI", "DAR ES SALAAM", "KAMPALA", "CAIRO"];
export default function Page() {
  return (
    <Motion><SmoothScroll>
      <div aria-hidden className="grain" />
      <Nav />
      <main className="relative bg-ink">
        <Hero />
        <div className="relative z-10 -mt-[100vh] bg-ink" style={{ clipPath: "polygon(0 6vw, 100% 0, 100% 100%, 0 100%)" }}>
          <div className="space-y-2 pb-16 pt-[12vw]"><Marquee items={cats} className="font-display text-6xl md:text-8xl" /><Marquee reverse items={cities} speed={34} className="font-display outline-text text-6xl md:text-8xl" /></div>
          <Showcase />
          <Prototype />
          <ProductTabs />
          <CreatorSection />
          <Dashboard />
          <WhyNow />
          <Audience />
          <GrowthLoop />
          <Business />
          <Infra />
          <AfricaMap />
          <Scale />
          <Vision />
          <Roadmap />
          <Contact />
          <Footer />
        </div>
      </main>
    </SmoothScroll></Motion>
  );
}
