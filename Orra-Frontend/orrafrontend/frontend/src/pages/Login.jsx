import React from 'react'


const Login = () => {
  return (
    <div className="min-h-screen flex">
      {/* LEFT SIDE */}
      <div className="w-full lg:w-1/2 flex items-center justify-center bg-white px-8 py-12">
        <div className="w-full max-w-md">
          {/* Heading */}
          <h1 className="text-5xl font-bold text-gray-900 mb-3">
            Welcome back
          </h1>

          <p className="text-gray-500 mb-10">
            Enter your details to access your account.
          </p>

          {/* Google Button */}
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

          {/* Apple Button */}
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
              Or continue with email
            </span>
            <div className="h-px bg-gray-300 flex-1"></div>
          </div>

          {/* Email */}
          <div className="mb-5">
            <label className="block mb-2 font-medium">
              Email
            </label>

          <input
            type="email"
            placeholder="name@example.com"
            className="w-full border border-gray-200 rounded-2xl p-4 shadow-[0_12px_30px_-4px_rgba(0,0,0,0.08),0_0px_4px_rgba(0,0,0,0.03)] focus:outline-none focus:ring-2 focus:ring-[#544be9]"
          />
          </div>

          {/* Password */}
          <div className="mb-5">
            <label className="block mb-2 font-medium  ">
              Password
            </label>

            <input
            type="password"
            placeholder="••••••••"
            className="w-full border border-gray-200 rounded-2xl p-4 shadow-[0_12px_30px_-4px_rgba(0,0,0,0.08),0_0px_4px_rgba(0,0,0,0.03)] focus:outline-none focus:ring-2 focus:ring-[#544be9]"
            />
          </div>

          {/* Remember Me + Forgot Password */}
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

          {/* Sign In Button */}
          <button className="w-full bg-gradient-to-r bg-[#544be9]  text-white py-4 rounded-xl font-semibold text-lg hover:opacity-90 transition">
            Sign In →
          </button>

          {/* Sign Up */}
          <p className="text-center mt-6 text-gray-500">
            Don't have an account?{" "}
            <span className="text-[#544be9] font-medium cursor-pointer">
              Sign up
            </span>
          </p>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-gradient-to-br from-purple-950 via-purple-800 to-indigo-950 items-center justify-center">

        {/* Decorative Background Shapes */}
        <div className="absolute w-[700px] h-[700px] rounded-full bg-purple-400/10 top-[-250px] right-[-200px]" />

        <div className="absolute w-[500px] h-[500px] rounded-full bg-indigo-400/10 bottom-[-150px] left-[-100px]" />

        <div className="absolute w-[300px] h-[300px] rounded-full bg-pink-400/10 top-[150px] left-[150px]" />

        {/* Content */}
        <div className="relative z-10 max-w-xl px-12 text-white translate-y-12">
          <h2 className="text-6xl font-bold leading-tight mb-6">
            Access premium gear without owning it.
          </h2>

          <p className="text-xl text-gray-200 leading-relaxed">
            Join the community of creators, photographers,
            developers and tech enthusiasts renting and
            lending high-end equipment every day.
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
}

export default Login