import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import DashboardStats from "@/components/Dashboard/DashboardStats";
import ActionCenter from "@/components/Dashboard/ActionCenter";
import { Button } from "@/components/ui/button";
import { Plus, Sparkles, Calendar, ArrowRight } from "lucide-react";

const Dashboard = () => {
  const navigate = useNavigate();
  const userProfile = useSelector((state) => state.userProfile?.user);

  const todayFormatted = new Date().toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="min-h-screen bg-slate-50/50 p-4 sm:p-6 lg:p-8 space-y-8 max-w-7xl mx-auto">
      
      {/* Welcome Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-xs">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-400">
            <Calendar className="w-3.5 h-3.5 text-indigo-500" />
            <span>{todayFormatted}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Welcome back, {userProfile?.firstName || "Owner"}! 👋
          </h1>
          <p className="text-sm font-medium text-slate-500">
            Here is an overview of your rental earnings, active devices, and pending requests.
          </p>
        </div>

        {/* Header Action Button */}
        <div className="flex items-center gap-3 shrink-0">
          <Button
            onClick={() => navigate("/listingdevice")}
            className="rounded-2xl px-5 h-11 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm shadow-md shadow-indigo-500/20 active:scale-95 transition-all duration-200 cursor-pointer"
          >
            <Plus className="w-4 h-4 mr-2" />
            <span>New Listing</span>
          </Button>
        </div>
      </div>

      {/* Main Grid Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        
        {/* Left Column (2 Cols): Analytics & Stats */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Main Stats Widgets */}
          <DashboardStats />

          {/* Quick Insights & Management Banner */}
          <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-slate-900">Store Insights</h3>
                <p className="text-xs text-slate-500 font-medium">
                  Optimize your listings to increase monthly booking requests
                </p>
              </div>
              <Button
                variant="ghost"
                onClick={() => navigate("/listingdevice")}
                className="text-xs font-bold text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50 rounded-xl"
              >
                <span>Manage All</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </Button>
            </div>

            {/* Tip Banner */}
            <div className="p-4 bg-gradient-to-r from-indigo-50/80 to-blue-50/50 rounded-2xl border border-indigo-100/60 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3.5">
                <div className="p-2.5 bg-indigo-600 text-white rounded-xl shadow-xs shrink-0">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-900">
                    Boost your earnings potential
                  </p>
                  <p className="text-xs text-slate-500 font-medium">
                    Listings with updated specs and photos receive 3x more approval responses.
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Right Column (1 Col): Action Center Sidebar */}
        <div className="lg:col-span-1 w-full flex justify-center lg:justify-end">
          <ActionCenter />
        </div>

      </div>

    </div>
  );
};

export default Dashboard;