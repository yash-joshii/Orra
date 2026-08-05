import React, { useEffect, useState } from "react";
import { IndianRupee, Users, Package, Clock, TrendingUp } from "lucide-react";
import StatCard from "@/components/admin/StatCard";
import { getDashboardStats } from "@/api/admin/adminApi";
import LogoLoader from "@/components/common/LogoLoader";

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDashboardStats()
      .then((res) => {
        setStats(res?.data || null);
      })
      .catch((err) => {
        console.error("Failed to load dashboard statistics:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  // Centered Loading State
  if (loading || !stats) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-3">
        <LogoLoader />
      </div>
    );
  }

  // Currency Formatter
  const formattedRevenue = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(stats.totalRevenue || 0);

  return (
    <div className="space-y-6">
      
      {/* Dashboard Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200/60">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Dashboard Overview
          </h1>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            Key operational metrics, system performance, and approval queues.
          </p>
        </div>

        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-2xl bg-indigo-50 border border-indigo-100 text-indigo-600 text-xs font-semibold self-start sm:self-auto">
          <TrendingUp className="w-4 h-4" />
          <span>Real-time Analytics</span>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard
          label="Total Revenue"
          value={formattedRevenue}
          icon={IndianRupee}
        />
        
        <StatCard
          label="Total Users"
          value={stats.totalUsers?.toLocaleString("en-IN") || "0"}
          icon={Users}
        />
        
        <StatCard
          label="Active Products"
          value={stats.activeProducts?.toLocaleString("en-IN") || "0"}
          icon={Package}
        />
        
        <StatCard
          label="Pending Approval"
          value={stats.pendingApproval?.toLocaleString("en-IN") || "0"}
          icon={Clock}
        />
      </div>

    </div>
  );
};

export default Dashboard;