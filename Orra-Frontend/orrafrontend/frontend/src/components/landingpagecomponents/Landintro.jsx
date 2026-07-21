import React from "react";
import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";
import laptop from "../../assets/images/laptop.avif";
import SearchBar from "../common/SearchBar";
const Landintro = () => {
  return (
    <div className="landing-container w-full relative min-h-screen bg-white text-[#0F1424] flex  justify-center overflow-hidden font-sans ">
      <div className="leftside w-[84%] mt-[10%] mb-[12%]">
        <div className=" desc-intro ">
          <div className="intro-head ml-[18%] inline-flex items-center gap-2 p-[5px] rounded-full bg-[#ffffff] border border-[#E0E7FF] mb-6">
            <span className="w-2 h-2 rounded-full bg-[#5046E5]" />
            <span className="text-[#5046E5] text-[12px] font-semibold  ">
              The #1 P2P Rental Marketplace
            </span>
          </div>

          <div className="title-intro ml-[18%]">
            <h1 className="text-[3.4rem] font-[750] leading-[1.3] w-[100%] mb-6 text-[#111827]">
              <span className="block">Rent Electronics.</span>

              <span className="block bg-gradient-to-r from-[#5B63F6] via-[#4F46E5] to-[#06B6D4] bg-clip-text text-transparent w-[70%]">
                Earn From Idle Devices.
              </span>
            </h1>

            <p className="text-[#4B5563] text-[18px] w-[70%]  font-normal leading-relaxed max-w-2xl mb-10 tracking-normal">
              Access premium gadgets without buying. List your unused devices
              and earn passive income safely and securely.
            </p>
          </div>
          <div className="flex ml-[18%] flex-col w-[48%] sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto mb-16">
            <a
              variant="primary"
              className="min-w-[200px] bg-black text-white  rounded-[11px] hover:text-white text-center flex gap-[11px] p-[11px] pl-[27px] hover:bg-gradient-to-r from-[#5B63F6] via-[#4F46E5] to-[#06B6D4] hover:cursor-pointer"
            >
              Browse Devices{" "}
              <ArrowRight className="w-5 h-5 stroke-[2.5] mt-0.5" />
            </a>
            <a
              variant="outline"
              className="min-w-50 border-2 border-gray-300 p-[11px] rounded-lg text-center hover:bg-gray-100 hover:text-black hover:cursor-pointer"
            >
              List Your Device
            </a>
          </div>
          <div className="intro-border w-[90%] ml-[18%]">
            <div className="w-[75%] h-[1px] bg-[#F3F4F6] mb-8" />
            <div className="grid grid-cols-4 w-full max-w-2xl">
              {/* Metric 1 */}
              <div className="flex flex-col ">
                <span className="text-[20px] sm:text-3xl font-extrabold tracking-tight text-[#111827]">
                  10,000+
                </span>
                <span className="text-xs sm:text-sm font-medium text-[#6B7280] mt-1">
                  Rentals Completed
                </span>
              </div>

              <div className="flex flex-col border-l border-[#E5E7EB] pl-8">
                <span className="text-[20px] sm:text-3xl font-extrabold tracking-tight text-[#111827]">
                  5,000+
                </span>
                <span className="text-xs sm:text-sm font-medium text-[#6B7280] mt-1">
                  Verified Users
                </span>
              </div>
              <div className=" flex flex-col border-l border-[#E5E7EB] pl-8">
                <span className="text-[20px] sm:text-3xl font-extrabold tracking-tight text-[#10B981]">
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
      <div className="rightside relative w-[90%] h-[100%] mt-[10%]">
        {/* Background rotated shadow card */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#E0E7FF] to-[#CFFAFE] rounded-[24px] rotate-3 translate-x-4 translate-y-2 w-[70%]" />

        {/* Main yellow image card */}
        <div className="relative w-[80%] h-full rounded-[24px] -rotate-1 overflow-hidden shadow-xl">
          <img
            src={laptop}
            alt="Laptop for rent"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Floating Verified Owner badge */}
        <div className="absolute bottom-6 left-[-24px] bg-white rounded-2xl shadow-lg p-4 flex items-center gap-3 min-w-[220px]">
          <div className="flex items-center justify-center w-9 h-9 rounded-full bg-[#ECFDF5]">
            <svg
              className="w-5 h-5 text-[#10B981]"
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
            <span className="text-[13px] text-[#6B7280] font-medium">
              Verified Owner
            </span>
            <span className="text-[15px] text-[#111827] font-bold">
              Excellent Condition
            </span>
          </div>
        </div>
      </div>

      <div className="searchbottom absolute bottom-[30px] left-1/2 -translate-x-1/2 w-full flex justify-center">
        <div className="w-[700px] bg-white shadow-lg rounded-[28px] p-[6px] flex items-center justify-between">
          {/* Your existing SearchBar */}
          <div className="flex-1">
            <SearchBar />
          </div>

          {/* Right Button (outside SearchBar) */}
          <button className="px-8 py-3 rounded-[18px] bg-gradient-to-r from-[#5B63F6] to-[#4F46E5] text-white font-semibold">
            Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default Landintro;
