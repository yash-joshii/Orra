import React from "react";
import {
  Search,
  Bell,
  Calendar,
  ShoppingCart,
  ChevronDown,
  Heart,
  Package,
  LayoutDashboardIcon,
} from "lucide-react";
import {
  CreditCardIcon,
  LogOutIcon,
  SettingsIcon,
  UserIcon,
} from "lucide-react";
import { NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  
  const navItems = [
    { name: "Home", path: "/" },
    { name: "Browse Devices", path: "/browserdevices" },
    { name: "Categories", path: "/categories" },
    { name: "My Bookings", path: "/bookings" },
    { name: "Wishlist", path: "/wishlist" },
    { name: "Dashboard", path: "/dashboard" },
  ];
  return (
    <header className="w-full border-b bg-white">
      <div className="flex items-center justify-center p-[2.2rem] h-16">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 flex items-center justify-center rounded-full bg-indigo-600 text-white font-bold">
              O
            </div>
            <span className="text-xl font-semibold">ORRA</span>
          </div>

          <nav className="hidden md:flex items-center font-semibold text-gray-600 text-[14px] gap-[43px]">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  isActive
                    ? "text-indigo-600 font-bold  "
                    : "hover:text-black transition-colors"
                }
              >
                {item.name}
              </NavLink>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-[25px] ml-[2%] ">
          {/* Search */}
          <div className="hidden lg:flex items-center bg-gray-100 w-[90%] rounded-full px-3 py-2 border border-[#e2e8f0] ">
            <Search className="w-4 h-4 text-gray-500" />
            <input
              type="text"
              placeholder="Search gear..."
              className="bg-transparent outline-none ml-2 text-sm w-full"
            />
          </div>

          <button className="relative">
            <Bell className="w-5 h-5 text-gray-600" />
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-teal-500 rounded-full"></span>
          </button>

          <button className="relative">
            <Calendar className="text-black w-5 h-5" />
            <span className="absolute -top-2 -right-2 text-xs bg-indigo-600 text-white px-1.5 py-0.5 rounded-full">
              2
            </span>
          </button>

          <div className="flex items-center gap-2 cursor-pointer">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="flex items-center gap-2 p-6 bg-transparent border-none hover:rounded-[40px] hover:border-gray-300 hover:border hover:border-solid  hover:bg-gray-100 transition duration-200 focus:bg-background focus:border-none ">
                  <img
                    src="https://i.pravatar.cc/40"
                    alt="profile"
                    className="w-8 h-8 rounded-full"
                  />
                  <ChevronDown className="w-4 h-4 text-gray-600" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-[130%] p-[11%]">
                <div className="welcome-text ">
                  <span className=" ml-[7%] text-[12px] font-semibold">
                    hello yash
                  </span>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <UserIcon />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Package />
                  My Products
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <LayoutDashboardIcon />
                  my booking
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Heart className="w-[15%]" />
                  Wishlist
                </DropdownMenuItem>

                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <SettingsIcon />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuItem variant="destructive">
                  <LogOutIcon />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
