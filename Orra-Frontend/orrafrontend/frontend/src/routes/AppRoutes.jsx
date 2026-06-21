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

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<Mainlayout />}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/browserdevices" element={<BrowseDevices />} />
      </Route>
<<<<<<< HEAD
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/product" element={<ProductCard />} />
=======
       <Route path="/signup" element={<Signup/>} />
       <Route path="/login" element={<Login/>} />
       <Route path="/WhyChooseOrra" element={<WhyChooseOrra/>} />
>>>>>>> d9e0292002e351368a99f0c600f0e723e9e03dbe
    </Routes>
  );
};

export default AppRoutes;
