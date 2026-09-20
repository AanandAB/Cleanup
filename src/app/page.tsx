import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { StickyBar } from "@/components/layout/StickyBar";
import { Hero } from "@/components/sections/Hero";
import { TrustStrip } from "@/components/sections/TrustStrip";
import { Services } from "@/components/sections/Services";
import { BeforeAfter } from "@/components/sections/BeforeAfter";
import { Process } from "@/components/sections/Process";
import { WhyUs } from "@/components/sections/WhyUs";
import { Projects } from "@/components/sections/Projects";
import { ServiceAreas } from "@/components/sections/ServiceAreas";
import { Reviews } from "@/components/sections/Reviews";
import { FAQ } from "@/components/sections/FAQ";
import { CTA } from "@/components/sections/CTA";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <TrustStrip />
        <Services />
        <BeforeAfter />
        <Process />
        <WhyUs />
        <Projects />
        <ServiceAreas />
        <Reviews />
        <FAQ />
        <CTA />
      </main>
      <Footer />
      <StickyBar />
    </>
  );
}
