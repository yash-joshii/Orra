import React from "react";
import { Card, CardContent } from "../ui/card";
import { ShieldCheck, CheckCircle2 } from "lucide-react";

const ProductOwner = ({ data }) => {
  // Extract initials if avatar image is missing
  const getInitials = (name) => {
    if (!name) return "PO";
    const parts = name.trim().split(" ");
    return parts.length >= 2
      ? `${parts[0][0]}${parts[1][0]}`.toUpperCase()
      : parts[0].slice(0, 2).toUpperCase();
  };

  return (
    <div className="space-y-4">
      {/* Owner Profile Card */}
      <Card className="rounded-3xl border border-slate-200/80 bg-white shadow-xs overflow-hidden">
        <CardContent className="p-6 flex flex-col items-center text-center">
          
          {/* Avatar / Placeholder */}
          {data?.avatarUrl ? (
            <img
              src={data.avatarUrl}
              alt={data?.name || "Owner"}
              className="w-20 h-20 rounded-2xl object-cover ring-4 ring-slate-50 border border-slate-200/60 shadow-xs"
            />
          ) : (
            <div className="w-20 h-20 rounded-2xl bg-indigo-50 border border-indigo-200/60 flex items-center justify-center text-indigo-700 font-bold text-xl shadow-xs">
              {getInitials(data?.name)}
            </div>
          )}

          {/* Owner Details */}
          <div className="mt-3 space-y-1">
            <h3 className="text-base font-bold text-slate-900 leading-snug">
              {data?.name || "Equipment Owner"}
            </h3>

            <p className="text-xs text-slate-500 font-medium">
              Member since {data?.joinedDate || "2024"}
            </p>
          </div>

          {/* Verified Badge */}
          {data?.verified !== false && (
            <div className="flex items-center gap-1.5 mt-3 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200/60 text-emerald-700 text-xs font-bold">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>Verified Owner</span>
            </div>
          )}

        </CardContent>
      </Card>

      {/* Security Guarantee Banner */}
      <div className="bg-gradient-to-br from-indigo-50/80 to-slate-50 rounded-2xl p-4 border border-indigo-100/80 flex gap-3.5 shadow-2xs">
        <div className="w-8 h-8 rounded-xl bg-indigo-100/80 text-indigo-600 border border-indigo-200/60 flex items-center justify-center shrink-0">
          <ShieldCheck className="w-4 h-4" />
        </div>
        <div className="space-y-0.5">
          <h4 className="font-bold text-slate-900 text-xs tracking-tight">
            ORRA Guarantee Protection
          </h4>
          <p className="text-[11px] text-slate-600 leading-relaxed font-medium">
            Every rental is covered up to $5,000 against loss, theft, and damage.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductOwner;