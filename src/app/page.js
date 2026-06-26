import FeaturedProducts from "@/components/FeaturedProducts";
import Hero from "@/components/Hero";
import PopularCategories from "@/components/PopularCategories";
import SuccessStories from "@/components/SuccessStories";
import SustainabilityImpact from "@/components/SustainabilityImpact";
import TrustedSellers from "@/components/TrustedSellers";


export default function Home() {
  return (
    <>
      <Hero />
      <FeaturedProducts/>
      <PopularCategories/>
      <SuccessStories/>
      <SustainabilityImpact/>
      <TrustedSellers/>
    </>
  );
}
