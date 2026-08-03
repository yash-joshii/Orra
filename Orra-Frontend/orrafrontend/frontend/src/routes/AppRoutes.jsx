import React, { lazy, Suspense, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";

import {
  clearCredentials,
  setCredentials,
} from "@/redux/slices/authslices";

import { GetCurrentUser } from "@/api/authApi";

// Layout & Components
import Mainlayout from "@/layout/Mainlayout";
import ProtectedRoute from "@/components/ProtectedRoute";
import LogoLoader from "@/components/common/LogoLoader";

// Routes
import AdminRoutes from "./AdminRoutes";

// Pages
import Cart from "@/pages/Cart";

// Lazy-loaded pages
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

const AppRoutes = () => {
  const dispatch = useDispatch();

  // Restore logged-in user when app starts
  useEffect(() => {
    const rehydrateAuth = async () => {
      try {
        const response = await GetCurrentUser();

        console.log("GetCurrentUser response:", response.data);

        dispatch(
          setCredentials({
            user: {
              userId: response.data.userId,
              roles: response.data.roles,
            },
          })
        );
      } catch (error) {
        console.error("Authentication failed:", error);
        dispatch(clearCredentials());
      }
    };

    rehydrateAuth();
  }, [dispatch]);

  return (
    <Suspense fallback={<LogoLoader />}>
      <Routes>

        {/* =========================
            MAIN LAYOUT ROUTES
        ========================= */}
        <Route element={<Mainlayout />}>

          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />

          <Route
            path="/browserdevices"
            element={<BrowseDevices />}
          />

          <Route
            path="/listingdevice"
            element={<ListingDevice />}
          />

          <Route
            path="/product/:id"
            element={<Productpage />}
          />

          <Route
            path="/categories"
            element={<Categories />}
          />

          <Route
            path="/cart"
            element={<Cart />}
          />

          {/* =========================
              PROTECTED ROUTES
          ========================= */}

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

        {/* =========================
            ADMIN ROUTES
        ========================= */}
        {AdminRoutes}

        {/* =========================
            AUTH ROUTES
        ========================= */}

        <Route
          path="/signup"
          element={<Signup />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

      </Routes>
    </Suspense>
  );
};

export default AppRoutes;