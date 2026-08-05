import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { searchProducts } from "@/api/listingApi";
import { getWishlist } from "@/api/wishlist";
import { NavLink, useNavigate, Link } from "react-router-dom";
// import { searchProducts } from "@/api/listingApi";
import { logout } from "@/redux/slices/authslices";
import { Logout } from "@/api/authApi";
import { setLoading, setUser } from "@/redux/slices/userprofileSlice";
import { getUser } from "@/api/userApi";
import { setError } from "@/redux/slices/productslices";

import {
  Search,
  Calendar,
  ChevronDown,
  Heart,
  Package,
  LayoutDashboardIcon,
  LogOutIcon,
  SettingsIcon,
  UserIcon,
  Sparkles,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import logo from "../../assets/logo/orralogo.svg";
// import { setLoading, setUser } from "@/redux/slices/userprofileSlice";
// import { getUser } from "@/api/userApi";
// import { setError } from "@/redux/slices/productslices";
import { setWishlistCount } from "@/redux/slices/wishlistSlice";
import NotificationBell from "./NotificationBell";

const API_BASE_URL = import.meta.env.VITE_SPRINGBOOT_API_URL;

const getAvatarSrc = (avatarPath) => {
  if (!avatarPath) return null;
  if (avatarPath.startsWith("http://") || avatarPath.startsWith("https://")) {
    return avatarPath;
  }
  return `${API_BASE_URL}${avatarPath}`;
};

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [scrolled, setScrolled] = useState(false);
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = async (e) => {
    const value = e.target.value;
    setSearch(value);

    if (value.trim() === "") {
      setResults([]);
      return;
    }

    try {
      const response = await searchProducts(value);
      setResults(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const user = useSelector((state) => state.auth.user);
  const userprofile = useSelector((state) => state.userProfile.user);
  const isOwner = userprofile?.roles?.includes("OWNER");
  const currentUserId = user?.userId ?? user?.id;
  const wishlistCount = useSelector((state) => state.wishlist.count);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = async () => {
    try {
      await Logout();
      dispatch(logout());
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  useEffect(() => {
    if (user && !userprofile) {
      fetchUserProfile();
    }
  }, [user]);

  const fetchUserProfile = async () => {
    try {
      dispatch(setLoading(true));
      const response = await getUser();
      dispatch(setUser(response.data));
      dispatch(setLoading(false));
    } catch (err) {
      dispatch(setLoading(false));
      dispatch(setError(err.message));
    }
  };

  useEffect(() => {
    const fetchWishlistCount = async () => {
      try {
        const response = await getWishlist(currentUserId);
        dispatch(setWishlistCount(response.data?.length ?? 0));
      } catch (err) {
        console.error("Failed to fetch wishlist count:", err);
      }
    };

    if (currentUserId) {
      fetchWishlistCount();
    } else {
      dispatch(setWishlistCount(0));
    }
  }, [currentUserId, dispatch]);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Browse Devices", path: "/browserdevices" },
    { name: "Categories", path: "/categories" },
    { name: "My Bookings", path: "/mybookings" },
    { name: "Wishlist", path: "/wishlist" },
    ...(isOwner ? [{ name: "Dashboard", path: "/dashboard" }] : []),
  ];

  // 1. Get the current booking state from Redux
  const currentBooking = useSelector((state) => state.booking.currentBooking);

  // 2. Check if a booking is currently pending or accepted
  const isBookingPendingPayment = currentBooking?.status === "ACCEPTED";

  // 3. Set the target destination dynamically
  const targetRoute = isBookingPendingPayment
    ? `/booking/${currentBooking.bookingId}`
    : "/cart";

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "bg-white/80 backdrop-blur-xl shadow-sm border-b border-slate-200/60"
          : "bg-white/40 backdrop-blur-md border-b border-slate-100/40"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        
        {/* Brand & Nav */}
        <div className="flex items-center gap-6 lg:gap-8 shrink-0">
          
          {/* ORIGINAL LOGO (UNTOUCHED) */}
          <Link
            to="/"
            className="flex items-center gap-2.5 group focus:outline-none shrink-0"
          >
            <div className="w-9 h-9 flex items-center justify-center">
              <img
                src={logo}
                alt="logo"
                className="w-full h-full object-contain"
              />
            </div>
            <span className="text-xl font-black text-slate-900 tracking-tight">
              ORRA
            </span>
          </Link>

          {/* Desktop Navigation - Strictly Single Line */}
          <nav className="hidden md:flex items-center gap-1 font-medium text-sm text-slate-600 whitespace-nowrap">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `px-3.5 py-1.5 rounded-full transition-all duration-200 whitespace-nowrap ${
                    isActive
                      ? "text-indigo-600 font-semibold bg-indigo-50/80 border border-indigo-100/60"
                      : "hover:text-slate-900 hover:bg-slate-100/60"
                  }`
                }
              >
                {item.name}
                {item.name === "Wishlist" && wishlistCount > 0 && (
                  <span className="inline-flex items-center justify-center min-w-[18px] h-[18px] px-1 rounded-full bg-red-500 text-white text-[11px] font-bold leading-none">
                    {wishlistCount}
                  </span>
                )}
              </NavLink>
            ))}
          </nav>
        </div>

        {/* Search & Actions */}
        <div className="flex items-center gap-3 lg:gap-4 shrink-0">
          
          {/* Search Input */}
          <div className="relative hidden lg:block w-[200px] xl:w-[260px]">
            <div className="group flex items-center bg-slate-100/80 hover:bg-slate-100 border border-slate-200/80 rounded-full px-3.5 py-1.5 focus-within:bg-white focus-within:border-indigo-500 focus-within:ring-4 focus-within:ring-indigo-500/10 transition-all shadow-inner">
              <Search className="w-4 h-4 text-slate-400 group-focus-within:text-indigo-600 transition-colors shrink-0" />
              <input
                type="text"
                value={search}
                onChange={handleSearch}
                placeholder="Search gear..."
                className="bg-transparent outline-none ml-2 text-sm text-slate-800 placeholder:text-slate-400 w-full font-normal"
              />
              <kbd className="hidden xl:inline-block px-1.5 py-0.5 text-[10px] font-semibold text-slate-400 bg-white border border-slate-200 rounded-md shadow-2xs">
                ⌘K
              </kbd>
            </div>

            {/* Dropdown Search Results */}
            {results.length > 0 && (
              <div className="absolute top-12 left-0 w-full bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-slate-100 z-50 max-h-80 overflow-y-auto p-1.5 space-y-1 transition-all duration-200">
                {results.map((item) => (
                  <div
                    key={item.productId}
                    className="p-2.5 rounded-xl cursor-pointer hover:bg-slate-100/80 hover:translate-x-0.5 transition-all duration-150"
                    onClick={() => {
                      navigate(`/product/${item.productId}`);
                      setSearch("");
                      setResults([]);
                    }}
                  >
                    <p className="font-semibold text-sm text-slate-800">
                      {item.productName}
                    </p>
                    <p className="text-xs text-slate-500 font-medium">
                      {item.brand}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Notifications Bell */}
          <NotificationBell />

          {/* Cart / Active Booking Link */}
          <Link to={targetRoute} className="relative inline-block">
            <button className="relative p-2.5 rounded-full text-slate-600 hover:text-indigo-600 hover:bg-indigo-50/60 active:scale-95 transition-all duration-200 cursor-pointer flex items-center justify-center focus:outline-none">
              <Calendar className="w-5 h-5" />

              {/* Animated Notification Badge */}
              {isBookingPendingPayment && (
                <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-4 w-4 bg-indigo-600 text-white text-[10px] font-bold items-center justify-center">
                    1
                  </span>
                </span>
              )}
            </button>
          </Link>

         
  {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="flex  items-center gap-2 p-0 bg-transparent border-none hover:rounded-[40px] hover:border-gray-300 hover:border hover:bg-gray-100 transition duration-200 focus:bg-background focus:border-none">
                  {userprofile?.avatar ? (
                    <img
                      src={getAvatarSrc(userprofile.avatar)}
                      alt="profile"
                      className="w-8 h-8 rounded-full object-cover ring-2 ring-indigo-500/20"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-500 to-indigo-600 flex items-center justify-center text-xs font-bold text-white shadow-xs">
                      {(userprofile?.firstName?.[0] || "") +
                        (userprofile?.lastName?.[0] || "") || "U"}
                    </div>
                  )}
                  <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent
                align="end"
                className="w-56 p-2 rounded-2xl shadow-xl border-slate-100 backdrop-blur-xl bg-white/95"
              >
                <div className="flex flex-col space-y-1 p-2.5 bg-slate-50/70 rounded-xl mb-1">
                  <p className="text-sm font-bold text-slate-900 leading-none">
                    Hello, {userprofile?.firstName || "there"}!
                  </p>
                  <p className="text-xs text-slate-500 font-medium truncate">
                    {userprofile?.email}
                  </p>
                </div>

                <DropdownMenuSeparator className="my-1 bg-slate-100" />

                <DropdownMenuItem onClick={() => navigate("/profile")}>
                  <UserIcon className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>

                <DropdownMenuItem
                  onClick={() => navigate("/my-listings")}
                  className="cursor-pointer"
                >
                  <Package className="mr-2 h-4 w-4" />
                  My Listings
                </DropdownMenuItem>

                <DropdownMenuItem
                  onClick={() => navigate("/mybookings")}
                  className="cursor-pointer"
                >
                  <LayoutDashboardIcon className="mr-2 h-4 w-4" />
                  <span>My Bookings</span>
                </DropdownMenuItem>

                <DropdownMenuItem className="rounded-xl cursor-pointer py-2 hover:bg-indigo-50/60 hover:text-indigo-600 transition-colors">
                  <Heart className="mr-2 h-4 w-4" />
                  <span>Wishlist</span>
                </DropdownMenuItem>

                <DropdownMenuSeparator className="my-1 bg-slate-100" />

                <DropdownMenuItem
                  className="rounded-xl cursor-pointer py-2 hover:bg-indigo-50/60 hover:text-indigo-600 transition-colors"
                  onClick={() => navigate("/settings")}
                >
                  <SettingsIcon className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>

                <DropdownMenuItem
                  className="rounded-xl cursor-pointer py-2 text-rose-600 focus:text-rose-600 focus:bg-rose-50 transition-colors"
                  onClick={handleLogout}
                >
                  <LogOutIcon className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                className="rounded-full px-5 h-9 text-sm font-semibold text-slate-700 hover:text-slate-900 hover:bg-slate-100 transition-all cursor-pointer"
                onClick={() => navigate("/login")}
              >
                Login
              </Button>

              <Button
                className="rounded-full px-5 h-9 text-sm font-semibold bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-500/20 hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer"
                onClick={() => navigate("/signup")}
              >
                <span>Sign Up</span>
                <Sparkles className="w-3.5 h-3.5 ml-1.5" />
              </Button>
            </div>
          )}
        </div>

      </div>
    </header>
  );
};
export default Navbar;