import React from "react";
import { Badge } from "@/components/ui/badge";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  addToWishlist,
  removeFromWishlist,
  checkWishlist,
} from "@/api/wishlist";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedProduct } from "@/redux/slices/productslices";
import {
  incrementWishlistCount,
  decrementWishlistCount,
} from "@/redux/slices/wishlistSlice";
import {
  Card,
  CardAction,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Calendar,
  CheckCircle2,
  MapPinCheck,
  MapPinIcon,
  SeparatorVertical,
  Verified,
  VerifiedIcon,
  Eye,
  Heart,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import LazyImage from "./LazyImage";

const ProductCard = ({ data }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  console.log("images →", data.images);
  const [liked, setLiked] = useState(false);

  const currentUserId = useSelector((state) => state.auth.user?.userId);
  const isOwner = currentUserId === data.owner?.userId;

  useEffect(() => {
    const fetchWishlistStatus = async () => {
      try {
        const response = await checkWishlist(currentUserId, data.productId);
        setLiked(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    if (data?.productId && currentUserId) {
      fetchWishlistStatus();
    }
  }, [data, currentUserId]);

  const imageUrl =
    data.images && data.images.length > 0
      ? data.images[0].imageUrl
      : "https://placehold.co/400x200?text=No+Image";

  const handleWishlist = async (e) => {
    e.stopPropagation();

    if (!currentUserId) {
      console.warn("No logged-in user, cannot update wishlist");
      navigate("/login");
      return;
    }

    console.log("Heart clicked");
    console.log("Product ID:", data.productId);

    try {
      if (liked) {
        await removeFromWishlist(currentUserId, data.productId);
        setLiked(false);
        dispatch(decrementWishlistCount());
        console.log("Removed from wishlist");
      } else {
        await addToWishlist(currentUserId, data.productId);
        setLiked(true);
        dispatch(incrementWishlistCount());
        console.log("Added to wishlist");
      }
    } catch (error) {
      console.error("Wishlist Error:", error.response?.data || error.message);
    }
  };
  return (
    <Card className="relative group w-[30%] h-[50%] rounded-[25px]  pt-0 shadow-md transition-all duration-300 ease-in-out hover:scale-105 hover:-translate-y-1 hover:shadow-xl hover:cursor-pointer">
      <div className="relative ">
        <div className="absolute inset-0 z-10 aspect-video bg-black/35" />

        <LazyImage
          src={imageUrl}
          alt={data.productName}
          className="relative z-20 aspect-[4/3] w-full object-cover brightness-60 dark:brightness-40"
        />
        <div
          className="btn flex pl-[10px] gap-[4px] w-[40%]  opacity-0 invisible group-hover:visible group-hover:opacity-100 transition duration-200  bg-white none absolute z-20 p-[2%] rounded-[19px] font-[12px] text-center bottom-[38%] left-[35%] shadow-[0px_10px_20px_rgba(0,0,0,0.19),0px_6px_6px_rgba(0,0,0,0.23)]  "
          onClick={(e) => {
            e.stopPropagation();
            dispatch(setSelectedProduct(data));
            navigate(`/product/${data.productId}`);
          }}
        >
          <Eye className="w-4 h-4 text-center mt-[2px]" /> Quick view
        </div>
        <div
          onClick={handleWishlist}
          className="btn bg-white absolute z-20 w-[9%] p-[1.5%] rounded-full font-medium text-center top-[2%] right-[2%] shadow-[0px_10px_20px_rgba(0,0,0,0.19),0px_6px_6px_rgba(0,0,0,0.23)] cursor-pointer flex items-center justify-center"
        >
          <Heart
            className={`w-5 h-5 transition ${liked ? "fill-red-500 text-red-500" : "text-gray-600"
              }`}
          />
        </div>
      </div>
      <CardHeader>
        <CardAction className="flex  w-[18vw] ">
          <Badge
            variant="secondary"
            className="rounded-[8px] p-4 text-[14px] text-[#5650cc] font-semibold bg-[oklch(0.96_0.02_286.15)]"
          >
            {data.category}
          </Badge>
          <Badge variant="ghost" className="ml-auto text-[13px] text-gray-500">
            <MapPinIcon /> {data.location}
          </Badge>
        </CardAction>
      </CardHeader>
      <CardTitle>
        <h3 className="ml-[7%] text-[16px] font-bold">{data.productName}</h3>
      </CardTitle>
      <CardContent className="flex flex-row items-start justify-start gap-2.75  ">
        <img
          src="https://i.pravatar.cc/40"
          alt="profile"
          className="w-6 h-6 rounded-full"
        />
        <div className="ownername">
          <span className="flex gap-[7px] text-[13px] text-gray-500 font-medium items-center">
            {data.owner?.name || "Unknown Owner"}
            <CheckCircle2 className="w-3.5 h-3.5 !text-green-500" />
          </span>
        </div>
      </CardContent>
      <div className="h-px w-full bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
      <div className="flex items-start justify-between w-full max-w-[293px]">
        <div className="price  ml-[6%]">
          <span className=" flex justify-between text-[20px] font-bold">
            {data.dailyRate}
            <span className="text-[10px] text-gray-300 mt-[16%]"> /day</span>
          </span>
        </div>

        {!isOwner && (
          <div className="bookbtn mr-[2%]">
            <button
              onClick={() => navigate(`/booking/${data.productId}`)}
              className="bg-black w-[100%] h-[10%] p-2 rounded-[12px] shadow-[rgba(50,50,93,0.25)_0px_2px_5px_-1px,rgba(0,0,0,0.3)_0px_1px_3px_-1px] cursor-pointer hover:bg-[#5650cc]"
            >
              <span className="text-white ">Book</span>
            </button>
          </div>
        )}


      </div>
    {/* </div> */}
    </Card >
  );
};

export default ProductCard;