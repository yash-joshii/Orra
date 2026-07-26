import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
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

  const days = useMemo(
    () => daysBetween(pickupDate, returnDate),
    [pickupDate, returnDate],
  );
  const subtotal = pricePerDay * days;
  const total = subtotal + securityDeposit + SERVICE_FEE;

  if (!data) {
    return (
      <Card className="w-full max-w-sm rounded-3xl shadow-md border-none">
        <CardContent className="p-6">
          <p className="text-sm text-gray-500">Loading price…</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-sm rounded-3xl shadow-md border-none sticky">
      <CardContent className="p-6 space-y-6">
        {/* Price */}
        <div className="flex items-baseline gap-1">
          <span className="text-3xl font-bold text-gray-900">
            Rs {pricePerDay}
          </span>
          <span className="text-gray-500">/ day</span>
        </div>

        {/* Pick-up / Return */}
        <div className="grid grid-cols-2 rounded-xl border border-gray-200 overflow-hidden">
          <div className="p-4">
            <p className="text-xs font-semibold tracking-wide text-gray-900">
              PICK-UP
            </p>
            <input
              type="date"
              value={pickupDate}
              onChange={(e) => setPickupDate(e.target.value)}
              className="text-sm text-gray-500 mt-1 bg-transparent outline-none w-full"
            />
          </div>
          <div className="p-4 border-l border-gray-200">
            <p className="text-xs font-semibold tracking-wide text-gray-900">
              RETURN
            </p>
            <input
              type="date"
              value={returnDate}
              onChange={(e) => setReturnDate(e.target.value)}
              className="text-sm text-gray-500 mt-1 bg-transparent outline-none w-full"
            />
          </div>
        </div>

        {/* CTA */}
        <Button
          className="w-full h-12 rounded-xl text-base font-semibold
                     bg-gradient-to-r from-indigo-500 to-indigo-700
                     hover:from-indigo-600 hover:to-indigo-800 text-white"
        >
          Request to Book
        </Button>

        <p className="text-center text-sm text-gray-500">
          You won't be charged yet
        </p>

        {/* Price breakdown */}
        <div className="space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="underline underline-offset-2 text-gray-700">
              Rs{pricePerDay} × {days} days
            </span>
            <span className="text-gray-900">${subtotal}</span>
          </div>
          <div className="flex justify-between">
            <span className="underline underline-offset-2 text-gray-700 inline-flex items-center gap-1">
              Security Deposit
              <Info className="w-3.5 h-3.5 text-gray-400" />
            </span>
            <span className="text-gray-900">${securityDeposit}</span>
          </div>
          <div className="flex justify-between">
            <span className="underline underline-offset-2 text-gray-700">
              Service Fee
            </span>
            <span className="text-gray-900">${SERVICE_FEE}</span>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-4 flex justify-between">
          <span className="font-bold text-gray-900">Total</span>
          <span className="font-bold text-gray-900">${total}</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductSummary;
