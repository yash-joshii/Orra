import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { SignupUser, SignInWithGoogle } from "@/api/authApi";
import { supabase } from "@/lib/supabaseclient";

const Signup = () => {
  const [formData, setFormData] = useState({
    username: "",
    name: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // State for inline validation errors & loading state
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();

  // Field Validation Logic
  const validateForm = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.username.trim()) {
      newErrors.username = "Username is required";
    } else if (formData.username.length < 3) {
      newErrors.username = "Username must be at least 3 characters";
    }

    if (!formData.name.trim()) {
      newErrors.name = "Full name is required";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (formData.phone.length !== 10) {
      newErrors.phone = "Phone number must be 10 digits";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      setIsSubmitting(true);

      // Step 1 — Create actual auth user in Supabase (handles password hashing)
      const { data: authData, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
      });
      if (error) throw error;

      // Step 2 — Create profile row in DB, linked by supabase user id
      const { confirmPassword, password, ...profileData } = formData;
      await SignupUser({
        ...profileData,
        supabaseUserId: authData.user.id,
      });

      toast.success("Signup Successful");
      navigate("/login");
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Signup Failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex w-full bg-white selection:bg-[#544be9] selection:text-white">
      {/* LEFT SIDE - Form Section */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-10 sm:px-12 bg-white">
        <div className="w-full max-w-md my-auto">
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-2 tracking-tight">
              Create an Account
            </h1>
            <p className="text-gray-500 font-medium text-sm sm:text-base">
              Join ORRA to rent premium electronics safely.
            </p>
          </div>

          {/* Google Sign-in Button */}
          <button
            type="button"
            onClick={async () => {
              try {
                await SignInWithGoogle();
              } catch (err) {
                toast.error(err.message || "Google sign-in failed.");
              }
            }}
            className="w-full bg-white border border-gray-200 rounded-2xl py-3.5 mb-5 hover:bg-gray-50 active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-3 shadow-sm text-gray-700 font-semibold text-sm sm:text-base"
          >
            <img src="/google.svg" alt="Google" className="w-5 h-5" />
            <span>Continue with Google</span>
          </button>

          {/* Divider */}
          <div className="flex items-center gap-4 mb-5">
            <div className="h-px bg-gray-200 flex-1"></div>
            <span className="text-gray-400 text-xs font-bold uppercase tracking-wider">
              Or continue with email
            </span>
            <div className="h-px bg-gray-200 flex-1"></div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Username & Full Name Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Username */}
              <div>
                <label className="block mb-1 text-sm font-semibold text-gray-700">
                  Username
                </label>
                <input
                  type="text"
                  placeholder="Username"
                  value={formData.username}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\s/g, "");
                    setFormData({ ...formData, username: value });
                    if (errors.username) setErrors({ ...errors, username: null });
                  }}
                  className={`w-full border rounded-xl p-3 text-sm transition-all duration-200 outline-none bg-gray-50 focus:bg-white shadow-sm ${
                    errors.username
                      ? "border-red-500 focus:ring-2 focus:ring-red-200"
                      : "border-gray-200 focus:border-[#544be9] focus:ring-4 focus:ring-[#544be9]/10"
                  }`}
                />
                {errors.username && (
                  <p className="text-red-500 text-xs font-medium mt-1">
                    {errors.username}
                  </p>
                )}
              </div>

              {/* Full Name */}
              <div>
                <label className="block mb-1 text-sm font-semibold text-gray-700">
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={(e) => {
                    const value = e.target.value.replace(/[^a-zA-Z ]/g, "");
                    setFormData({ ...formData, name: value });
                    if (errors.name) setErrors({ ...errors, name: null });
                  }}
                  className={`w-full border rounded-xl p-3 text-sm transition-all duration-200 outline-none bg-gray-50 focus:bg-white shadow-sm ${
                    errors.name
                      ? "border-red-500 focus:ring-2 focus:ring-red-200"
                      : "border-gray-200 focus:border-[#544be9] focus:ring-4 focus:ring-[#544be9]/10"
                  }`}
                />
                {errors.name && (
                  <p className="text-red-500 text-xs font-medium mt-1">
                    {errors.name}
                  </p>
                )}
              </div>
            </div>

            {/* Phone Number */}
            <div>
              <label className="block mb-1 text-sm font-semibold text-gray-700">
                Phone Number
              </label>
              <input
                type="tel"
                maxLength={10}
                placeholder="10-digit Phone Number"
                value={formData.phone}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, "");
                  setFormData({ ...formData, phone: value });
                  if (errors.phone) setErrors({ ...errors, phone: null });
                }}
                className={`w-full border rounded-xl p-3 text-sm transition-all duration-200 outline-none bg-gray-50 focus:bg-white shadow-sm ${
                  errors.phone
                    ? "border-red-500 focus:ring-2 focus:ring-red-200"
                    : "border-gray-200 focus:border-[#544be9] focus:ring-4 focus:ring-[#544be9]/10"
                }`}
              />
              {errors.phone && (
                <p className="text-red-500 text-xs font-medium mt-1">
                  {errors.phone}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block mb-1 text-sm font-semibold text-gray-700">
                Email Address
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={(e) => {
                  setFormData({ ...formData, email: e.target.value });
                  if (errors.email) setErrors({ ...errors, email: null });
                }}
                className={`w-full border rounded-xl p-3 text-sm transition-all duration-200 outline-none bg-gray-50 focus:bg-white shadow-sm ${
                  errors.email
                    ? "border-red-500 focus:ring-2 focus:ring-red-200"
                    : "border-gray-200 focus:border-[#544be9] focus:ring-4 focus:ring-[#544be9]/10"
                }`}
              />
              {errors.email && (
                <p className="text-red-500 text-xs font-medium mt-1">
                  {errors.email}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="block mb-1 text-sm font-semibold text-gray-700">
                Password
              </label>
              <input
                type="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={(e) => {
                  setFormData({ ...formData, password: e.target.value });
                  if (errors.password) setErrors({ ...errors, password: null });
                }}
                className={`w-full border rounded-xl p-3 text-sm transition-all duration-200 outline-none bg-gray-50 focus:bg-white shadow-sm ${
                  errors.password
                    ? "border-red-500 focus:ring-2 focus:ring-red-200"
                    : "border-gray-200 focus:border-[#544be9] focus:ring-4 focus:ring-[#544be9]/10"
                }`}
              />
              {errors.password && (
                <p className="text-red-500 text-xs font-medium mt-1">
                  {errors.password}
                </p>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block mb-1 text-sm font-semibold text-gray-700">
                Confirm Password
              </label>
              <input
                type="password"
                placeholder="Re-enter your password"
                value={formData.confirmPassword}
                onChange={(e) => {
                  setFormData({ ...formData, confirmPassword: e.target.value });
                  if (errors.confirmPassword)
                    setErrors({ ...errors, confirmPassword: null });
                }}
                className={`w-full border rounded-xl p-3 text-sm transition-all duration-200 outline-none bg-gray-50 focus:bg-white shadow-sm ${
                  errors.confirmPassword
                    ? "border-red-500 focus:ring-2 focus:ring-red-200"
                    : "border-gray-200 focus:border-[#544be9] focus:ring-4 focus:ring-[#544be9]/10"
                }`}
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-xs font-medium mt-1">
                  {errors.confirmPassword}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#544be9] text-white py-3.5 rounded-xl font-bold text-base hover:bg-indigo-700 hover:shadow-lg hover:shadow-indigo-500/30 active:scale-[0.98] transition-all duration-200 flex justify-center items-center gap-2 mt-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-2 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Creating Account...
                </>
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          {/* Footer Link */}
          <p className="text-center mt-6 text-gray-600 font-medium text-sm sm:text-base">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-[#544be9] font-bold hover:text-indigo-800 transition-colors ml-1"
            >
              Log in
            </Link>
          </p>
        </div>
      </div>

      {/* RIGHT SIDE - Hero Banner Section */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-gray-900 items-center justify-center p-12">
        {/* Optional background image fallback with dark overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-40 mix-blend-overlay"
          style={{ backgroundImage: "url('/public/image.avif')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-950 via-gray-900 to-purple-950 opacity-90"></div>

        {/* Ambient Blur Accents */}
        <div className="absolute w-96 h-96 rounded-full bg-purple-500 opacity-20 blur-3xl top-[-10%] right-[-10%]" />
        <div className="absolute w-96 h-96 rounded-full bg-indigo-500 opacity-20 blur-3xl bottom-[-10%] left-[-10%]" />

        {/* Content Wrapper */}
        <div className="relative z-10 max-w-lg xl:max-w-xl text-white">
          <div className="mb-6 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm shadow-xl">
            <span className="w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse"></span>
            <span className="text-xs font-bold tracking-widest uppercase text-gray-100">
              Join the Community
            </span>
          </div>

          <h2 className="text-5xl xl:text-6xl font-extrabold leading-tight mb-6 tracking-tight">
            Access premium gear without owning it.
          </h2>

          <p className="text-lg xl:text-xl text-gray-300 leading-relaxed font-medium">
            Join the community of creators, photographers, developers, and tech
            enthusiasts renting and lending their devices every day.
          </p>

          {/* Indicators */}
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

export default Signup;