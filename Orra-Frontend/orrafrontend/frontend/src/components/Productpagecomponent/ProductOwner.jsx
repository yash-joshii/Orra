import React from "react";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { ShieldCheck } from "lucide-react";

const Productdata = ({ data }) => {
  return (
    <div className="max-w-sm space-y-4">
      <Card className="rounded-3xl shadow-md border-none">
        <CardContent className="p-6 flex flex-col items-center text-center">
          <img
            src={data?.avatarUrl || "https://placehold.co/100x100?text=data"}
            alt={data?.name}
            className="w-24 h-24 rounded-full object-cover"
          />

          <h3 className="mt-4 text-xl font-bold text-gray-900">
            {data?.name || "data Name"}
          </h3>

          <p className="text-sm text-gray-500 mt-1">
            Joined {data?.joinedDate || "—"}
          </p>

          {data?.verified && (
            <div className="flex items-center gap-1 mt-2 text-sm text-gray-700">
              <CheckCircle2 className="w-4 h-4 text-green-500" />
              <span className="font-semibold">Verified</span>
            </div>
          )}

          {/* <Button
            variant="outline"
            className="w-full h-12 mt-6 rounded-full text-base font-semibold border-gray-300"
          >
            Message data
          </Button> */}
        </CardContent>
      </Card>

      <div className="bg-indigo-50 rounded-2xl p-5 flex gap-3">
        <ShieldCheck className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
        <div>
          <h4 className="font-semibold text-gray-900 text-sm">
            ORRA Guarantee
          </h4>
          <p className="text-sm text-indigo-900/70 mt-1">
            Every rental is covered up to $5,000 against damage and theft.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Productdata;
