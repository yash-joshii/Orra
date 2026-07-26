import { SendOtp, SignIn } from "@/api/authApi";
import { setError, setLoading, setUser } from "@/redux/slices/authslices";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import Signup from "./Signup";

const Login = () => {
  const [formData, setFormData] = useState({
    phone: "",
    otp: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSendOtp = async () => {
    if (!formData.phone.trim()) {
      toast.error("Enter phone number");
      return;
    }

    try {
      dispatch(setLoading(true));

      await SendOtp(formData.phone);

      dispatch(setLoading(false));

      toast.success("OTP Sent Successfully");
    } catch (error) {
      dispatch(setLoading(false));
      toast.error("Failed to send OTP");
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.phone.trim() || !formData.otp.trim()) {
      toast.error("Please fill all fields");
      return;
    }

    try {
      dispatch(setLoading(true));

     const response = await SignIn(formData);

      dispatch(setUser(response.data));

      dispatch(setLoading(false));

      toast.success("Login Successful");

      navigate("/");
    } catch (error) {
      dispatch(setLoading(false));

      dispatch(setError(error.message));

      toast.error("Invalid OTP");

      console.log(error);
    }
  };

  return (
    <div className="min-h-screen flex">

      {/* LEFT SIDE */}
      <div className="w-full lg:w-1/2 flex items-center justify-center bg-white px-8 py-12">

        <div className="w-full max-w-md">

          <h1 className="text-5xl font-bold text-gray-900 mb-3">
            Welcome back
          </h1>

          <p className="text-gray-500 mb-10">
            Login using your phone number.
          </p>

          {/* Google */}
          <button className="w-full border border-gray-200 rounded-2xl py-4 mb-4 hover:bg-gray-50 transition-all duration-200 flex items-center justify-center gap-3 shadow-[0_12px_30px_-4px_rgba(0,0,0,0.08),0_0px_4px_rgba(0,0,0,0.03)] hover:shadow-[0_16px_36px_-4px_rgba(0,0,0,0.12),0_4px_8px_rgba(0,0,0,0.05)]">
            <img
              src="/public/google.svg"
              alt="Google"
              className="w-5 h-5"
            />
            <span className="font-medium">
              Continue with Google
            </span>
          </button>

          {/* Apple */}
          <button className="w-full border border-gray-200 rounded-2xl py-4 mb-6 hover:bg-gray-50 transition-all duration-200 flex items-center justify-center gap-3 shadow-[0_12px_30px_-4px_rgba(0,0,0,0.08),0_0px_4px_rgba(0,0,0,0.03)] hover:shadow-[0_16px_36px_-4px_rgba(0,0,0,0.12),0_4px_8px_rgba(0,0,0,0.05)]">
            <img
              src="/public/apple.svg"
              alt="Apple"
              className="w-5 h-5"
            />
            <span className="font-medium">
              Continue with Apple
            </span>
          </button>

          {/* Divider */}

          <div className="flex items-center gap-3 mb-6">
            <div className="h-px bg-gray-300 flex-1"></div>

            <span className="text-gray-400 text-sm">
              Or continue with Phone
            </span>

            <div className="h-px bg-gray-300 flex-1"></div>
          </div>

          <form onSubmit={handleSubmit}>

            {/* Phone */}

            <div className="mb-5">
              <label className="block mb-2 font-medium">
                Phone Number
              </label>

              <input
                value={formData.phone}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    phone: e.target.value,
                  })
                }
                type="tel"
                maxLength={10}
                placeholder="Enter phone number"
                className="w-full border border-gray-200 rounded-2xl p-4 shadow-[0_12px_30px_-4px_rgba(0,0,0,0.08),0_0px_4px_rgba(0,0,0,0.03)] focus:outline-none focus:ring-2 focus:ring-[#544be9]"
              />
            </div>

            {/* Send OTP */}

            <button
              type="button"
              onClick={handleSendOtp}
              className="w-full border border-[#544be9] text-[#544be9] py-4 rounded-xl font-semibold mb-5 hover:bg-[#544be9] hover:text-white transition"
            >
              Send OTP
            </button>

            {/* OTP */}

            <div className="mb-6">
              <label className="block mb-2 font-medium">
                OTP
              </label>

              <input
                value={formData.otp}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    otp: e.target.value,
                  })
                }
                type="text"
                maxLength={6}
                placeholder="Enter OTP"
                className="w-full border border-gray-200 rounded-2xl p-4 shadow-[0_12px_30px_-4px_rgba(0,0,0,0.08),0_0px_4px_rgba(0,0,0,0.03)] focus:outline-none focus:ring-2 focus:ring-[#544be9]"
              />
            </div>

            {/* Sign In */}

            {/* Remember Me */}
            <div className="flex justify-between items-center mb-6">
              <label className="flex items-center gap-2 text-gray-600 text-sm">
                <input type="checkbox" />
                Remember me
              </label>

              <a
                href="#"
                className="text-purple-700 text-sm hover:underline"
              >
                Forgot password?
              </a>
            </div>

            {/* Sign In */}
            <button
              type="submit"
              className="w-full bg-[#544be9] text-white py-4 rounded-xl font-semibold text-lg hover:opacity-90 transition"
            >
              Sign In
            </button>


          </form>


          <p className="text-center mt-6 text-gray-500">
            Don't have an account?{" "}
            <span
              onClick={() => navigate("/signup")} 
              className="text-[#544be9] font-medium cursor-pointer">
              Sign Up
            </span>
          </p>

        </div>
      </div>

      {/* RIGHT SIDE */}

      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-gradient-to-br from-purple-950 via-purple-800 to-indigo-950 items-center justify-center">


        <div className="absolute w-[700px] h-[700px] rounded-full bg-purple-400/10 top-[-250px] right-[-200px]" />
        <div className="absolute w-[500px] h-[500px] rounded-full bg-indigo-400/10 bottom-[-150px] left-[-100px]" />
        <div className="absolute w-[300px] h-[300px] rounded-full bg-pink-400/10 top-[150px] left-[150px]" />

        <div className="relative z-10 max-w-xl px-12 text-white translate-y-12">

          <h2 className="text-6xl font-bold leading-tight mb-6">
            Access premium gear without owning it.
          </h2>

          <p className="text-xl text-gray-200 leading-relaxed">
            Join the community of creators, photographers, developers and tech
            enthusiasts renting and lending high-end equipment every day.
          </p>

          <div className="mt-10 flex gap-2">
            <div className="w-3 h-3 rounded-full bg-white"></div>
            <div className="w-3 h-3 rounded-full bg-white/40"></div>
            <div className="w-3 h-3 rounded-full bg-white/40"></div>
          </div>

        </div>


      </div>

    </div>
  );
};

export default Login;