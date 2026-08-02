import React, { lazy, Suspense, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";

import { clearCredentials, setCredentials } from "@/redux/slices/authslices";
import { GetCurrentUser } from "@/api/authApi"; // add this import temporarily

// Layout & Pages
import Mainlayout from "@/layout/Mainlayout";
import ProductCard from "@/components/common/ProductCard";
import ProtectedRoute from "@/components/ProtectedRoute";
import LogoLoader from "@/components/common/LogoLoader";
import Cart from "@/pages/Cart";
// import AdminRoutes from "./AdminRoutes";


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
  const dispatch = useDispatch();

 useEffect(() => {
  const rehydrateAuth = async () => {
    try {
      const response = await GetCurrentUser();
      dispatch(setCredentials({
        user: { userId: response.data.userId, roles: response.data.roles },
      }));
    } catch (err) {
      dispatch(clearCredentials());
    }
  };
  rehydrateAuth();
}, [dispatch]);

  return (
     <Suspense fallback={<LogoLoader />}>
    <Routes>
      <Route element={<Mainlayout />}>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/browserdevices" element={<BrowseDevices />} />
        <Route path="/listingdevice" element={<ListingDevice />} />
        <Route path="/settings" element={<SettingPage />} />
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
        {/* <Route
          path="/mybooking/:id"
          element={
            <ProtectedRoute>
              <MyBookings />
            </ProtectedRoute>
          }
        /> */}
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
</Suspense>
  );
};

export default AppRoutes;