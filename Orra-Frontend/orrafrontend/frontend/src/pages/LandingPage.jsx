import React from "react";
import WhyChooseOrra from "./WhyChooseOrra";
import Landintro from "@/components/landingpagecomponents/Landintro";
import ExploreCategory from "@/components/landingpagecomponents/ExploreCategory";
import HowItWorks from "@/components/landingpagecomponents/HowItWorks";
import EarningsEstimator from "@/components/landingpagecomponents/EarningsEstimator";
import FAQSection from "@/components/landingpagecomponents/FAQSection";
import TrendingNearYou from "@/components/landingpagecomponents/TrendingNearYou";

const LandingPage = () => {
  return (
    <div className="w-full min-h-screen bg-white font-sans antialiased overflow-x-hidden">
      <Landintro />
      <ExploreCategory />
      {/* <TrendingNearYou /> */}
      <WhyChooseOrra />
      <HowItWorks />
      <EarningsEstimator />
      <FAQSection />
    </div>
  );
};

export default LandingPage;