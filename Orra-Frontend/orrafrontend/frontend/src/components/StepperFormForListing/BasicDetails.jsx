import React from "react";
import { Info, ArrowRight, Layers } from "lucide-react";

const BasicDetails = ({ next, formData, setFormData }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      basicDetails: {
        ...prev.basicDetails,
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
          <h2 className="text-xl font-bold text-slate-900">Basic Details</h2>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            Tell renters what gear you are offering for rent.
          </p>
        </div>
      </div>

      <div className="space-y-5">
        
        {/* Category Select */}
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
            What kind of device is it? <span className="text-rose-500">*</span>
          </label>
          <div className="relative">
            <select
              name="category"
              value={formData.basicDetails?.category || ""}
              onChange={handleChange}
              className="w-full h-12 rounded-2xl border border-slate-200 bg-slate-50/50 px-4 pr-10 text-slate-800 text-sm outline-none focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all cursor-pointer font-medium appearance-none"
            >
              <option value="" disabled>Select Category...</option>
              <option value="LAPTOP">Laptop</option>
              <option value="TV">TV / Display</option>
              <option value="MOBILE">Mobile Phone</option>
              <option value="CAMERA">Camera / Gear</option>
              <option value="REFRIGERATOR">Refrigerator</option>
            </select>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
              <Layers className="w-4 h-4" />
            </div>
          </div>
        </div>

        {/* Brand & Model Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          
          {/* Brand */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Brand <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              name="brand"
              value={formData.basicDetails?.brand || ""}
              onChange={handleChange}
              placeholder="e.g. Sony, Apple, Canon"
              className="w-full h-12 rounded-2xl border border-slate-200 bg-slate-50/50 px-4 text-slate-800 text-sm outline-none focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all font-medium placeholder:text-slate-400 placeholder:font-normal"
            />
          </div>

          {/* Model */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Model Name
            </label>
            <input
              type="text"
              name="model"
              value={formData.basicDetails?.model || ""}
              onChange={handleChange}
              placeholder="e.g. A7 IV, MacBook Pro"
              className="w-full h-12 rounded-2xl border border-slate-200 bg-slate-50/50 px-4 text-slate-800 text-sm outline-none focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all font-medium placeholder:text-slate-400 placeholder:font-normal"
            />
          </div>
        </div>

        {/* Device Name Title */}
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
            Listing Title <span className="text-rose-500">*</span>
          </label>
          <input
            type="text"
            name="productName"
            value={formData.basicDetails?.productName || ""}
            onChange={handleChange}
            placeholder="e.g. Sony A7 IV + 24-70mm GM Lens Kit"
            className="w-full h-12 rounded-2xl border border-slate-200 bg-slate-50/50 px-4 text-slate-800 text-sm outline-none focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all font-medium placeholder:text-slate-400 placeholder:font-normal"
          />
          <p className="text-[11px] text-slate-400 mt-1.5 font-medium">
            Include brand, model, and any key specs in the title to attract renters.
          </p>
        </div>

        {/* Description */}
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
            Description
          </label>
          <textarea
            rows={4}
            name="description"
            value={formData.basicDetails?.description || ""}
            onChange={handleChange}
            placeholder="Describe condition, key features, and any rental guidelines..."
            className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 p-4 text-slate-800 text-sm outline-none focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all resize-none font-medium placeholder:text-slate-400 placeholder:font-normal"
          />
        </div>
      </div>

      {/* Action Footer Button */}
      <div className="pt-4 flex justify-end border-t border-slate-100">
        <button
          type="button"
          onClick={next}
          className="w-full sm:w-auto px-8 h-12 rounded-2xl bg-indigo-600 hover:bg-indigo-700 active:scale-[0.98] text-white font-semibold text-sm shadow-md shadow-indigo-500/20 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
        >
          <span>Continue</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
};

export default BasicDetails;