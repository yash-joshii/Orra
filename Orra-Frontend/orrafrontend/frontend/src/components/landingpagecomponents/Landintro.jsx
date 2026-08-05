import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";

import { Button } from "../ui/button";
import SearchBar from "../common/SearchBar";
import laptop from "../../assets/images/laptop.avif";

const Landintro = () => {
  const navigate = useNavigate();

  return (
    <div className="landing-container relative flex min-h-screen w-full justify-center overflow-hidden bg-white font-sans text-[#0F1424]">
      {/* Left Section */}
      <div className="leftside w-[84%] mt-[10%] mb-[12%]">
        <div className="desc-intro">
          {/* Badge */}
          <div className="intro-head ml-[18%] inline-flex items-center gap-2 rounded-full border border-[#E0E7FF] bg-white p-[5px] mb-6">
            <span className="h-2 w-2 rounded-full bg-[#5046E5]" />
            <span className="text-[12px] font-semibold text-[#5046E5]">
              The #1 P2P Rental Marketplace
            </span>
          </div>

          {/* Heading */}
          <div className="title-intro ml-[18%]">
            <h1 className="mb-6 w-full text-[3.4rem] font-[750] leading-[1.3] text-[#111827]">
              <span className="block">Rent Electronics.</span>

              <span className="block w-[70%] bg-gradient-to-r from-[#5B63F6] via-[#4F46E5] to-[#06B6D4] bg-clip-text text-transparent">
                Earn From Idle Devices.
              </span>
            </h1>

            <p className="mb-10 w-[70%] max-w-2xl text-[18px] font-normal leading-relaxed tracking-normal text-[#4B5563]">
              Access premium gadgets without buying. List your unused devices
              and earn passive income safely and securely.
            </p>
          </div>

          {/* Buttons */}
          <div className="ml-[18%] mb-16 flex w-[48%] flex-col gap-4 sm:flex-row sm:items-center">
            <Button
              className="min-w-[200px] rounded-[11px] bg-[#FAF0CA] p-[11px] pl-[27px] text-black hover:cursor-pointer hover:bg-gradient-to-r hover:from-[#5B63F6] hover:via-[#4F46E5] hover:to-[#06B6D4] hover:text-white flex items-center gap-[11px]"
            >
              Browse Devices
              <ArrowRight className="h-5 w-5 stroke-[2.5]" />
            </Button>

            <Button
              variant="outline"
              onClick={() => navigate("/listingdevice")}
              className="min-w-[200px] rounded-lg border-2 border-gray-300 p-[11px] hover:cursor-pointer hover:bg-gray-100 hover:text-black"
            >
              List Your Device
            </Button>
          </div>

          {/* Stats */}
          <div className="intro-border ml-[18%] w-[90%]">
            <div className="mb-8 h-[1px] w-[75%] bg-[#F3F4F6]" />

            <div className="grid max-w-2xl grid-cols-3 gap-6">
              <div className="flex flex-col">
                <span className="text-[20px] font-extrabold tracking-tight text-[#111827] sm:text-3xl">
                  10,000+
                </span>
                <span className="mt-1 text-xs font-medium text-[#6B7280] sm:text-sm">
                  Rentals Completed
                </span>
              </div>

              <div className="flex flex-col border-l border-[#E5E7EB] pl-8">
                <span className="text-[20px] font-extrabold tracking-tight text-[#111827] sm:text-3xl">
                  5,000+
                </span>
                <span className="mt-1 text-xs font-medium text-[#6B7280] sm:text-sm">
                  Verified Users
                </span>
              </div>

              <div className="flex flex-col border-l border-[#E5E7EB] pl-8">
                <span className="text-[20px] font-extrabold tracking-tight text-[#10B981] sm:text-3xl">
                  ₹50L+
                </span>
                <span className="mt-1 text-xs font-medium text-[#6B7280] sm:text-sm">
                  Earned by Owners
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="rightside relative mt-[10%] w-[90%] min-h-[600px]">
        {/* Background Card */}
        <div className="absolute inset-0 w-[70%] translate-x-4 translate-y-2 rotate-3 rounded-[24px] border border-white/40 bg-gradient-to-br from-[#E0E7FF]/60 to-[#CFFAFE]/60 backdrop-blur-xl" />

        {/* Image */}
        <div className="relative h-full w-[80%] -rotate-1 overflow-hidden rounded-[24px] shadow-xl">
          <img
            src={laptop}
            alt="Laptop for rent"
            className="h-full w-full object-cover"
          />
        </div>

        {/* Floating Card */}
        <div className="absolute bottom-6 left-[-24px] flex min-w-[220px] items-center gap-3 rounded-2xl border border-white/40 bg-white/25 p-4 shadow-lg backdrop-blur-xl">
          <div className="flex h-9 w-9 items-center justify-center rounded-full border border-white/30 bg-[#ECFDF5]/60 backdrop-blur-md">
            <svg
              className="h-5 w-5 text-[#10B981]"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
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
            <span className="text-[13px] font-medium text-[#6B7280]">
              Verified Owner
            </span>
            <span className="text-[15px] font-bold text-[#111827]">
              Excellent Condition
            </span>
          </div>
        </div>
      </div>

     {/* Glass Search Bar */}
<div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-full flex justify-center z-20">
  <div
    className="
      flex
      items-center
      w-[850px]
      rounded-full
      border
      border-white/40
      bg-white/20
      backdrop-blur-3xl
      shadow-[0_10px_40px_rgba(0,0,0,0.15)]
      p-2
    "
  >
    {/* Search Input */}
    <div className="flex-1">
      <SearchBar />
    </div>

    {/* Search Button */}
    <Button
      className="
        h-[54px]
        px-10
        rounded-full
        bg-[#FFF4C7]/90
        text-black
        font-semibold
        hover:bg-[#FFE89A]
        hover:scale-105
        transition-all
        duration-300
      "
    >
      Search
    </Button>
  </div>
</div>
    </div>
  );
};

export default Landintro;