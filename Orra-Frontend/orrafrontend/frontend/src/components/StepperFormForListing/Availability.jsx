import React from "react";
import { Info, ArrowLeft, ArrowRight, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Availability = ({ prev, next, formData, setFormData }) => {
  const today = new Date().toISOString().split("T")[0];
  const navigation = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      availability: {
        ...prev.availability,
        [name]: value,
      },
    }));
  };

  // Comprehensive validation to enable/disable the Submit button
  const validateForm = () => {
    const {
      availableFrom,
      availableTo,
      minimumRentalDays,
      maximumRentalDays,
    } = formData.availability || {};

    // 1. 'Available From' is strictly required
    if (!availableFrom) return false;

    // 2. If 'Available To' is provided, it cannot be before 'Available From'
    if (availableTo && new Date(availableTo) < new Date(availableFrom)) {
      return false;
    }

    const minDays = minimumRentalDays ? parseInt(minimumRentalDays, 10) : null;
    const maxDays = maximumRentalDays ? parseInt(maximumRentalDays, 10) : null;

    // 3. Minimum days must be at least 1 (if provided)
    if (minDays !== null && minDays < 1) return false;

    // 4. Maximum days must be at least 1 (if provided)
    if (maxDays !== null && maxDays < 1) return false;

    // 5. Max days cannot be less than Min days (if both are provided)
    if (minDays !== null && maxDays !== null && maxDays < minDays) {
      return false;
    }

    return true; // Form is valid
  };

  const isNextDisabled = !validateForm();

  return (
    <div className="bg-white rounded-3xl shadow-xs border border-slate-200/80 p-6 sm:p-8 space-y-6">

      {/* Card Header */}
      <div className="flex items-center gap-3 pb-5 border-b border-slate-100">
        <div className="p-2.5 bg-indigo-50 text-indigo-600 rounded-2xl">
          <Info className="w-5 h-5" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-slate-900">Availability & Rules</h2>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            Schedule when renters can book your device and set duration limits.
          </p>
        </div>
      </div>

      <div className="space-y-5">

        {/* Date Inputs Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

          {/* Available From */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Available From <span className="text-rose-500">*</span>
            </label>
            <input
              type="date"
              name="availableFrom"
              min={today}
              value={formData.availability?.availableFrom || ""}
              onChange={handleChange}
              className="w-full h-12 rounded-2xl border border-slate-200 bg-slate-50/50 px-4 text-slate-800 text-sm outline-none focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all font-medium cursor-pointer"
            />
          </div>

          {/* Available Until */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Available Until
            </label>
            <input
              type="date"
              name="availableTo"
              min={formData.availability?.availableFrom || today}
              value={formData.availability?.availableTo || ""}
              onChange={handleChange}
              className="w-full h-12 rounded-2xl border border-slate-200 bg-slate-50/50 px-4 text-slate-800 text-sm outline-none focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all font-medium cursor-pointer"
            />
          </div>

        </div>

        {/* Rental Duration Limits Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

          {/* Minimum Rental Days */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Min Rental (Days)
            </label>
            <div className="relative">
              <input
                type="number"
                name="minimumRentalDays"
                placeholder="1"
                min="1"
                value={formData.availability?.minimumRentalDays || ""}
                onChange={handleChange}
                className="w-full h-12 rounded-2xl border border-slate-200 bg-slate-50/50 pl-11 pr-4 text-slate-800 text-sm outline-none focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all font-medium placeholder:text-slate-400"
              />
              <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                <Clock className="w-4 h-4" />
              </div>
            </div>
          </div>

          {/* Maximum Rental Days */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Max Rental (Days)
            </label>
            <div className="relative">
              <input
                type="number"
                name="maximumRentalDays"
                placeholder="30"
                min={formData.availability?.minimumRentalDays || "1"}
                value={formData.availability?.maximumRentalDays || ""}
                onChange={handleChange}
                className="w-full h-12 rounded-2xl border border-slate-200 bg-slate-50/50 pl-11 pr-4 text-slate-800 text-sm outline-none focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all font-medium placeholder:text-slate-400"
              />
              <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                <Clock className="w-4 h-4" />
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* Navigation Action Buttons */}
      <div className="pt-4 flex items-center justify-between gap-4 border-t border-slate-100">
        <button
          type="button"
          onClick={prev}
          className="w-1/2 sm:w-auto px-6 h-12 rounded-2xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-semibold text-sm active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Previous</span>
        </button>

        <button
          type="button"
          onClick={next}
          disabled={isNextDisabled}
          className="w-1/2 sm:w-auto px-8 h-12 rounded-2xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold text-sm shadow-md shadow-indigo-500/20 active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          <span>Submit</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
};

export default Availability;