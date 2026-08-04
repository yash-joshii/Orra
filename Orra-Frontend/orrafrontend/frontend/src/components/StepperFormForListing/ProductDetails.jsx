import React from "react";
import { Info, ArrowLeft, ArrowRight, MapPin, Hash, Calendar } from "lucide-react";

const ProductDetails = ({ prev, next, formData, setFormData }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevState) => ({
      ...prevState,
      productDetails: {
        ...prevState.productDetails,
        [name]: value,
      },
    }));
  };

  return (
    <div className="bg-white rounded-3xl shadow-xs border border-slate-200/80 p-6 sm:p-8 space-y-6">

      {/* Card Header */}
      <div className="flex items-center gap-3 pb-5 border-b border-slate-100">
        <div className="p-2.5 bg-indigo-50 text-indigo-600 rounded-2xl">
          <Info className="w-5 h-5" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-slate-900">Product Details</h2>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            Verification and location information for your device.
          </p>
        </div>
      </div>

      <div className="space-y-5">

        {/* Serial Number / IMEI */}
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
            Serial Number or IMEI
          </label>
          <div className="relative">
            <input
              type="text"
              name="serialorimei"
              value={formData.productDetails?.serialorimei || ""}
              onChange={handleChange}
              placeholder="e.g. SN-984210398X"
              className="w-full h-12 rounded-2xl border border-slate-200 bg-slate-50/50 pl-11 pr-4 text-slate-800 text-sm outline-none focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all font-medium placeholder:text-slate-400 placeholder:font-normal"
            />
            <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
              <Hash className="w-4 h-4" />
            </div>
          </div>
          <p className="text-[11px] text-slate-400 mt-1.5 font-medium">
            Used internally for device verification and insurance protection.
          </p>
        </div>

        {/* Purchase Year */}
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
            Purchase Year
          </label>
          <div className="relative">
            <input
              type="number"
              name="purchaseYear"
              value={formData.productDetails?.purchaseYear || ""}
              onChange={handleChange}
              placeholder="e.g. 2024"
              className="w-full h-12 rounded-2xl border border-slate-200 bg-slate-50/50 pl-11 pr-4 text-slate-800 text-sm outline-none focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all font-medium placeholder:text-slate-400 placeholder:font-normal"
            />
            <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
              <Calendar className="w-4 h-4" />
            </div>
          </div>
        </div>

        {/* Pickup Location */}
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
            Pickup Location <span className="text-rose-500">*</span>
          </label>
          <div className="relative">
            <input
              type="text"
              name="location"
              value={formData.productDetails?.location || ""}
              onChange={handleChange}
              placeholder="e.g. Pune, Maharashtra"
              className="w-full h-12 rounded-2xl border border-slate-200 bg-slate-50/50 pl-11 pr-4 text-slate-800 text-sm outline-none focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all font-medium placeholder:text-slate-400 placeholder:font-normal"
            />
            <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
              <MapPin className="w-4 h-4" />
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
          className="w-1/2 sm:w-auto px-8 h-12 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm shadow-md shadow-indigo-500/20 active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          <span>Continue</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
};

export default ProductDetails;