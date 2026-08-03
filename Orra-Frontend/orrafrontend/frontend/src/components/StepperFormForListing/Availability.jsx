import { CalendarDays, Info } from 'lucide-react'
import React, { useState } from 'react'
import { CalendarDay } from 'react-day-picker'
import { Calendar } from '../ui/calendar'



const Availability = ({ prev, next, formData, setFormData }) => {
    const today = new Date().toISOString().split("T")[0];

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
    return (
        <div className="min-h-screen bg-[#F8F9FC] flex justify-center pt-16">

            <div className="w-full max-w-[420px]">

                {/* Heading */}

                <h1 className="text-4xl font-bold text-[#0F172A]">
                    List your device
                </h1>

                <p className="mt-2 text-gray-500 text-sm">
                    Tell us when your device is available for rent.
                </p>

                {/* Stepper */}

                <div className="flex gap-2 mt-7 mb-8">
                    <div className="h-1 flex-1 bg-[#5B4CF6] rounded-full"></div>
                    <div className="h-1 flex-1 bg-[#5B4CF6] rounded-full"></div>
                    <div className="h-1 flex-1 bg-[#5B4CF6] rounded-full"></div>
                    <div className="h-1 flex-1 bg-[#5B4CF6] rounded-full"></div>
                    <div className="h-1 flex-1 bg-[#5B4CF6] rounded-full"></div>
                </div>

                {/* Card */}

                <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-7">

                    <div className="flex items-center gap-2 mb-6">
                        <Info size={18} className="text-[#5B4CF6]" />
                        <h2 className="text-xl font-semibold">
                            Availability
                        </h2>
                    </div>

                    {/* Available From */}

                    <div className="mb-5">
                        <label className="block text-sm font-medium mb-2">
                            Available From
                        </label>

                        <input
                            type="date"
                            name="availableFrom"
                            min={today}
                            value={formData.availability?.availableFrom}
                            onChange={handleChange}
                            className="w-full h-12 rounded-xl border border-gray-300 px-4 outline-none focus:ring-2 focus:ring-[#5B4CF6]"
                        />
                    </div>

                    {/* Available To */}

                    <div className="mb-5">
                        <label className="block text-sm font-medium mb-2">
                            Available Until
                        </label>

                        <input
                            type="date"
                            name="availableTo"
                            min={formData.availability?.availableFrom || today}
                            value={formData.availability?.availableTo || ""}
                            onChange={handleChange}
                            className="w-full h-12 rounded-xl border border-gray-300 px-4 outline-none focus:ring-2 focus:ring-[#5B4CF6]"
                        />
                    </div>

                    {/* Minimum Rental Days */}

                    <div className="mb-5">
                        <label className="block text-sm font-medium mb-2">
                            Minimum Rental Days
                        </label>

                        <input
                            type="number"
                            name="minimumRentalDays"
                            placeholder="1"
                            value={formData.availability?.minimumRentalDays || ""}
                            onChange={handleChange}
                            className="w-full h-12 rounded-xl border border-gray-300 px-4 outline-none focus:ring-2 focus:ring-[#5B4CF6]"
                        />
                    </div>

                    {/* Maximum Rental Days */}

                    <div className="mb-7">
                        <label className="block text-sm font-medium mb-2">
                            Maximum Rental Days
                        </label>

                        <input
                            type="number"
                            name="maximumRentalDays"
                            placeholder="30"
                            value={formData.availability?.maximumRentalDays || ""}
                            onChange={handleChange}
                            className="w-full h-12 rounded-xl border border-gray-300 px-4 outline-none focus:ring-2 focus:ring-[#5B4CF6]"
                        />
                    </div>

                    {/* Buttons */}

                    <div className="flex justify-between">

                        <button
                            onClick={prev}
                            className="w-[150px] h-12 rounded-xl border border-gray-300 font-medium"
                        >
                            Prev
                        </button>

                        <button
                            onClick={next}
                            className="w-[150px] h-12 rounded-xl bg-gradient-to-r from-[#6757FF] to-[#5B4CF6] text-white font-medium"
                        >
                            Submit
                        </button>

                    </div>

                </div>

            </div>

        </div>
    )
}

export default Availability