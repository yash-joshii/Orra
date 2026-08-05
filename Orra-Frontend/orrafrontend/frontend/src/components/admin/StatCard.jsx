import React from "react";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const StatCard = ({ label, value, change, icon: Icon, trend }) => {
  // Infer trend direction if not explicitly provided
  const isPositive = trend === "up" || (typeof change === "string" && change.startsWith("+"));
  const isNegative = trend === "down" || (typeof change === "string" && change.startsWith("-"));

  return (
    <Card className="bg-white rounded-3xl border border-slate-200/80 shadow-xs hover:shadow-md transition-all duration-300 overflow-hidden group">
      <CardContent className="p-5 sm:p-6 space-y-3">
        
        {/* Top Label & Icon Header */}
        <div className="flex items-center justify-between gap-3">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider truncate">
            {label}
          </span>
          {Icon && (
            <div className="p-2.5 bg-indigo-50 text-indigo-600 rounded-2xl shrink-0 group-hover:scale-110 transition-transform duration-300">
              <Icon className="w-5 h-5" />
            </div>
          )}
        </div>

        {/* Value and Percentage Change Badge */}
        <div className="flex items-baseline justify-between gap-2 pt-1">
          <div className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            {value}
          </div>

          {change && (
            <div
              className={`inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-xl border backdrop-blur-xs shrink-0 ${
                isPositive
                  ? "bg-emerald-50 text-emerald-700 border-emerald-200/60"
                  : isNegative
                  ? "bg-rose-50 text-rose-700 border-rose-200/60"
                  : "bg-slate-50 text-slate-600 border-slate-200"
              }`}
            >
              {isPositive && <TrendingUp className="w-3.5 h-3.5" />}
              {isNegative && <TrendingDown className="w-3.5 h-3.5" />}
              {!isPositive && !isNegative && <Minus className="w-3.5 h-3.5" />}
              <span>{change}</span>
            </div>
          )}
        </div>

      </CardContent>
    </Card>
  );
};

export default StatCard;