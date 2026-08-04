import React from "react";
import { User, Tag } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import LazyImage from "../common/LazyImage";

// Status badge styling map matching original status tags
const statusColor = {
  ACTIVE: "bg-emerald-100 text-emerald-800 border-emerald-200",
  PENDING: "bg-amber-100 text-amber-800 border-amber-200",
  DISABLED: "bg-slate-200 text-slate-700 border-slate-300",
  REJECTED: "bg-rose-100 text-rose-800 border-rose-200",
};

const ProductCard = ({ product, actions }) => {
  const imageUrl =
    product?.imageUrl || "https://placehold.co/400x200?text=No+Image";

  const approvalStatus = product?.approvalStatus || "PENDING";
  const badgeStyle = statusColor[approvalStatus] || statusColor.PENDING;

  return (
    <Card className="bg-white rounded-3xl border border-slate-200/80 shadow-xs hover:shadow-md transition-all duration-300 overflow-hidden flex flex-col justify-between h-full group">
      
      {/* Image Container with full object-cover fit */}
      <div className="relative w-full h-44 bg-slate-900 overflow-hidden shrink-0">
        <LazyImage
          src={imageUrl}
          alt={product?.productName || "Product"}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 ease-out"
        />

        {/* Original Approval Status Tag */}
        <Badge
          className={`absolute top-3 left-3 text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-md border shadow-2xs ${badgeStyle}`}
        >
          {approvalStatus}
        </Badge>
      </div>

      {/* Product Details */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-4">
        
        <div className="space-y-2.5">
          {/* Category & Owner Info */}
          <div className="flex items-center justify-between gap-2">
            <span className="inline-flex items-center gap-1 text-[11px] font-bold text-indigo-600 bg-indigo-50 border border-indigo-100 px-2.5 py-0.5 rounded-md uppercase">
              <Tag className="w-3 h-3" />
              <span>{product?.category || "General"}</span>
            </span>

            <div className="flex items-center gap-1 text-xs text-slate-500 font-medium truncate max-w-[130px]">
              <User className="w-3 h-3 text-slate-400 shrink-0" />
              <span className="truncate">{product?.ownerName || "Unknown Owner"}</span>
            </div>
          </div>

          {/* Product Name */}
          <h3 className="font-bold text-slate-900 text-base leading-snug line-clamp-1">
            {product?.productName || "Untitled Product"}
          </h3>
        </div>

        {/* Daily Rate & Action Buttons */}
        <div className="pt-3 border-t border-slate-100 space-y-3">
          
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Daily Rate
            </span>
            <div className="text-right">
              <span className="text-base font-black text-slate-900">
                ₹{product?.dailyRate || 0}
              </span>
              <span className="text-xs text-slate-500 font-medium"> / day</span>
            </div>
          </div>

          {/* Optional Card Actions Container */}
          {actions && (
            <div className="pt-1 flex gap-2 items-center [&>*]:flex-1">
              {actions}
            </div>
          )}

        </div>

      </div>

    </Card>
  );
};

export default ProductCard;