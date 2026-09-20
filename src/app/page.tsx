import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { StickyBar } from "@/components/layout/StickyBar";
import { Hero } from "@/components/sections/Hero";
import { TrustStrip } from "@/components/sections/TrustStrip";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <TrustStrip />
      </main>
      <Footer />
      <StickyBar />
    </>
  );
}
