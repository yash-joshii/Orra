import { useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { logout } from "@/redux/slices/authslices";
import { Logout } from "@/api/authApi";
import {
  Search,
  Bell,
  Calendar,
  ChevronDown,
  Heart,
  Package,
  LayoutDashboardIcon,
} from "lucide-react";
import { LogOutIcon, SettingsIcon, UserIcon } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import logo from "../../assets/logo/orralogo.svg";
import { setLoading, setUser } from "@/redux/slices/userprofileSlice";
import { getUser } from "@/api/userApi";
import { setError } from "@/redux/slices/productslices";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth.user);
  const userprofile = useSelector((state) => state.userProfile.user);
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
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

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Browse Devices", path: "/browserdevices" },
    { name: "Categories", path: "/categories" },
    { name: "My Bookings", path: "/bookings" },
    { name: "Wishlist", path: "/wishlist" },
    { name: "Dashboard", path: "/dashboard" },
  ];

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled ? "bg-white shadow-md" : "bg-white/30 backdrop-blur-md"
      }`}
    >
      <div className="flex items-center justify-center p-[2.2rem] h-16 relative">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 flex items-center justify-center rounded-full bg-transparent text-white font-bold">
              <img src={logo} className="text-#4F46E5" />
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
                    ? "text-indigo-600 font-bold"
                    : "hover:text-black transition-colors"
                }
              >
                {item.name}
              </NavLink>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-[25px] ml-[2%]">
          <div className="hidden lg:flex items-center bg-gray-100 w-[90%] rounded-full px-3 py-2 border border-[#e2e8f0]">
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

          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="flex  items-center gap-2 p-0 bg-transparent border-none hover:rounded-[40px] hover:border-gray-300 hover:border hover:bg-gray-100 transition duration-200 focus:bg-background focus:border-none">
                  {userprofile?.avatarUrl ? (
                    <img
                      src={userprofile.avatarUrl}
                      alt="profile"
                      className="w-8 h-8 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-xs font-semibold text-indigo-600">
                      {(userprofile?.firstName?.[0] || "") +
                        (userprofile?.lastName?.[0] || "") || "U"}
                    </div>
                  )}
                  <ChevronDown className="w-4 h-4 text-gray-600" />
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent className="w-50 p-3 absolute -right-40  top-2.5">
                <div className="flex flex-col space-y-1 m-2 mb-3">
                  <p className="text-sm font-semibold leading-none mb-2 ">
                    Hello, {userprofile?.firstName || "there"}!
                  </p>
                  <p className="text-xs leading-none text-muted-foreground">
                    {userprofile?.email}
                  </p>
                </div>

                <DropdownMenuSeparator />

                <DropdownMenuItem>
                  <UserIcon className="mr-2 h-4 w-4" />
                  Profile
                </DropdownMenuItem>

                <DropdownMenuItem>
                  <Package className="mr-2 h-4 w-4" />
                  My Products
                </DropdownMenuItem>

                <DropdownMenuItem>
                  <LayoutDashboardIcon className="mr-2 h-4 w-4" />
                  My Bookings
                </DropdownMenuItem>

                <DropdownMenuItem>
                  <Heart className="mr-2 h-4 w-4" />
                  Wishlist
                </DropdownMenuItem>

                <DropdownMenuSeparator />

                <DropdownMenuItem onClick={() => navigate("/settings")}>
                  <SettingsIcon className="mr-2 h-4 w-4" />
                  Settings
                </DropdownMenuItem>

                <DropdownMenuItem
                  className="text-red-600"
                  onClick={handleLogout}
                >
                  <LogOutIcon className="mr-2 h-4 w-4" />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                className="rounded-full px-6"
                onClick={() => navigate("/login")}
              >
                Login
              </Button>

              <Button
                className="rounded-full px-6 bg-indigo-600 hover:bg-indigo-700"
                onClick={() => navigate("/signup")}
              >
                Sign Up
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
export default Navbar;
