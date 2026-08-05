import { GetCurrentUser, SignIn, SignInWithGoogle } from "@/api/authApi";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import {
  setError,
  setLoading,
  setCredentials,
} from "@/redux/slices/authslices";

const ADMIN_EMAIL = "yashjoshi.yj989@gmail.com";

const Login = () => {
  const [formData, setFormdata] = useState({
    email: "",
    password: "",
  });

  // State for form validation errors & loading UI
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Comprehensive Form Validation
  const validateForm = () => {
    const newErrors = {};
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      setIsSubmitting(true);
      dispatch(setLoading(true));

      await SignIn(formData);

      const meResponse = await GetCurrentUser();
      dispatch(setCredentials({ user: meResponse.data }));
      dispatch(setLoading(false));

      toast.success("Login Successful");

      if (meResponse.data.roles?.includes("ADMIN")) {
        navigate("/admin");
      } else {
        navigate("/");
      }
    } catch (error) {
      dispatch(setLoading(false));
      dispatch(setError(error.message));
      toast.error("Invalid Email or Password");
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex w-full bg-white selection:bg-[#544be9] selection:text-white">
      
      {/* LEFT SIDE - Form Section */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-12 sm:px-12 bg-white">
        
        <div className="w-full max-w-md">
          <div className="mb-8">
            <h1 className="text-4xl lg:text-5xl font-extrabold text-gray-900 mb-3 tracking-tight">
              Welcome back
            </h1>
            <p className="text-gray-500 font-medium">
              Enter your details to access your account.
            </p>
          </div>

          {/* Google Button */}
          <button
            type="button"
            onClick={async () => {
              try {
                await SignInWithGoogle();
              } catch (err) {
                toast.error(err.message || "Google sign-in failed.");
              }
            }}
            className="w-full bg-white border border-gray-200 rounded-2xl py-3.5 mb-6 hover:bg-gray-50 active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-3 shadow-sm text-gray-700 font-semibold"
          >
            <img src="/google.svg" alt="Google" className="w-5 h-5" />
            <span>Continue with Google</span>
          </button>

          {/* Divider */}
          <div className="flex items-center gap-4 mb-6">
            <div className="h-px bg-gray-200 flex-1"></div>
            <span className="text-gray-400 text-xs font-bold uppercase tracking-wider">
              Or continue with email
            </span>
            <div className="h-px bg-gray-200 flex-1"></div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label className="block mb-1.5 text-sm font-semibold text-gray-700">
                Email
              </label>
              <input
                value={formData.email}
                onChange={(e) => {
                  setFormdata({ ...formData, email: e.target.value });
                  if (errors.email) setErrors({ ...errors, email: null }); 
                }}
                type="email"
                placeholder="Enter your email"
                className={`w-full border rounded-xl p-3.5 sm:p-4 text-sm sm:text-base transition-all duration-200 outline-none bg-gray-50 focus:bg-white shadow-sm ${
                  errors.email
                    ? "border-red-500 focus:ring-2 focus:ring-red-200"
                    : "border-gray-200 focus:border-[#544be9] focus:ring-4 focus:ring-[#544be9]/10"
                }`}
              />
              {errors.email && (
                <p className="text-red-500 text-xs font-medium mt-1.5 flex items-center gap-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {errors.email}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="block mb-1.5 text-sm font-semibold text-gray-700">
                Password
              </label>
              <input
                value={formData.password}
                onChange={(e) => {
                  setFormdata({ ...formData, password: e.target.value });
                  if (errors.password) setErrors({ ...errors, password: null });
                }}
                type="password"
                placeholder="Enter your password"
                className={`w-full border rounded-xl p-3.5 sm:p-4 text-sm sm:text-base transition-all duration-200 outline-none bg-gray-50 focus:bg-white shadow-sm ${
                  errors.password
                    ? "border-red-500 focus:ring-2 focus:ring-red-200"
                    : "border-gray-200 focus:border-[#544be9] focus:ring-4 focus:ring-[#544be9]/10"
                }`}
              />
               {errors.password && (
                <p className="text-red-500 text-xs font-medium mt-1.5 flex items-center gap-1">
                   <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {errors.password}
                </p>
              )}
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex justify-between items-center pt-2 mb-6">
              <label className="flex items-center gap-2 text-gray-600 text-sm cursor-pointer group">
                <input 
                  type="checkbox" 
                  className="w-4 h-4 rounded border-gray-300 text-[#544be9] focus:ring-[#544be9] cursor-pointer transition-colors" 
                />
                <span className="group-hover:text-gray-900 transition-colors">Remember me</span>
              </label>

              <a href="#" className="text-[#544be9] font-semibold text-sm hover:text-indigo-800 transition-colors">
                Forgot password?
              </a>
            </div>

            {/* Sign In Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#544be9] text-white py-3.5 sm:py-4 rounded-xl font-bold text-base sm:text-lg hover:bg-indigo-700 hover:shadow-lg hover:shadow-indigo-500/30 active:scale-[0.98] transition-all duration-200 flex justify-center items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Signing In...
                </>
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          <p className="text-center mt-8 text-gray-600 font-medium">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="text-[#544be9] font-bold hover:text-indigo-800 transition-colors ml-1"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>

      {/* RIGHT SIDE - Decorative Section (Bulletproof standard classes) */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-gray-900 items-center justify-center p-12">
        {/* We use a solid bg-gray-900 fallback in the parent, plus a standard gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-gray-900 to-purple-900 opacity-90"></div>

        {/* Safe Abstract Shapes */}
        <div className="absolute w-96 h-96 rounded-full bg-purple-500 opacity-20 blur-3xl top-[-10%] right-[-10%]" />
        <div className="absolute w-96 h-96 rounded-full bg-indigo-500 opacity-20 blur-3xl bottom-[-10%] left-[-10%]" />

        {/* Content Wrapper */}
        <div className="relative z-10 max-w-lg xl:max-w-xl text-white">
          <div className="mb-6 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm shadow-xl">
            <span className="w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse"></span>
            <span className="text-xs font-bold tracking-widest uppercase text-gray-100">System Online</span>
          </div>
          
          <h2 className="text-5xl xl:text-6xl font-extrabold leading-tight mb-6">
            Access premium gear without owning it.
          </h2>

          <p className="text-lg xl:text-xl text-gray-300 leading-relaxed font-medium">
            Join the community of creators, photographers, developers and tech
            enthusiasts renting and lending high-end equipment every day.
          </p>

          {/* Slider indicators */}
          <div className="mt-12 flex gap-3">
            <div className="w-8 h-1.5 rounded-full bg-white"></div>
            <div className="w-2 h-1.5 rounded-full bg-white/30 hover:bg-white/50 transition-colors cursor-pointer"></div>
            <div className="w-2 h-1.5 rounded-full bg-white/30 hover:bg-white/50 transition-colors cursor-pointer"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;