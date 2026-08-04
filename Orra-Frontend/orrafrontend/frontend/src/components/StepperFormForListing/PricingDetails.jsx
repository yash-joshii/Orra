import React from "react";
import { Info, ArrowLeft, ArrowRight } from "lucide-react";

const PricingDetails = ({ prev, next, formData, setFormData }) => {
  const handlePriceChange = (e) => {
    const rawValue = e.target.value;
    const originalPrice = Number(rawValue) || 0;

    // Calculations
    const securityDeposit = originalPrice * 0.10;
    const rentalPrice = securityDeposit * 0.10;

    setFormData((prev) => ({
      ...prev,
      pricing: {
        ...prev.pricing,
        purchasePrice: rawValue,
        securityDeposit: originalPrice > 0 ? securityDeposit.toFixed(2) : "",
        rentalPrice: originalPrice > 0 ? rentalPrice.toFixed(2) : "",
      },
    }));
  };

  const isNextDisabled =
    !formData.pricing?.purchasePrice ||
    Number(formData.pricing?.purchasePrice) <= 0;

  return (
    <div className="bg-white rounded-3xl shadow-xs border border-slate-200/80 p-6 sm:p-8 space-y-6">

      {/* Card Header */}
      <div className="flex items-center gap-3 pb-5 border-b border-slate-100">
        <div className="p-2.5 bg-indigo-50 text-indigo-600 rounded-2xl">
          <Info className="w-5 h-5" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-slate-900">Pricing Structure</h2>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            Automatic deposit and daily rental calculations based on item value.
          </p>
        </div>
      </div>

      <div className="space-y-5">

        {/* Original Price */}
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
            Original Product Price <span className="text-rose-500">*</span>
          </label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-sm">
              ₹
            </span>
            <input
              type="number"
              placeholder="e.g. 100000"
              value={formData.pricing?.purchasePrice || ""}
              onChange={handlePriceChange}
              className="w-full h-12 rounded-2xl border border-slate-200 bg-slate-50/50 pl-8 pr-4 text-slate-800 text-sm outline-none focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all font-medium placeholder:text-slate-400"
            />
          </div>
        </div>

        {/* Security Deposit (Read-Only) */}
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
            Security Deposit (10%)
          </label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-sm">
              ₹
            </span>
            <input
              type="number"
              readOnly
              placeholder="0.00"
              value={formData.pricing?.securityDeposit || ""}
              className="w-full h-12 rounded-2xl border border-slate-200 bg-slate-100/80 pl-8 pr-4 text-slate-600 text-sm font-semibold cursor-not-allowed outline-none"
            />
          </div>
          <p className="text-[11px] text-slate-400 mt-1.5 font-medium">
            Automatically calculated as 10% of the original product price.
          </p>
        </div>

        {/* Rental Price / Day (Read-Only) */}
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
            Rental Price / Day
          </label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-sm">
              ₹
            </span>
            <input
              type="number"
              readOnly
              placeholder="0.00"
              value={formData.pricing?.rentalPrice || ""}
              className="w-full h-12 rounded-2xl border border-slate-200 bg-slate-100/80 pl-8 pr-4 text-slate-600 text-sm font-semibold cursor-not-allowed outline-none"
            />
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
          <span>Continue</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
};

export default PricingDetails;