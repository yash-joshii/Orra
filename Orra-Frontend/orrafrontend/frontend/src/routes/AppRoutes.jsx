import Navbar from "@/components/common/Navbar";
import ProductCard from "@/components/common/ProductCard";
import ProductDetails from "@/components/Productpagecomponent/ProductDetails";
import ProductSummary from "@/components/Productpagecomponent/ProductSummary";
import Mainlayout from "@/layout/Mainlayout";
import Booking from "@/pages/Bookings";
import BrowseDevices from "@/pages/BrowseDevices";

import LandingPage from "@/pages/LandingPage";
import ListingDevice from "@/pages/ListingDevice";
import Login from "@/pages/Login";
import Productpage from "@/pages/Productpage";
import Signup from "@/pages/Signup";
import WhyChooseOrra from "@/pages/WhyChooseOrra";
import React from "react";
import { Route, Routes } from "react-router-dom";

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<Mainlayout />}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/browserdevices" element={<BrowseDevices />} 
         />
         <Route path="/listingdevice" element={<ListingDevice/>} />
          

      </Route>
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/product" element={<ProductCard />} />


    </Routes>
  );
};

export default AppRoutes;
