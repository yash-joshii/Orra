import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Separator } from "@/components/ui/separator";
import { Lock } from "lucide-react";

const BookingPriceSummary = ({
  product,
  rentalDays,
  totalRent,
  platformFee,
  estimatedTax,
  grandTotal,
}) => {
  return (
    <div className="flex flex-col w-full">
      {/* Header */}
      <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight mb-4 sm:mb-6">
        Price Details
      </h2>

      {/* Breakdown Section */}
      <div className="space-y-3.5 sm:space-y-4">
        
        {/* Rent Calculation */}
        <div className="flex justify-between items-center text-sm sm:text-base font-medium text-slate-500">
          <span>
            Rs {product?.dailyRate || 0} × {rentalDays} {rentalDays === 1 ? 'day' : 'days'}
          </span>
          <span className="font-semibold text-slate-800">
            Rs {totalRent.toFixed(2)}
          </span>
        </div>

        {/* Refundable Deposit with Tooltip */}
        <div className="flex justify-between items-center text-sm sm:text-base font-medium text-slate-500">
          <TooltipProvider delayDuration={200}>
            <Tooltip>
              <TooltipTrigger asChild>
                <span className="cursor-help inline-flex items-center gap-1.5 border-b border-dashed border-slate-300 pb-0.5 hover:text-slate-800 hover:border-slate-400 transition-colors">
                  Refundable Deposit 
                  <Lock className="w-3.5 h-3.5 text-slate-400" />
                </span>
              </TooltipTrigger>
              <TooltipContent 
                side="top" 
                className="bg-slate-900 text-white p-3 rounded-xl text-xs sm:text-sm font-medium shadow-xl border border-slate-800 max-w-[220px] text-center leading-relaxed"
              >
                Fully refunded upon safe return of the gear.
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <span className="font-semibold text-slate-800">
            Rs {product?.securityDeposit || 0}
          </span>
        </div>

        {/* Platform Fee */}
        <div className="flex justify-between items-center text-sm sm:text-base font-medium text-slate-500">
          <span>Platform Fee (10%)</span>
          <span className="font-semibold text-slate-800">
            Rs {platformFee.toFixed(2)}
          </span>
        </div>

        {/* Estimated Tax */}
        <div className="flex justify-between items-center text-sm sm:text-base font-medium text-slate-500">
          <span>Estimated Tax (8%)</span>
          <span className="font-semibold text-slate-800">
            Rs {estimatedTax.toFixed(2)}
          </span>
        </div>
      </div>

      <Separator className="bg-slate-200/80 my-5 sm:my-6" />

      {/* Grand Total */}
      <div className="flex flex-row justify-between items-end gap-4">
        <div className="flex flex-col gap-1 sm:gap-1.5">
          <span className="text-base sm:text-lg lg:text-xl font-bold text-slate-900">
            Total
          </span>
          <span className="text-[11px] sm:text-xs font-medium text-slate-400 leading-tight">
            Includes Rs {product?.securityDeposit || 0} deposit
          </span>
        </div>
        <div className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-indigo-600 tracking-tight shrink-0">
          Rs {grandTotal.toFixed(2)}
        </div>
      </div>
    </div>
  );
};

export default BookingPriceSummary;