import React from "react";
import { Badge } from "@/components/ui/badge";

import { Button } from "@/components/ui/button";
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
} from "lucide-react";

const ProductCard = ({ data }) => {
  return (
    <Card className="relative mx-auto w-[20%] min-h-min-[50vh] rounded-[25px] max-w-sm pt-0 shadow-md transition-all duration-300 ease-in-out hover:scale-105 hover:-translate-y-1 hover:shadow-xl hover:cursor-pointer">
      <div className="absolute inset-0 z-30 aspect-video bg-black/35" />
      <img
        src={data.imageurl}
        alt={data.title}
        // src="https://i.pravatar.cc/500"
        // alt="Event cover"
        className="relative z-20 aspect-video w-full object-cover brightness-60 grayscale dark:brightness-40"
      />
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
        <h3 className="ml-[7%] text-[16px] font-bold">{data.cardtitle}</h3>
      </CardTitle>
      <CardContent className="flex flex-row items-start justify-start gap-2.75  ">
        <img
          src="https://i.pravatar.cc/40"
          alt="profile"
          className="w-6 h-6 rounded-full"
        />
        <div className="ownername">
          <span className="flex gap-[7px] text-[13px] text-gray-500 font-medium items-center">
            {data.owner}
            <CheckCircle2 className="w-3.5 h-3.5 !text-green-500" />
          </span>
        </div>
      </CardContent>
      <div className="h-px w-full bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
      <div className="flex items-start justify-between w-full max-w-[293px]">
        <div className="price  ml-[6%]">
          <span className=" flex justify-between text-[20px] font-bold">
            {data.price}
            <span className="text-[10px] text-gray-300 mt-[16%]"> /day</span>
          </span>
        </div>
        <div className="bookbtn mr-[2%]">
          <button className="bg-black w-[100%] h-[10%] p-2 rounded-[12px] shadow-[rgba(50,50,93,0.25)_0px_2px_5px_-1px,rgba(0,0,0,0.3)_0px_1px_3px_-1px] cursor-pointer hover:bg-[#5650cc] ">
            {" "}
            <Calendar className="text-white w-4 h-4" />{" "}
          </button>
        </div>
      </div>
    </Card>
  );
};

export default ProductCard;
