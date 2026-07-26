import React from "react";
import { ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const CategoryCard = ({
  name,
  description,
  deviceCount,
  icon: Icon,
  iconBg,
  iconColor,
  trending,
}) => {
  return (
    <Card className="group cursor-pointer border-slate-200 shadow-sm hover:shadow-md transition-shadow">
      <CardContent className="p-6 flex flex-col h-full">
        {/* Top row: icon tile + trending badge */}
        <div className="flex items-start justify-between mb-5">
          <div className={`w-14 h-14 rounded-2xl ${iconBg} flex items-center justify-center`}>
            <Icon className={`w-6 h-6 ${iconColor}`} strokeWidth={2} />
          </div>
          {trending && (
            <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100 font-medium rounded-full px-3">
              Trending
            </Badge>
          )}
        </div>

        {/* Title + description */}
        <h3 className="text-xl font-bold text-slate-900 mb-1">{name}</h3>
        {description && (
          <p className="text-slate-500 text-sm leading-snug mb-6">{description}</p>
        )}

        {/* Footer: device count + arrow, pinned to bottom via mt-auto */}
        <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between">
          <span className="text-sm text-slate-500">{deviceCount} Devices</span>
          <button
            type="button"
            aria-label={`View ${name}`}
            className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center
                       group-hover:bg-slate-900 transition-colors"
          >
            <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-white transition-colors" />
          </button>
        </div>
      </CardContent>
    </Card>
  );
};

export default CategoryCard;