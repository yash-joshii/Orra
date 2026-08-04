import React from "react";
import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";
import laptop from "../../assets/images/laptop.avif";
import SearchBar from "../common/SearchBar";
import { Navigate, useNavigate } from "react-router-dom";
const Landintro = () => {
  const navigate = useNavigate();

  return (
    <div className="landing-container relative min-h-screen w-full bg-gradient-to-b from-slate-50/50 via-white to-slate-50/30 text-[#0F1424] font-sans overflow-x-hidden flex flex-col justify-between">
      {/* Background Subtle Radial Gradient */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-gradient-to-tr from-indigo-100/40 via-cyan-50/30 to-transparent blur-3xl -z-10 pointer-events-none" />

      {/* Main Content Container */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-12 md:pt-20 pb-36 w-full flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16">
        {/* Left Side (Headline, CTAs, Metrics) */}
        <div className="leftside w-full lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left z-10">
          <div className="desc-intro w-full">
            {/* Pill Badge with Subtle Pulse Animation */}
            <div className="intro-head inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/80 backdrop-blur-sm border border-indigo-100 shadow-sm mb-6 transition-all hover:border-indigo-200">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#5046E5]"></span>
              </span>
              <span className="text-[#5046E5] text-xs font-semibold tracking-wide">
                The #1 P2P Rental Marketplace
              </span>
            </div>

            {/* Title Section */}
            <div className="title-intro">
              <h1 className="text-4xl sm:text-5xl lg:text-[3.6rem] font-extrabold leading-[1.15] tracking-tight mb-6 text-[#111827]">
                <span className="block mb-1">Rent Electronics.</span>
                <span className="block bg-gradient-to-r from-[#5B63F6] via-[#4F46E5] to-[#06B6D4] bg-clip-text text-transparent">
                  Earn From Idle Devices.
                </span>
              </h1>

              <p className="text-[#4B5563] text-base sm:text-lg font-normal leading-relaxed max-w-xl mb-8 mx-auto lg:mx-0">
                Access premium gadgets without buying. List your unused devices
                and earn passive income safely and securely.
              </p>
            </div>

            {/* Action Buttons (Unified Button Palette) */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 w-full sm:w-auto mb-12">
              <Button
                onClick={() => navigate("/browserdevices")}
                className="w-full sm:w-auto min-w-[170px] h-12 bg-[#5046E5] hover:bg-[#4338CA] text-white font-medium rounded-xl transition-all duration-300 shadow-lg shadow-[#5046E5]/20 hover:shadow-indigo-500/35 hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2 cursor-pointer"
              >
                Browse Devices{" "}
                <ArrowRight className="w-4 h-4 stroke-[2.5] transition-transform duration-300 group-hover:translate-x-1" />
              </Button>

              <Button
                onClick={() => navigate("/listingdevice")}
                className="w-full sm:w-auto min-w-[170px] h-12 bg-[#5046E5] hover:bg-[#4338CA] text-white font-medium rounded-xl transition-all duration-300 shadow-lg shadow-[#5046E5]/20 hover:shadow-indigo-500/35 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
              >
                List Your Device
              </Button>
            </div>

            {/* Metrics Section */}
            <div className="intro-border w-full border-t border-gray-100 pt-8">
              <div className="grid grid-cols-3 gap-4 sm:gap-8 max-w-lg mx-auto lg:mx-0">
                {/* Metric 1 */}
                <div className="flex flex-col items-center lg:items-start transition-transform duration-300 hover:scale-[1.03]">
                  <span className="text-xl sm:text-2xl lg:text-3xl font-extrabold tracking-tight text-[#111827]">
                    10,000+
                  </span>
                  <span className="text-xs sm:text-sm font-medium text-[#6B7280] mt-1">
                    Rentals Completed
                  </span>
                </div>

                {/* Metric 2 */}
                <div className="flex flex-col items-center lg:items-start border-l border-[#E5E7EB] pl-4 sm:pl-8 transition-transform duration-300 hover:scale-[1.03]">
                  <span className="text-xl sm:text-2xl lg:text-3xl font-extrabold tracking-tight text-[#111827]">
                    5,000+
                  </span>
                  <span className="text-xs sm:text-sm font-medium text-[#6B7280] mt-1">
                    Verified Users
                  </span>
                </div>

                {/* Metric 3 */}
                <div className="flex flex-col items-center lg:items-start border-l border-[#E5E7EB] pl-4 sm:pl-8 transition-transform duration-300 hover:scale-[1.03]">
                  <span className="text-xl sm:text-2xl lg:text-3xl font-extrabold tracking-tight text-[#10B981]">
                    ₹50L+
                  </span>
                  <span className="text-xs sm:text-sm font-medium text-[#6B7280] mt-1">
                    Earned by Owners
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side (Image & Floating Badge) */}
        <div className="rightside relative w-full lg:w-1/2 max-w-md lg:max-w-lg flex justify-center items-center">
          <div className="relative w-full aspect-square transition-transform duration-700 hover:scale-[1.01]">
            {/* Background Rotated Gradient Shadow Card */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#E0E7FF] to-[#CFFAFE] rounded-[28px] rotate-3 translate-x-3 translate-y-3 shadow-md -z-10" />

            {/* Main Image Container */}
            <div className="relative w-full h-full rounded-[28px] -rotate-1 overflow-hidden shadow-2xl bg-amber-300 border border-white/60 group">
              <img
                src={laptop}
                alt="Laptop for rent"
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
            </div>

            {/* Floating Verified Owner Badge with Micro-Hover Animation */}
            <div className="absolute -bottom-5 -left-4 sm:-left-6 bg-white/95 backdrop-blur-md rounded-2xl shadow-xl p-3.5 sm:p-4 flex items-center gap-3.5 min-w-[210px] border border-gray-100/80 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[#ECFDF5] shrink-0">
                <svg
                  className="w-5 h-5 text-[#10B981]"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="text-[12px] text-[#6B7280] font-medium leading-none mb-1">
                  Verified Owner
                </span>
                <span className="text-sm text-[#111827] font-bold leading-tight">
                  Excellent Condition
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Landintro;
