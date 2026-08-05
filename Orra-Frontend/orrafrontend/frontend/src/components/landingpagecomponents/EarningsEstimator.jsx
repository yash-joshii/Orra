// components/landingpagecomponents/EarningsEstimator.jsx
import { useState, useMemo } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowRight, Sparkles, DollarSign } from "lucide-react";

const DEVICE_RATES = {
  laptop: { label: "Premium Laptop (e.g. MacBook Pro)", rate: 60 },
  drone: { label: "Drone (e.g. DJI Mavic)", rate: 50 },
  camera: { label: "Camera (e.g. Sony Alpha)", rate: 40 },
  console: { label: "Gaming Console", rate: 25 },
  tablet: { label: "Tablet (e.g. iPad Pro)", rate: 20 },
};

const EarningsEstimator = () => {
  const [device, setDevice] = useState("laptop");
  const [days, setDays] = useState(16);

  const earnings = useMemo(() => {
    return Math.round(DEVICE_RATES[device].rate * days);
  }, [device, days]);

  return (
    <div className="max-w-4xl mx-auto my-12 md:my-20 px-4 sm:px-6">
      <div className="rounded-3xl overflow-hidden shadow-xl shadow-slate-200/50 border border-slate-100 grid grid-cols-1 md:grid-cols-2 bg-white transition-all duration-300">
        
        {/* LEFT PANEL (Controls) */}
        <div className="p-8 sm:p-10 lg:p-12 flex flex-col justify-between">
          <div>
            {/* Pill Badge Header */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-[#5046E5] text-xs font-semibold mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Earnings Calculator</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-3">
              Estimate your monthly earnings
            </h3>
            
            <p className="text-sm text-slate-500 leading-relaxed mb-8">
              Got tech lying around? See how much you could earn by listing it on
              ORRA when you're not using it.
            </p>

            {/* Select Device Dropdown */}
            <div className="mb-6">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                What kind of device?
              </label>
              <Select value={device} onValueChange={setDevice}>
                <SelectTrigger className="w-full h-12 rounded-xl border-slate-200 bg-slate-50/50 text-slate-900 font-medium focus:ring-2 focus:ring-[#5046E5] transition-all">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="rounded-xl border-slate-100 shadow-xl">
                  {Object.entries(DEVICE_RATES).map(([key, { label }]) => (
                    <SelectItem key={key} value={key} className="rounded-lg cursor-pointer">
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Days Slider */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
                  Days rented per month
                </label>
                <span className="text-xs font-bold px-2.5 py-1 rounded-md bg-indigo-50 text-[#5046E5] border border-indigo-100">
                  {days} {days === 1 ? "day" : "days"}
                </span>
              </div>
              
              <input
                type="range"
                min={1}
                max={30}
                step={1}
                value={days}
                onChange={(e) => setDays(Number(e.target.value))}
                className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-[#5046E5] transition-all"
              />
              <div className="flex justify-between text-[11px] font-medium text-slate-400 mt-1.5">
                <span>1 day</span>
                <span>15 days</span>
                <span>30 days</span>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT PANEL (Earnings Output) */}
        <div className="relative bg-[#0F172A] p-8 sm:p-10 lg:p-12 flex flex-col items-center justify-center text-center overflow-hidden border-t md:border-t-0 md:border-l border-slate-800">
          
          {/* Ambient Background Glow Effect */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[#5046E5]/15 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col items-center w-full">
            <span className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-2">
              You could earn up to
            </span>

            {/* Big Earnings Counter */}
            <div className="text-4xl sm:text-5xl lg:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-indigo-200 tracking-tight my-3 transition-all duration-300">
              Rs {earnings.toLocaleString()}
            </div>

            <p className="text-xs text-slate-400 max-w-[240px] leading-relaxed mb-8">
              per month based on average rental rates in your area.
            </p>

            {/* CTA Button */}
            <button className="group w-full sm:w-auto bg-[#5046E5] hover:bg-[#4338CA] text-white text-sm font-semibold px-8 py-3.5 rounded-xl transition-all duration-300 shadow-lg shadow-[#5046E5]/25 hover:shadow-indigo-500/40 hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2 cursor-pointer">
              <span>Start Earning Now</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};

export default EarningsEstimator;