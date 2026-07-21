import Navbar from "@/components/common/Navbar";
import ProductCard from "@/components/common/ProductCard";
import Mainlayout from "@/layout/Mainlayout";
import BrowseDevices from "@/pages/BrowseDevices";
import LandingPage from "@/pages/LandingPage";
import Login from "@/pages/Login";
import Signup from "@/pages/Signup";
import WhyChooseOrra from "@/pages/WhyChooseOrra";
import React from "react";
import { Route, Routes } from "react-router-dom";
import Bookings from "@/pages/Bookings";

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<Mainlayout />}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/browserdevices" element={<BrowseDevices />} />
        <Route path="/booking/:id" element={<Bookings />} />
      </Route>
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/product" element={<ProductCard />} />
    </Routes>
  );
};

export default AppRoutes;
