import React from "react";
import { Search, PlaySquare, Camera, RotateCcw } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: Search,
    title: "Search Devices",
    description: "Browse locally available premium gear.",
  },
  {
    number: "02",
    icon: PlaySquare,
    title: "Book Instantly",
    description: "Select your dates and book securely.",
  },
  {
    number: "03",
    icon: Camera,
    title: "Use & Enjoy",
    description: "Meet the owner, pick up, and create.",
  },
  {
    number: "04",
    icon: RotateCcw,
    title: "Return Securely",
    description: "Return the device and leave a review.",
  },
];

const HowItWorks = () => {
  return (
    <section className="relative bg-slate-50/60 py-20 lg:py-28 px-6 overflow-hidden">
      
      {/* Background Subtle Gradient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-indigo-100/30 blur-3xl rounded-full -z-10 pointer-events-none" />

      {/* Header Section */}
      <div className="text-center max-w-2xl mx-auto mb-16 md:mb-20">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-100/80 mb-4 shadow-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-[#5046E5] animate-pulse" />
          <span className="text-[#5046E5] text-xs font-semibold uppercase tracking-wider">
            Simple Process
          </span>
        </div>

        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-3">
          How It Works
        </h2>
        
        <p className="text-base text-slate-600 max-w-md mx-auto leading-relaxed">
          Getting the gear you need is as easy as 1-2-3-4.
        </p>
      </div>

      {/* Steps Grid */}
      <div className="relative max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-y-12 gap-x-6 lg:gap-x-10">
        
        {/* Connecting Gradient Line (Desktop Only) */}
        <div 
          className="hidden md:block absolute top-9 left-[12.5%] right-[12.5%] h-[2px] bg-gradient-to-r from-indigo-100 via-indigo-300 to-indigo-100 -z-0" 
          aria-hidden="true"
        />

        {steps.map((step) => {
          const Icon = step.icon;
          return (
            <div
              key={step.number}
              className="group relative z-10 flex flex-col items-center text-center cursor-default"
            >
              {/* Icon & Number Badge Container */}
              <div className="relative mb-5">
                <div className="w-18 h-18 sm:w-20 sm:h-20 rounded-2xl bg-white shadow-sm border border-slate-200/80 flex items-center justify-center transition-all duration-300 ease-out group-hover:border-indigo-500/50 group-hover:shadow-lg group-hover:shadow-indigo-500/10 group-hover:-translate-y-1.5">
                  <Icon 
                    className="w-7 h-7 text-slate-700 transition-all duration-300 group-hover:text-[#5046E5] group-hover:scale-110" 
                    strokeWidth={1.8} 
                  />
                </div>
                
                {/* Step Badge */}
                <span className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-[#5046E5] text-white text-[11px] font-extrabold flex items-center justify-center shadow-md shadow-indigo-500/25 transition-transform duration-300 group-hover:scale-110">
                  {step.number}
                </span>
              </div>

              {/* Title & Description */}
              <h3 className="font-bold text-slate-900 text-base sm:text-lg mb-1.5 transition-colors duration-200 group-hover:text-[#5046E5]">
                {step.title}
              </h3>
              
              <p className="text-xs sm:text-sm text-slate-500 max-w-[170px] leading-relaxed">
                {step.description}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default HowItWorks;