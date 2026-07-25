import { Routes, Route } from "react-router-dom";

import Mainlayout from "@/layout/Mainlayout";

import LandingPage from "@/pages/LandingPage";
import BrowseDevices from "@/pages/BrowseDevices";
import Signup from "@/pages/Signup";
import Login from "@/pages/Login";
import SettingPage from "@/pages/SettingPage";
import Bookings from "@/pages/Bookings";
import Productpage from "@/pages/Productpage";

import ProductCard from "@/components/common/ProductCard";

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<Mainlayout />}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/browserdevices" element={<BrowseDevices />} />
        <Route path="/settings" element={<SettingPage />} />
        <Route path="/booking" element={<Bookings/>} />
        <Route path="/product/:id" element={<Productpage />} />
      </Route>

      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/product" element={<ProductCard />} />
    </Routes>
  );
};

export default AppRoutes;