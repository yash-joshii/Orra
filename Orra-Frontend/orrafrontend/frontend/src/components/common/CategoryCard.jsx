import React from "react";
import { ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const CategoryCard = ({
  name,
  description,
  deviceCount = 0,
  icon: Icon,
  iconBg = "bg-indigo-50",
  iconColor = "text-indigo-600",
  trending,
  onClick,
}) => {
  return (
    <Card
      onClick={onClick}
      className="group cursor-pointer rounded-3xl border border-slate-200/80 bg-white shadow-xs hover:shadow-md hover:border-indigo-500/30 transition-all duration-300 overflow-hidden"
    >
      <CardContent className="p-6 flex flex-col h-full">
        
        {/* Top Row: Icon Tile + Trending Badge */}
        <div className="flex items-start justify-between mb-5">
          <div
            className={`w-14 h-14 rounded-2xl ${iconBg} border border-slate-100 flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-105`}
          >
            {Icon && <Icon className={`w-6 h-6 ${iconColor}`} strokeWidth={2} />}
          </div>

          {trending && (
            <Badge className="bg-emerald-50 text-emerald-700 border border-emerald-200/60 hover:bg-emerald-50 font-semibold rounded-full px-3 text-[11px] shadow-2xs">
              Trending
            </Badge>
          )}
        </div>

        {/* Title + Description */}
        <div className="space-y-1 mb-6 flex-1">
          <h3 className="text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition-colors tracking-tight">
            {name || "Category"}
          </h3>
          {description && (
            <p className="text-xs text-slate-500 font-medium leading-relaxed line-clamp-2">
              {description}
            </p>
          )}
        </div>

        {/* Footer: Device Count + Action Arrow */}
        <div className="pt-4 border-t border-slate-100 flex items-center justify-between mt-auto">
          <span className="text-xs font-bold text-slate-500">
            {deviceCount} {deviceCount === 1 ? "Device" : "Devices"}
          </span>

          <div
            className="w-8 h-8 rounded-full bg-slate-50 border border-slate-200/60 flex items-center justify-center group-hover:bg-indigo-600 group-hover:border-indigo-600 transition-all duration-300 shadow-2xs"
            aria-hidden="true"
          >
            <ArrowRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-white transition-colors" />
          </div>
        </div>

      </CardContent>
    </Card>
  );
};

export default CategoryCard;