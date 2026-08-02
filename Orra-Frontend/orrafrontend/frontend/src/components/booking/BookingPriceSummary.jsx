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
    <>
      <h2 className="text-xl font-bold text-slate-950">Price Details</h2>

      <div className="space-y-3.5 pt-1">
        <div className="days-calculation flex justify-between items-center text-sm font-medium text-slate-500">
          <span>
            ${product?.dailyRate || 0} × {rentalDays} days
          </span>
          <span className="font-semibold text-slate-800">
            ${totalRent.toFixed(2)}
          </span>
        </div>

        <div className="refund flex justify-between items-center text-sm font-medium text-slate-500">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <span className="cursor-help flex items-center gap-1 border-b border-dashed border-slate-300 pb-0.5">
                  Refundable Deposit <Lock className="w-3 h-3 text-slate-400" />
                </span>
              </TooltipTrigger>
              <TooltipContent className="bg-slate-900 text-white p-2 rounded-lg text-xs">
                Fully refunded upon safe return of the gear.
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <span className="font-semibold text-slate-800">
            ${product?.securityDeposit || 0}
          </span>
        </div>

        <div className="days-calculation flex justify-between items-center text-sm font-medium text-slate-500">
          <span>Platform Fee (10%)</span>
          <span className="font-semibold text-slate-800">
            ${platformFee.toFixed(2)}
          </span>
        </div>

        <div className="days-calculation flex justify-between items-center text-sm font-medium text-slate-500">
          <span>Estimated Tax (8%)</span>
          <span className="font-semibold text-slate-800">
            ${estimatedTax.toFixed(2)}
          </span>
        </div>
      </div>

      <Separator className="bg-slate-100 my-1" />

      <div className="total-price-display flex justify-between items-end">
        <div className="total flex flex-col gap-0.5">
          <span className="text-base font-bold text-slate-900">Total</span>
          <span className="text-xs font-medium text-slate-400">
            Includes ${product?.securityDeposit || 0} deposit
          </span>
        </div>
        <div className="price-display text-3xl font-extrabold text-indigo-600 tracking-tight">
          ${grandTotal.toFixed(2)}
        </div>
      </div>
    </>
  );
};

export default BookingPriceSummary;