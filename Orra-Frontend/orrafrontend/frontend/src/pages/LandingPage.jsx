import React from "react";
import WhyChooseOrra from "./WhyChooseOrra";
import Landintro from "@/components/landingpagecomponents/Landintro";
import ExploreCategory from "@/components/landingpagecomponents/ExploreCategory";
import HowItWorks from "@/components/landingpagecomponents/HowItWorks";
import EarningsEstimator from "@/components/landingpagecomponents/EarningsEstimator";
import FAQSection from "@/components/landingpagecomponents/FAQSection";

const LandingPage = () => {
  return (
    <>
      <Landintro />
      <ExploreCategory/>
      <WhyChooseOrra />
      <HowItWorks/>
      <EarningsEstimator/>
      <FAQSection/>
    </>
  );
};
export default LandingPage;
