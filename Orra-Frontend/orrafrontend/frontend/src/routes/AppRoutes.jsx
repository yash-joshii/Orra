import React, { lazy, Suspense, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import ProfilePage from "@/pages/ProfilePage";
import { clearCredentials, setCredentials } from "@/redux/slices/authslices";
import { GetCurrentUser } from "@/api/authApi"; // add this import temporarily

// Layout & Pages
import Mainlayout from "@/layout/Mainlayout";
import ProductCard from "@/components/common/ProductCard";
import ProtectedRoute from "@/components/ProtectedRoute";
import LogoLoader from "@/components/common/LogoLoader";
import AdminRoutes from "./AdminRoutes";
import Cart from "@/pages/Cart";

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
const AuthCallback = lazy(() => import("@/pages/AuthCallback"));
const Bookings = lazy(() => import("@/pages/Bookings"));
const MyBookings = lazy(() => import("@/pages/MyBookings"));
const SearchResults = lazy(() => import("@/pages/SearchResults"));

const MyListings = lazy(() => import("@/pages/MyListings"));

const AppRoutes = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const rehydrateAuth = async () => {
      try {
        const response = await GetCurrentUser();
        console.log("GetCurrentUser response:", response.data);
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
          <Route path="/profile" element={<ProfilePage />} />

          {/* Cart Page Route */}
          <Route path="/cart" element={<Cart />} />

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
        {/* 💡 2. Add Route for MyListings */}
          <Route
            path="/my-listings"
            element={
              <ProtectedRoute>
                <MyListings />
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
      {AdminRoutes}
      <Route path="/mybookings" element={
        <ProtectedRoute>
          <MyBookings />
        </ProtectedRoute>
      } />

        {/* Auth Routes outside MainLayout */}
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/auth/callback" element={<AuthCallback />} />
        <Route path="/product" element={<ProductCard />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;