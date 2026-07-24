import { Info } from 'lucide-react'
import React from 'react'

const BasicDetails = ({next, formData, setFormData}) => {
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
     <div className="min-h-screen bg-[#F8F9FC] flex justify-center pt-16">
      <div className="w-full max-w-[420px]">

        {/* Heading */}

        <h1 className="text-4xl font-bold text-[#0F172A]">
          List your device
        </h1>

        <p className="mt-2 text-gray-500 text-sm">
          Earn money by renting out your idle electronics to verified creators.
        </p>

        {/* Stepper */}

        <div className="flex gap-2 mt-7 mb-8">
          <div className="h-1 flex-1 rounded-full bg-[#5B4CF6]" />
          <div className="h-1 flex-1 rounded-full bg-gray-200" />
          <div className="h-1 flex-1 rounded-full bg-gray-200" />
          <div className="h-1 flex-1 rounded-full bg-gray-200" />
          <div className="h-1 flex-1 rounded-full bg-gray-200" />
        </div>

        {/* Card */}

        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-7">

          {/* Header */}

          <div className="flex items-center gap-2 mb-6">
            <Info size={18} className="text-[#5B4CF6]" />

            <h2 className="text-xl font-semibold">
              Basic Details
            </h2>
          </div>

          {/* Category */}

          <div className="mb-5">
            <label className="block text-sm mb-2 font-medium">
              What kind of device is it?
            </label>

            <select
              name="category"
              value={formData.basicDetails?.category || ""}
              onChange={handleChange}
              className="w-full h-12 rounded-xl border border-gray-300 px-4 outline-none focus:ring-2 focus:ring-[#5B4CF6]"
            >
              <option value="">Select Category...</option>
              <option>LAPTOP</option>
              <option>TV</option>
              <option>MOBILE</option>
              <option>CAMERA</option>
              <option>REFRIGERATOR</option>
            </select>
          </div>

          {/* Brand */}

          <div className="mb-5">
            <label className="block text-sm mb-2 font-medium">
              Brand
            </label>

            <input
              type="text"
              name="brand"
              value={formData.basicDetails?.brand || ""}
              onChange={handleChange}
              placeholder="Sony"
              className="w-full h-12 rounded-xl border border-gray-300 px-4 outline-none focus:ring-2 focus:ring-[#5B4CF6]"
            />
          </div>

          {/* Model */}

          <div className="mb-5">
            <label className="block text-sm mb-2 font-medium">
              Model Name
            </label>

            <input
              type="text"
              name="modelName"
              value={formData.basicDetails?.modelName || ""}
              onChange={handleChange}
              placeholder="Sony A7 IV"
              className="w-full h-12 rounded-xl border border-gray-300 px-4 outline-none focus:ring-2 focus:ring-[#5B4CF6]"
            />
          </div>
        
          {/* Device Name */}

          <div className="mb-2">
            <label className="block text-sm mb-2 font-medium">
              Device Name (Title)
            </label>

            <input
              type="text"
              name="deviceTitle"
              value={formData.basicDetails?.deviceTitle || ""}
              onChange={handleChange}
              placeholder="Sony A7 IV + 24-70mm GM Lens"
              className="w-full h-12 rounded-xl border border-gray-300 px-4 outline-none focus:ring-2 focus:ring-[#5B4CF6]"
            />
          </div>

          <p className="text-xs text-gray-400 mb-5">
            Include the brand, model, and any key accessories.
          </p>

        

          {/* Description */}

          <div className="mb-7">
            <label className="block text-sm mb-2 font-medium">
              Description
            </label>

            <textarea
              rows={5}
              name="description"
              value={formData.basicDetails?.description || ""}
              onChange={handleChange}
              placeholder="Describe the condition, what's included, and any rules for renting."
              className="w-full rounded-xl border border-gray-300 p-4 resize-none outline-none focus:ring-2 focus:ring-[#5B4CF6]"
            />
          </div>

          {/* Button */}

          <button
            onClick={next}
            className="w-[170px] h-12 rounded-xl bg-gradient-to-r from-[#6757FF] to-[#5B4CF6] text-white font-medium hover:opacity-95 transition"
          >
            Next
          </button>

        </div>

      </div>
    </div>
  )
}

export default BasicDetails