import { Badge } from "@/components/ui/badge";
import { Star, CheckCircle2 } from "lucide-react";
import LazyImage from "../common/LazyImage";

const ProductSummaryCard = ({ product }) => {
  const imageUrl =
    product?.imageUrl?.length > 0
      ? product.imageUrl
      : [
          {
            imageBase64: "https://placehold.co/800x500?text=No+Image",
          },
        ];
  return (
    <div className="product-image-description flex flex-row gap-6">
      <div className="image w-40 h-40 bg-slate-900 rounded-2xl overflow-hidden shrink-0">
        <LazyImage
          src={imageUrl}
          alt="Sony A7 IV"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="product-description flex flex-col justify-center space-y-2">
        <div className="badge flex gap-2 items-center">
          <Badge className="bg-indigo-50 text-indigo-600 hover:bg-indigo-50 font-semibold border-none rounded-md px-2 py-0.5 text-xs tracking-wide">
            {product?.category}
          </Badge>
          <Badge
            variant="ghost"
            className="text-slate-600 flex items-center gap-1 text-xs font-medium px-1"
          >
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 fill-emerald-500 stroke-white" />
            Instant Booking
          </Badge>
        </div>
        <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
          {product?.productName}
        </h2>
        <p className="text-sm font-medium text-slate-600 flex items-center gap-1">
          <Star className="w-4 h-4 fill-amber-400 stroke-amber-400" />
          <span className="font-semibold text-slate-800">4.9</span>
          <span className="text-slate-400">(124)</span>
        </p>
        <div className="pricing pt-1">
          <span className="text-3xl font-bold text-slate-900">
            $ {product?.dailyRate}
          </span>
          <span className="text-sm font-medium text-slate-400 ml-1.5">
            per day
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductSummaryCard;
