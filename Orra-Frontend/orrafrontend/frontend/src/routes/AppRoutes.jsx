import React, { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";

import Mainlayout from "@/layout/Mainlayout";
import ProtectedRoute from "@/components/ProtectedRoute";
import ProductCard from "@/components/common/ProductCard";
import LogoLoader from "@/components/common/LogoLoader";
import AdminRoutes from "./AdminRoutes";


const LandingPage = lazy(() => import("@/pages/LandingPage"));

const BrowseDevices = lazy(() => import("@/pages/BrowseDevices"));

const ListingDevice = lazy(() => import("@/pages/ListingDevice"));

const Productpage = lazy(() => import("@/pages/Productpage"));

const Wishlist = lazy(() => import("@/pages/Wishlist"));

const Categories = lazy(() => import("@/pages/Categories"));

const Dashboard = lazy(() => import("@/pages/Dashboard"));

const SettingPage = lazy(() => import("@/pages/SettingPage"));

const Signup = lazy(() => import("@/pages/Signup"));

const Login = lazy(() => import("@/pages/Login"));

const Bookings = lazy(() => import("@/pages/Bookings"));

const MyBookings = lazy(() => import("@/pages/MyBookings"));

const SearchResults = lazy(() => import("@/pages/SearchResults"));

const AppRoutes = () => {
  return (
     <Suspense fallback={<LogoLoader />}>
    <Routes>
      <Route element={<Mainlayout />}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/browserdevices" element={<BrowseDevices />}
        />
        <Route path="/listingdevice" element={<ListingDevice />} />
        <Route path="/settings" element={<SettingPage />} />
        <Route path="/product/:id" element={<Productpage />} />
        <Route path="/categories" element={<Categories />} />
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
      {AdminRoutes}
      <Route path="/mybookings" element={
        <ProtectedRoute>
          <MyBookings />
        </ProtectedRoute>
      } />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/product" element={<ProductCard />} />
    </Routes>
</Suspense>
  );
};

export default AppRoutes;