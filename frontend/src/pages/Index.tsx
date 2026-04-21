import Header from "@/components/site/Header";
import Hero from "@/components/site/Hero";
import HowItWorks from "@/components/site/HowItWorks";
import Destinations from "@/components/site/Destinations";
import Pricing from "@/components/site/Pricing";
import Faq from "@/components/site/Faq";
import Footer from "@/components/site/Footer";

const Index = () => {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <HowItWorks />
      <Destinations />
      <Pricing />
      <Faq />
      <Footer />
    </main>
  );
};

export default Index;
