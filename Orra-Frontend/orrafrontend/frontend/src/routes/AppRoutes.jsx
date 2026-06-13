import Navbar from "@/components/common/Navbar";
import Mainlayout from "@/layout/Mainlayout";
import LandingPage from "@/pages/LandingPage";
import Login from "@/pages/Login";
import React from "react";
import { Route, Routes } from "react-router-dom";

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<Mainlayout />}>
        <Route path="/" element={<LandingPage/>} />

      </Route>
       <Route path="/login" element={<Login/>} />
    </Routes>
  );
};

export default AppRoutes;
