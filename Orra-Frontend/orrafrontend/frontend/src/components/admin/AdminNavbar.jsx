import React, { useState } from "react";

import { useNavigate } from "react-router-dom";
import { Search, Bell, ChevronDown, LogOut, User as UserIcon, Loader2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Logout } from "@/api/authApi";
import { logout } from "@/redux/slices/authslices";
import { useDispatch, useSelector } from "react-redux";

// Replace with your actual auth API & Redux slice action paths


const AdminNavbar = () => {
  const dispatch =useDispatch();
  const navigate = useNavigate();
  const [loggingOut, setLoggingOut] = useState(false);

  const { user } = useSelector((state) => state.auth);

  // Logout Handler Logic
  const handleLogout = async () => {
    try {
      setLoggingOut(true);
      await Logout();
      dispatch(logout());
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      setLoggingOut(false);
    }
  };

  // Dynamic user initials generator
  const getInitials = (name) => {
    if (!name) return "AU";
    const parts = name.trim().split(" ");
    if (parts.length >= 2) {
      return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    }
    return parts[0].slice(0, 2).toUpperCase();
  };

  const displayName = user?.name || "Admin User";
  const displayRole = user?.role || "Superadmin";
  const initials = getInitials(user?.name);

  return (
    <header className="h-16 border-b border-slate-200/80 bg-white/80 backdrop-blur-md sticky top-0 z-30 flex items-center justify-between px-6 transition-all">
      
      {/* Search Bar Input */}
      <div className="relative w-72 sm:w-80">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
        <input
          type="text"
          placeholder="Search users, products..."
          className="w-full h-10 pl-10 pr-4 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-800 text-sm outline-none focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all placeholder:text-slate-400 font-medium"
        />
      </div>

      {/* Admin Quick Controls & Profile Dropdown */}
      <div className="flex items-center gap-3 sm:gap-4">
        
        {/* Notifications Button */}
        <button
          type="button"
          className="relative p-2.5 rounded-xl text-slate-500 hover:text-slate-700 hover:bg-slate-100/80 active:scale-95 transition-all cursor-pointer"
          aria-label="View notifications"
        >
          <Bell className="w-4 h-4" />
          <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-indigo-600 ring-2 ring-white" />
        </button>

        <div className="h-6 w-[1px] bg-slate-200 hidden sm:block" />

        {/* Profile Card & Action Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              type="button"
              className="flex items-center gap-3 p-1 pl-1.5 pr-2 rounded-2xl hover:bg-slate-100/60 transition-all cursor-pointer outline-none group"
            >
              <div className="w-9 h-9 rounded-xl bg-indigo-100 border border-indigo-200/60 flex items-center justify-center text-xs font-bold text-indigo-700 shrink-0 shadow-xs">
                {initials}
              </div>
              <div className="text-left hidden sm:block">
                <div className="text-xs font-bold text-slate-900 group-hover:text-indigo-600 transition-colors leading-snug">
                  {displayName}
                </div>
                <div className="text-[11px] font-medium text-slate-500 capitalize leading-none">
                  {displayRole}
                </div>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-600 transition-colors hidden sm:block" />
            </button>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            align="end"
            className="w-56 rounded-2xl p-1.5 border border-slate-200/80 shadow-md bg-white space-y-1"
          >
            <DropdownMenuLabel className="px-3 py-2">
              <div className="text-xs font-bold text-slate-900">{displayName}</div>
              <div className="text-[11px] font-medium text-slate-400 truncate">
                {user?.email || "admin@system.com"}
              </div>
            </DropdownMenuLabel>

            <DropdownMenuSeparator className="bg-slate-100" />

            <DropdownMenuItem className="rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-50 cursor-pointer flex items-center gap-2">
              <UserIcon className="w-4 h-4 text-slate-400" />
              <span>Profile Settings</span>
            </DropdownMenuItem>

            <DropdownMenuSeparator className="bg-slate-100" />

            {/* Logout Trigger */}
            <DropdownMenuItem
              disabled={loggingOut}
              onClick={handleLogout}
              className="rounded-xl text-xs font-semibold text-rose-600 hover:bg-rose-50 focus:bg-rose-50 cursor-pointer flex items-center gap-2"
            >
              {loggingOut ? (
                <Loader2 className="w-4 h-4 animate-spin text-rose-600" />
              ) : (
                <LogOut className="w-4 h-4 text-rose-600" />
              )}
              <span>{loggingOut ? "Logging out..." : "Log out"}</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

      </div>

    </header>
  );
};

export default AdminNavbar;