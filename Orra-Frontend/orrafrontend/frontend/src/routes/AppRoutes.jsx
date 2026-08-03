import { Routes, Route } from "react-router-dom";
import SearchResults from "@/pages/SearchResults";
import Mainlayout from "@/layout/Mainlayout";
import Booking from "@/pages/Bookings";
import BrowseDevices from "@/pages/BrowseDevices";

import LandingPage from "@/pages/LandingPage";
import ListingDevice from "@/pages/ListingDevice";
import Login from "@/pages/Login";
import Productpage from "@/pages/Productpage";
import Signup from "@/pages/Signup";
// import WhyChooseOrra from "@/pages/WhyChooseOrra";
import React from "react";
import Wishlist from "@/pages/Wishlist";

import Categories from "@/pages/Categories";

import SettingPage from "@/pages/SettingPage";
import Dashboard from "@/pages/Dashboard";

import ProductCard from "@/components/common/ProductCard";
import ProtectedRoute from "@/components/ProtectedRoute";
import Bookings from "@/pages/Bookings";
import MyBookings from "@/pages/MyBookings";
import ProfilePage from "@/pages/ProfilePage";
// import { Route, Routes } from "react-router-dom";

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<Mainlayout />}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/browserdevices" element={<BrowseDevices />}
        />
        <Route path="/listingdevice" element={<ListingDevice />} />
        <Route path="/product/:id" element={<Productpage />} />
        <Route path="/settings" element={<SettingPage />} />
        <Route path="/product/:id" element={<Productpage />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/profile" element={
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        } />
        <Route path="/booking/:id" element={
          <ProtectedRoute>
            <Bookings />
          </ProtectedRoute>
        } />

        {/* <Route path="/mybookings" element={
          <ProtectedRoute>
        <MyBookings/>
          </ProtectedRoute>
          } /> */}

        <Route path="/dashboard" element={<Dashboard />} />
      </Route>
      <Route path="/mybookings" element={
        <ProtectedRoute>
          <MyBookings />
        </ProtectedRoute>
      } />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/product" element={<ProductCard />} />
    </Routes>
  );
};

export default AppRoutes;