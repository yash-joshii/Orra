import React from "react";
import WhyChooseOrra from "./WhyChooseOrra";
import Landintro from "@/components/landingpagecomponents/Landintro";
import ExploreCategory from "@/components/landingpagecomponents/ExploreCategory";

const LandingPage = () => {
  return (
    <>
      <Landintro />
      <ExploreCategory/>
      <WhyChooseOrra />
    </>
  );
};
export default LandingPage;
