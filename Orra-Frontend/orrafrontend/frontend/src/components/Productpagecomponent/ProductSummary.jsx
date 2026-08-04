import React from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { Info } from "lucide-react";

const ProductSummary = ({ data }) => {
  const navigate = useNavigate();
const { id: urlId } = useParams();
  const pricePerDay = data?.dailyRate || 0;
  const securityDeposit = data?.securityDeposit || 0;

  
  const { user } = useSelector((state) => state.auth);
  const currentUserId = user?.id || user?.userId;
  
 
  const isOwner = currentUserId && currentUserId === data?.owner?.userId;

 const handleBooking = () => {
   
   const productId = urlId || data?.productId ;
    
    if (productId) {
  
      navigate(`/booking/${productId}`);
    } else {
      console.error("Product ID is missing, cannot navigate to booking.");
    }
  };

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
        
       
        <div className="flex flex-col gap-1">
          <span className="text-xs font-bold tracking-wider text-slate-500 uppercase">
            Daily Rate
          </span>
          <div className="flex items-baseline gap-1.5">
            <span className="text-2xl font-extrabold text-slate-900 tracking-tight">
              Rs {pricePerDay}
            </span>
            <span className="text-sm font-semibold text-slate-500">/ day</span>
          </div>
        </div>

        {/* Security Deposit */}
        <div className="pt-4 border-t border-slate-100 flex justify-between items-center">
          <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-600">
            Security Deposit
            <Info className="w-4 h-4 text-slate-400" />
          </span>
          <span className="font-bold text-slate-900 text-sm">
            Rs {securityDeposit}
          </span>
        </div>

        {/* CTA Button (Hidden if user is the owner) */}
        {!isOwner && (
          <Button
            onClick={handleBooking}
            className="w-full h-12 mt-2 rounded-xl text-sm font-bold bg-indigo-600 hover:bg-indigo-700 text-white shadow-xs cursor-pointer transition-all"
          >
            Add to Book
          </Button>
        )}

      </CardContent>
    </Card>
  );
};

export default ProductSummary;