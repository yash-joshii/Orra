import { Info } from 'lucide-react';
import React from 'react'

const PricingDetails = ({ prev, next, formData, setFormData }) => {
    const handlePriceChange = (e) => {
        const originalPrice = Number(e.target.value) || 0;

        // 10% Security Deposit
        const securityDeposit = originalPrice * 0.10;
        const rentalPrice = securityDeposit * 0.10;

        setFormData((prev) => ({
            ...prev,
            pricing: {
                ...prev.pricing,
                  originalPrice: e.target.value,
                  securityDeposit: securityDeposit.toFixed(2),
                  rentalPrice: rentalPrice.toFixed(2),
            },
        }));
    };

   /* const handleRentalPriceChange = (e) => {
        const originalPrice = Number(e.target.value) || 0;


        const securityDeposit = (originalPrice * 0.10).toFixed(2);
        const rentalPrice = (securityDeposit * 0.10).toFixed(2);
        setFormData((prev) => ({
            ...prev,
            pricing: {
                ...prev.pricing,
                rentalPrice: e.target.value,
            },
        }));
    };*/

    return (
        <div className="min-h-screen bg-[#F8F9FC] flex justify-center pt-16">
            <div className="w-full max-w-[420px]">

                {/* Heading */}

                <h1 className="text-4xl font-bold text-[#0F172A]">
                    List your device
                </h1>

                <p className="mt-2 text-gray-500 text-sm">
                    Enter the pricing details for your device.
                </p>

                {/* Stepper */}

                <div className="flex gap-2 mt-7 mb-8">
                    <div className="h-1 flex-1 bg-[#5B4CF6] rounded-full"></div>
                    <div className="h-1 flex-1 bg-[#5B4CF6] rounded-full"></div>
                    <div className="h-1 flex-1 bg-[#5B4CF6] rounded-full"></div>
                    <div className="h-1 flex-1 bg-[#5B4CF6] rounded-full"></div>
                    <div className="h-1 flex-1 bg-gray-200 rounded-full"></div>
                </div>

                {/* Card */}

                <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-7">

                    <div className="flex items-center gap-2 mb-6">
                        <Info size={18} className="text-[#5B4CF6]" />

                        <h2 className="text-xl font-semibold">
                            Pricing Details
                        </h2>
                    </div>

                    {/* Original Price */}

                    <div className="mb-5">
                        <label className="block text-sm font-medium mb-2">
                            Original Product Price (₹)
                        </label>

                        <input
                            type="number"
                            placeholder="e.g. 100000"
                            value={formData.pricing?.originalPrice || ""}
                            onChange={handlePriceChange}
                            className="w-full h-12 rounded-xl border border-gray-300 px-4 outline-none focus:ring-2 focus:ring-[#5B4CF6]"
                        />
                    </div>

                    {/* Security Deposit */}

                    <div className="mb-5">
                        <label className="block text-sm font-medium mb-2">
                            Security Deposit (10%)
                        </label>

                        <input
                            type="number"
                            readOnly
                            value={formData.pricing?.securityDeposit || ""}
                            className="w-full h-12 rounded-xl border border-gray-300 bg-gray-100 px-4 text-gray-600"
                        />

                        <p className="text-xs text-gray-500 mt-2">
                            Automatically calculated as 10% of the original product price.
                        </p>
                    </div>

                    {/* Rental Price */}

                    <div className="mb-8">
                        <label className="block text-sm font-medium mb-2">
                            Rental Price / Day (₹)
                        </label>

                        <input
                            type="number"
                            readOnly
                            value={formData.pricing?.rentalPrice || ""}
                            className="w-full h-12 rounded-xl border border-gray-300 px-4 bg-gray-100"
                        />
                    </div>

                    {/* Buttons */}

                    <div className="flex justify-between">
                        <button
                            type="button"
                            onClick={prev}
                            className="w-[140px] h-12 border rounded-xl"
                        >
                            Prev
                        </button>

                        <button
                            type="button"
                            onClick={next}
                            className="w-[140px] h-12 rounded-xl bg-gradient-to-r from-[#6757FF] to-[#5B4CF6] text-white"
                        >
                            Next
                        </button>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default PricingDetails