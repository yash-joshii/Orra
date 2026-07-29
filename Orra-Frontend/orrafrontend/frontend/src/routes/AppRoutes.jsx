import { Routes, Route } from "react-router-dom";

import Mainlayout from "@/layout/Mainlayout";

import LandingPage from "@/pages/LandingPage";
import BrowseDevices from "@/pages/BrowseDevices";
import Signup from "@/pages/Signup";
// import WhyChooseOrra from "@/pages/WhyChooseOrra";
import React from "react";
import Categories from "@/pages/Categories";
import Productpage from "@/pages/Productpage";
import SettingPage from "@/pages/SettingPage";
import Dashboard from "@/pages/Dashboard";
import Login from "@/pages/Login";
import ProductCard from "@/components/common/ProductCard";
import ProtectedRoute from "@/components/ProtectedRoute";
import Bookings from "@/pages/Bookings";
import MyBookings from "@/pages/MyBookings";
// import { Route, Routes } from "react-router-dom";

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<Mainlayout />}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/browserdevices" element={<BrowseDevices />} />
        <Route path="/settings" element={<SettingPage />} />
        <Route path="/product/:id" element={<Productpage />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/booking/:id" element={
          <ProtectedRoute>
            <Bookings />
          </ProtectedRoute>
          } />

        <Route path="/mybooking/:id" element={
          <ProtectedRoute>
            <MyBookings />
          </ProtectedRoute>
          } />
          
        <Route path="/dashboard" element={<Dashboard />} />
      </Route>

      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/product" element={<ProductCard />} />
    </Routes>
  );
};

export default AppRoutes;