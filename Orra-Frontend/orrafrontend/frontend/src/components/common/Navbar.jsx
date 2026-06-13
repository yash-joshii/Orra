import React from 'react'
import { Search, Bell, ShoppingCart, ChevronDown } from "lucide-react"
const Navbar =  () => {
    return (
    <header className="w-full border-b bg-white">
      <div className="flex items-center justify-center p-[2.2rem] h-16">
        
        {/* LEFT SECTION */}
        <div className="flex items-center gap-8">
          
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 flex items-center justify-center rounded-full bg-indigo-600 text-white font-bold">
              O
            </div>
            <span className="text-xl font-semibold">ORRA</span>
          </div>

          {/* Nav Links */}
          <nav className="hidden md:flex items-center font-semibold text-gray-600 text-[14px] gap-[43px]">
            <a href="#" className="text-indigo-600">Home</a>
            <a href="#" className="hover:text-black">Browse Devices</a>
            <a href="#" className="hover:text-black">Categories</a>
            <a href="#" className="hover:text-black">My Bookings</a>
            <a href="#" className="hover:text-black">Wishlist</a>
            <a href="#" className="hover:text-black">Dashboard</a>
          </nav>
        </div>

        {/* RIGHT SECTION */}
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

          {/* Icons */}
          <button className="relative">
            <Bell className="w-5 h-5 text-gray-600" />
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-teal-500 rounded-full"></span>
          </button>

          <button className="relative">
            <ShoppingCart className="w-5 h-5 text-gray-600" />
            <span className="absolute -top-2 -right-2 text-xs bg-indigo-600 text-white px-1.5 py-0.5 rounded-full">
              2
            </span>
          </button>

          {/* Profile */}
          <div className="flex items-center gap-2 cursor-pointer">
            <img
              src="https://i.pravatar.cc/40"
              alt="profile"
              className="w-8 h-8 rounded-full"
            />
            <ChevronDown className="w-4 h-4 text-gray-600" />
          </div>
        </div>
      </div>
    </header>
  )
}

export default Navbar