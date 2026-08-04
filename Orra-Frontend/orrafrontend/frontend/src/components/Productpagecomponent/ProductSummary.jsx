import React, { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { Info } from "lucide-react";

const SERVICE_FEE = 15;

function daysBetween(pickupDate, returnDate) {
  const start = new Date(pickupDate);
  const end = new Date(returnDate);
  const diff = Math.round((end - start) / (1000 * 60 * 60 * 24));
  return diff > 0 ? diff : 0;
}

const ProductSummary = ({ data }) => {
  const [pickupDate, setPickupDate] = useState("2026-10-15");
  const [returnDate, setReturnDate] = useState("2026-10-18");

  const pricePerDay = data?.pricePerDay || 0;
  const securityDeposit = data?.securityDeposit || 0;

  // Safely extract user ID from Redux auth slice
  const { user } = useSelector((state) => state.auth);
  const currentUserId = user?.id || user?.userId;
  const isOwner = currentUserId && currentUserId === data?.owner?.userId;

  const days = useMemo(
    () => daysBetween(pickupDate, returnDate),
    [pickupDate, returnDate]
  );

  const subtotal = pricePerDay * days;
  const total = subtotal + securityDeposit + SERVICE_FEE;

  if (!data) {
    return (
      <Card className="w-full max-w-sm rounded-3xl border border-slate-200/80 bg-white shadow-xs">
        <CardContent className="p-6">
          <p className="text-xs text-slate-500 font-medium">Loading pricing data...</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-sm rounded-3xl border border-slate-200/80 bg-white shadow-xs sticky top-20">
      <CardContent className="p-6 space-y-6">
        
        {/* Price Per Day Header */}
        <div className="flex items-baseline gap-1.5">
          <span className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Rs {pricePerDay}
          </span>
          <span className="text-xs font-semibold text-slate-500">/ day</span>
        </div>

        {/* Pick-up / Return Date Selector */}
        <div className="grid grid-cols-2 rounded-2xl border border-slate-200 bg-slate-50/50 overflow-hidden">
          <div className="p-3.5">
            <p className="text-[10px] font-bold tracking-wider text-slate-500 uppercase">
              Pick-up
            </p>
            <input
              type="date"
              value={pickupDate}
              onChange={(e) => setPickupDate(e.target.value)}
              className="text-xs font-semibold text-slate-800 mt-1 bg-transparent outline-none w-full cursor-pointer"
            />
          </div>
          <div className="p-3.5 border-l border-slate-200">
            <p className="text-[10px] font-bold tracking-wider text-slate-500 uppercase">
              Return
            </p>
            <input
              type="date"
              value={returnDate}
              onChange={(e) => setReturnDate(e.target.value)}
              className="text-xs font-semibold text-slate-800 mt-1 bg-transparent outline-none w-full cursor-pointer"
            />
          </div>
        </div>

        {/* CTA Button (Hidden if user is the owner) */}
        {!isOwner && (
          <Button
            className="w-full h-11 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-700 text-white shadow-xs cursor-pointer transition-all"
          >
            Request to Book
          </Button>
        )}

        <p className="text-center text-[11px] font-medium text-slate-400">
          You won't be charged yet
        </p>

        {/* Price Breakdown */}
        <div className="space-y-3 text-xs font-medium text-slate-600 pt-2 border-t border-slate-100">
          <div className="flex justify-between items-center">
            <span className="underline underline-offset-2">
              Rs {pricePerDay} × {days} {days === 1 ? "day" : "days"}
            </span>
            <span className="font-semibold text-slate-900">Rs {subtotal}</span>
          </div>

          <div className="flex justify-between items-center">
            <span className="underline underline-offset-2 inline-flex items-center gap-1">
              Security Deposit
              <Info className="w-3.5 h-3.5 text-slate-400" />
            </span>
            <span className="font-semibold text-slate-900">Rs {securityDeposit}</span>
          </div>

          <div className="flex justify-between items-center">
            <span className="underline underline-offset-2">Service Fee</span>
            <span className="font-semibold text-slate-900">Rs {SERVICE_FEE}</span>
          </div>
        </div>

        {/* Total Amount */}
        <div className="border-t border-slate-200/80 pt-4 flex justify-between items-center">
          <span className="font-bold text-sm text-slate-900">Total Amount</span>
          <span className="font-extrabold text-base text-slate-900">Rs {total}</span>
        </div>

      </CardContent>
    </Card>
  );
};

export default ProductSummary;