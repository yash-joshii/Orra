import DashboardStats from "@/components/Dashboard/DashboardStats";
import ActionCenter from "@/components/Dashboard/ActionCenter";

const Dashboard = () => {
  return (
      <div className="p-6 space-y-6">
        <DashboardStats />

        <ActionCenter />
      </div>
  );
};

export default Dashboard;