import React from "react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import LazyImage from "../common/LazyImage";

const statusColor = {
  ACTIVE: "bg-green-100 text-green-700",
  PENDING: "bg-yellow-100 text-yellow-700",
  DISABLED: "bg-gray-200 text-gray-600",
  REJECTED: "bg-red-100 text-red-700",
};

const ProductCard = ({ product, actions }) => {
const imageUrl =
  product.imageUrl ||
  "https://placehold.co/400x200?text=No+Image";

  return (
    <Card className="overflow-hidden">
      <div className="relative h-36 bg-gray-100">
        <LazyImage
          src={imageUrl}
          alt={product.productName}
          className="w-full h-full object-cover"
        />
        <Badge className={`absolute top-2 left-2 ${statusColor[product.approvalStatus]}`}>
          {product.approvalStatus}
        </Badge>
      </div>
      <div className="p-3">
        <div className="text-xs text-indigo-600 font-medium">{product.category}</div>
        <div className="font-semibold text-sm">{product.productName}</div>
        <div className="text-xs text-gray-500 mt-1">Owner: {product.ownerName}</div>
        <div className="flex justify-between items-center mt-2">
          <span className="font-semibold text-sm">₹{product.dailyRate}/day</span>
        </div>
        {actions && <div className="mt-3 flex gap-2">{actions}</div>}
      </div>
    </Card>
  );
};

export default ProductCard;