import BestSellingProducts from "@/components/BestSellingProducts";
import CategorySection from "@/components/CategorySection";
import CustomerReviews from "@/components/CustomerReviews";
import DiscountOffers from "@/components/DiscountOffers";
import FeaturedProducts from "@/components/FeaturedProducts";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";



export default function HomePage() {
  return (
    <div>
      <HeroSection />
      <CategorySection/>
      <FeaturedProducts/>
      <DiscountOffers/>
      <BestSellingProducts/>
      <CustomerReviews/>
      <Footer/>
    </div>
  );
}