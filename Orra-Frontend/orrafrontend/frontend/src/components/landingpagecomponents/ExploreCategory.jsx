import React from "react";

import {
  Laptop,
  Camera,
  Gamepad2,
  Plane,
  Tablet,
  Smartphone,
  Watch,
  Headphones,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const categories = [
  { name: "Laptops", icon: Laptop },
  { name: "Cameras", icon: Camera },
  { name: "Consoles", icon: Gamepad2 },
  { name: "Drones", icon: Plane },
  { name: "Tablets", icon: Tablet },
  { name: "Phones", icon: Smartphone },
  { name: "Watches", icon: Watch },
  { name: "VR/AR", icon: Headphones },
];

const ExploreCategory = () => {
    const navigate = useNavigate(); 
    const btnCategory = ()=>{
    navigate("/browserdevices")
    }
  return (
    <div className="w-full bg-[#F9FAFB] px-16 py-16">
      <h2 className="text-[2rem] font-extrabold text-[#111827] mb-2">
        Explore Categories
      </h2>
      <p className="text-[#6B7280] text-[16px] mb-10">
        Find exactly what you need for your next project
      </p>

      <div className="grid grid-cols-8 gap-6">
        {categories.map(({ name, icon: Icon }) => (
          <div
          onClick={btnCategory}
            key={name}
            className="flex flex-col items-center justify-center shadow-[0px_1px_2px_rgba(0,0,0,0.05)] bg-white rounded-2xl border border-[#F3F4F6]  hover:shadow-md transition-shadow duration-200 cursor-pointer py-6 px-4"
          >
            <div className="flex items-center justify-center w-14 h-14 rounded-xl hover:bg-[#5650cc]/15 bg-[#F3F4F6] mb-4">
              <Icon
                className="w-6 h-6 text-[#374151]  hover:text-[#5650cc]"
                strokeWidth={1.75}
              />
            </div>
            <span className="text-[15px] font-semibold text-[#111827]">
              {name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExploreCategory;
