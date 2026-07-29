import { Info } from 'lucide-react';
import React from 'react'

const ProductDetails = ({prev, next, formData, setFormData}) => {
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
    <div className="min-h-screen bg-[#F8F9FC] flex justify-center pt-16">
      <div className="w-full max-w-[420px]">

        {/* Heading */}

        <h1 className="text-4xl font-bold text-[#0F172A]">
          List your device
        </h1>

        <p className="mt-2 text-gray-500 text-sm">
          Provide additional information about your device.
        </p>

        {/* Stepper */}

        <div className="flex gap-2 mt-7 mb-8">
          <div className="h-1 flex-1 rounded-full bg-[#5B4CF6]" />
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
              Product Details
            </h2>
          </div>

          {/* Serial Number */}

          <div className="mb-5">
            <label className="block text-sm mb-2 font-medium">
              Serial Number
            </label>

            <input
              
  type="text"
  name="serialorimei"
  value={formData.productDetails?.serialorimei || ""}
  onChange={handleChange}
  placeholder="Enter serial number"
  className="w-full h-12 rounded-xl border border-gray-300 px-4 outline-none focus:ring-2 focus:ring-[#5B4CF6]"
/>
            
          </div>

          {/* Purchase Year */}

          <div className="mb-5">
            <label className="block text-sm mb-2 font-medium">
              Purchase Year
            </label>

            <input
              type="number"
              name="purchaseYear"
              value={formData.productDetails?.purchaseYear || ""}
              onChange={handleChange}
              placeholder="e.g. 2024"
              className="w-full h-12 rounded-xl border border-gray-300 px-4 outline-none focus:ring-2 focus:ring-[#5B4CF6]"
            />
          </div>

          {/* Location */}

          <div className="mb-5">
            <label className="block text-sm mb-2 font-medium">
              Location
            </label>

            <input
              type="text"
              name="location"
              value={formData.productDetails?.location || ""}
              onChange={handleChange}
              placeholder="e.g. Pune, Maharashtra"
              className="w-full h-12 rounded-xl border border-gray-300 px-4 outline-none focus:ring-2 focus:ring-[#5B4CF6]"
            />
          </div>

          {/* Product Condition */}

          {/* <div className="mb-7">
            <label className="block text-sm mb-2 font-medium">
              Product Condition
            </label>

            <select
              name="condition"
              value={formData.productDetails?.condition || ""}
              onChange={handleChange}
              className="w-full h-12 rounded-xl border border-gray-300 px-4 outline-none focus:ring-2 focus:ring-[#5B4CF6]"
            >
              <option value="">Select Condition</option>
              <option>New</option>
              <option>Like New</option>
              <option>Excellent</option>
              <option>Good</option>
              <option>Fair</option>
            </select>
          </div> */}

          {/* Buttons */}
          <div className="flex justify-between">
            <button
              onClick={prev}
              className="w-[150px] h-12 rounded-xl border border-gray-300 font-medium hover:bg-gray-100 transition"
            >
              Prev
            </button>

            <button
              onClick={next}
              className="w-[150px] h-12 rounded-xl bg-gradient-to-r from-[#6757FF] to-[#5B4CF6] text-white font-medium hover:opacity-95 transition"
            >
              Next
            </button>
          </div>

        </div>
      </div>
    </div>
  )
}

export default ProductDetails