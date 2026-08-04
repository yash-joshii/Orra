import React from "react";
import { Card, CardHeader } from "@/components/ui/card";
import { Tag } from "lucide-react";

const ActiveListingCard = ({ listing }) => {
  return (
    <Card className="w-full flex flex-col sm:flex-row items-center gap-6 p-5 rounded-3xl border border-slate-100 bg-white shadow-sm hover:shadow-md hover:border-slate-200 transition-all duration-300 group">
      
      {/* Product Image Container */}
      <div className="relative w-full sm:w-52 h-44 sm:h-36 rounded-2xl overflow-hidden shrink-0 bg-slate-100">
        <img
          src={listing?.imageUrl || "/placeholder.png"}
          alt={listing?.title || "Product listing"}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        
        {/* Mobile Status Badge Overlay */}
        <div className="absolute top-3 left-3 sm:hidden">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-white/90 backdrop-blur-md text-emerald-700 shadow-xs border border-emerald-200/50">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Active
          </span>
        </div>
      </div>

      {/* Product Details */}
      <CardHeader className="flex-1 w-full p-0 space-y-3">
        
        {/* Title & Status */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-slate-900 group-hover:text-indigo-600 transition-colors line-clamp-1">
              {listing?.title}
            </h2>
            
            {/* Category Tag */}
            <div className="flex items-center gap-2 mt-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-600 border border-slate-200/60">
                <Tag className="w-3 h-3 text-slate-400" />
                {listing?.category || "General"}
              </span>
            </div>
          </div>

          {/* Desktop Status Badge */}
          <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200/60 shrink-0">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            Active
          </span>
        </div>

        {/* Pricing Footer */}
        <div className="pt-3 flex items-baseline justify-between border-t border-slate-100 mt-2">
          <div className="flex items-baseline gap-1">
            <span className="text-xs text-slate-400 font-medium">Rate:</span>
            <span className="text-xl font-black text-slate-900 ml-1">
              ₹{listing?.pricePerDay}
            </span>
            <span className="text-xs text-slate-500 font-medium">/ day</span>
          </div>
        </div>

      </CardHeader>
    </Card>
  );
};

export default ActiveListingCard;