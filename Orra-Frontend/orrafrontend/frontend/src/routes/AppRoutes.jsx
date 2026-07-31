import React from "react";
import { Routes, Route } from "react-router-dom";

// Layout & Pages
import Mainlayout from "@/layout/Mainlayout";
import LandingPage from "@/pages/LandingPage";
import BrowseDevices from "@/pages/BrowseDevices";
import ListingDevice from "@/pages/ListingDevice";
import Productpage from "@/pages/Productpage";
import Categories from "@/pages/Categories";
import SettingPage from "@/pages/SettingPage";
import Dashboard from "@/pages/Dashboard";
import Wishlist from "@/pages/Wishlist";
import Signup from "@/pages/Signup";
import Login from "@/pages/Login";

// Booking & Cart Pages
import Bookings from "@/pages/Bookings";
import MyBookings from "@/pages/MyBookings";
import Cart from "@/pages/Cart"; // 👈 1. Import Cart page

import ProtectedRoute from "@/components/ProtectedRoute";
import ProductCard from "@/components/common/ProductCard";

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<Mainlayout />}>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/browserdevices" element={<BrowseDevices />} />
        <Route path="/listingdevice" element={<ListingDevice />} />
        <Route path="/product/:id" element={<Productpage />} />
        <Route path="/categories" element={<Categories />} />

        {/* Cart Page Route */}
        <Route path="/cart" element={<Cart />} /> {/* 👈 2. Add Cart Route */}

        {/* Protected User Routes */}
        <Route
          path="/wishlist"
          element={
            <ProtectedRoute>
              <Wishlist />
            </ProtectedRoute>
          }
        />
        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <SettingPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/booking/:id"
          element={
            <ProtectedRoute>
              <Bookings />
            </ProtectedRoute>
          }
        />
        <Route
          path="/mybooking/:id"
          element={
            <ProtectedRoute>
              <MyBookings />
            </ProtectedRoute>
          }
        />
        <Route
          path="/mybookings"
          element={
            <ProtectedRoute>
              <MyBookings />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Route>

      {/* Auth Routes outside MainLayout */}
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/product" element={<ProductCard />} />
    </Routes>
  );
};

export default AppRoutes;