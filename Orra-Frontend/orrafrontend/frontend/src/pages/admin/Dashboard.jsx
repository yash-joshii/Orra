import { useEffect, useState } from "react";

import StatCard from "@/components/admin/StatCard";
import { getDashboardStats } from "@/api/admin/adminApi";
import LogoLoader from "@/components/common/LogoLoader";

const Dashboard = () => {

    const [stats, setStats] = useState(null);

  useEffect(() => {
    getDashboardStats().then((res) => setStats(res.data));
  }, []);

  if (!stats) return <div><LogoLoader/></div>;
  return (
  <div>
      <h1 className="text-xl font-semibold mb-4">Dashboard</h1>
      <div className="grid grid-cols-4 gap-4">
        <StatCard label="Total Revenue" value={`$${stats.totalRevenue}`} />
        <StatCard label="Total Users" value={stats.totalUsers} />
        <StatCard label="Active Products" value={stats.activeProducts} />
        <StatCard label="Pending Approval" value={stats.pendingApproval} />
      </div>
    </div>
  )
}

export default Dashboard