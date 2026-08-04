import React, { useEffect, useState } from "react";
import DashboardDetailModal from "../owner/DashboardDetailModal";
import {
  Wallet,
  Package,
  CheckCircle2,
  ArrowUpRight,
  Loader2,
} from "lucide-react";
import {
  getDashboard,
  getEarningDetails,
  getActiveListings,
  getCompletedRentals,
} from "../../api/ownerDashboardApi";

const DashboardStats = () => {
  const [dashboard, setDashboard] = useState({
    totalEarnings: 0,
    activeListings: 0,
    completedRentals: 0,
  });

  const [selectedCard, setSelectedCard] = useState(null);
  const [modalData, setModalData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalTitle, setModalTitle] = useState("");

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const response = await getDashboard();
        setDashboard(response.data || {});
      } catch (error) {
        console.error("Error fetching dashboard stats:", error);
      }
    };

    fetchDashboard();
  }, []);

  const handleCardClick = async (type) => {
    setSelectedCard(type);
    setLoading(true);
    setModalData([]);

    try {
      let response;

      switch (type) {
        case "earnings":
          setModalTitle("Total Earnings");
          response = await getEarningDetails();
          break;

        case "listings":
          setModalTitle("Active Listings");
          response = await getActiveListings();
          break;

        case "completed":
          setModalTitle("Completed Rentals");
          response = await getCompletedRentals();
          break;

        default:
          return;
      }

      setModalData(response.data || []);
    } catch (error) {
      console.error(`Error fetching ${type} details:`, error);
    } finally {
      setLoading(false);
    }
  };

  const formattedEarnings = (dashboard?.totalEarnings || 0).toLocaleString(
    "en-IN"
  );

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Total Earnings Card */}
        <div
          onClick={() => handleCardClick("earnings")}
          className="group relative bg-white rounded-3xl p-6 border border-slate-100 shadow-sm hover:shadow-xl hover:border-emerald-200/80 hover:-translate-y-1 transition-all duration-300 cursor-pointer overflow-hidden"
        >
          <div className="flex items-center justify-between">
            <div className="p-3 bg-emerald-50 text-emerald-600 rounded-2xl group-hover:scale-110 transition-transform duration-300">
              <Wallet className="w-6 h-6" />
            </div>
            <div className="flex items-center gap-1 text-xs font-semibold text-emerald-600 bg-emerald-50/80 px-2.5 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <span>View details</span>
              {loading && selectedCard === "earnings" ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <ArrowUpRight className="w-3.5 h-3.5" />
              )}
            </div>
          </div>

          <div className="mt-5">
            <p className="text-xs font-bold tracking-wider text-slate-400 uppercase">
              Total Earnings
            </p>
            <h3 className="text-3xl font-black text-slate-900 mt-1 tracking-tight">
              ₹{formattedEarnings}
            </h3>
          </div>
        </div>

        {/* Active Listings Card */}
        <div
          onClick={() => handleCardClick("listings")}
          className="group relative bg-white rounded-3xl p-6 border border-slate-100 shadow-sm hover:shadow-xl hover:border-indigo-200/80 hover:-translate-y-1 transition-all duration-300 cursor-pointer overflow-hidden"
        >
          <div className="flex items-center justify-between">
            <div className="p-3 bg-indigo-50 text-indigo-600 rounded-2xl group-hover:scale-110 transition-transform duration-300">
              <Package className="w-6 h-6" />
            </div>
            <div className="flex items-center gap-1 text-xs font-semibold text-indigo-600 bg-indigo-50/80 px-2.5 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <span>View details</span>
              {loading && selectedCard === "listings" ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <ArrowUpRight className="w-3.5 h-3.5" />
              )}
            </div>
          </div>

          <div className="mt-5">
            <p className="text-xs font-bold tracking-wider text-slate-400 uppercase">
              Active Listings
            </p>
            <h3 className="text-3xl font-black text-slate-900 mt-1 tracking-tight">
              {dashboard?.activeListings || 0}
            </h3>
          </div>
        </div>

        {/* Completed Rentals Card */}
        <div
          onClick={() => handleCardClick("completed")}
          className="group relative bg-white rounded-3xl p-6 border border-slate-100 shadow-sm hover:shadow-xl hover:border-violet-200/80 hover:-translate-y-1 transition-all duration-300 cursor-pointer overflow-hidden"
        >
          <div className="flex items-center justify-between">
            <div className="p-3 bg-violet-50 text-violet-600 rounded-2xl group-hover:scale-110 transition-transform duration-300">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div className="flex items-center gap-1 text-xs font-semibold text-violet-600 bg-violet-50/80 px-2.5 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <span>View details</span>
              {loading && selectedCard === "completed" ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <ArrowUpRight className="w-3.5 h-3.5" />
              )}
            </div>
          </div>

          <div className="mt-5">
            <p className="text-xs font-bold tracking-wider text-slate-400 uppercase">
              Completed Rentals
            </p>
            <h3 className="text-3xl font-black text-slate-900 mt-1 tracking-tight">
              {dashboard?.completedRentals || 0}
            </h3>
          </div>
        </div>

      </div>

      {/* Modal Integration */}
      <DashboardDetailModal
        isOpen={selectedCard !== null}
        onClose={() => {
          setSelectedCard(null);
          setModalData([]);
        }}
        title={modalTitle}
        selectedCard={selectedCard}
        data={modalData}
        loading={loading}
      />
    </>
  );
};

export default DashboardStats;