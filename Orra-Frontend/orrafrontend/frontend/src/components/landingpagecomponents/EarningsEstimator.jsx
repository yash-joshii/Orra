// components/landingpagecomponents/EarningsEstimator.jsx
import { useState, useMemo } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
    <div className="max-w-4xl mx-auto rounded-2xl overflow-hidden shadow-sm grid grid-cols-1 md:grid-cols-2 bg-white  m-[5%]">
      {/* left panel */}
      <div className="p-10">
        <h3 className="text-2xl font-extrabold text-gray-900 mb-3">
          Estimate your monthly earnings
        </h3>
        <p className="text-sm text-gray-500 mb-8">
          Got tech lying around? See how much you could earn by listing it on
          ORRA when you're not using it.
        </p>

        <label className="block text-xs font-semibold text-gray-700 mb-2">
          What kind of device?
        </label>
        <Select value={device} onValueChange={setDevice}>
          <SelectTrigger className="w-full mb-6">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {Object.entries(DEVICE_RATES).map(([key, { label }]) => (
              <SelectItem key={key} value={key}>
                {label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <div className="flex justify-between items-center mb-2">
          <label className="text-xs font-semibold text-gray-700">
            Days rented per month
          </label>
          <span className="text-xs font-semibold text-indigo-600">
            {days} days
          </span>
        </div>
        <input
          type="range"
          min={1}
          max={30}
          step={1}
          value={days}
          onChange={(e) => setDays(Number(e.target.value))}
          className="w-full accent-indigo-600"
        />
      </div>

      {/* right panel */}
      <div className="bg-[#0F172A] p-10 flex flex-col items-center justify-center text-center">
        <p className="text-xs text-gray-400 mb-2">You could earn up to</p>
        <p className="text-5xl font-extrabold text-white mb-3">
          Rs {earnings.toLocaleString()}
        </p>
        <p className="text-xs text-gray-400 mb-8 max-w-[220px]">
          per month based on average rental rates in your area.
        </p>
        <button className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold px-6 py-3 rounded-lg transition">
          Start Earning Now
        </button>
      </div>
    </div>
  );
};

export default EarningsEstimator;