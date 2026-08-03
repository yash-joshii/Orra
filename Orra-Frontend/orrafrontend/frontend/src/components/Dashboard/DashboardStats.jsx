import { useEffect, useState } from "react";
import DashboardDetailModal from "../owner/DashboardDetailModal";
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
        setDashboard(response.data);
      } catch (error) {
        console.error("Error fetching dashboard:", error);
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

      setModalData(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Total Earnings */}
        <div
          onClick={() => handleCardClick("earnings")}
          className="bg-white rounded-xl shadow-md p-6 cursor-pointer hover:shadow-lg transition duration-300"
        >
          <h3 className="text-gray-500 text-sm font-medium">Total Earnings</h3>

          <p className="text-3xl font-bold mt-2">₹{dashboard.totalEarnings}</p>
        </div>

        {/* Active Listings */}
        <div
          onClick={() => handleCardClick("listings")}
          className="bg-white rounded-xl shadow-md p-6 cursor-pointer hover:shadow-lg transition duration-300"
        >
          <h3 className="text-gray-500 text-sm font-medium">Active Listings</h3>

          <p className="text-3xl font-bold mt-2">{dashboard.activeListings}</p>
        </div>

        {/* Completed Rentals */}
        <div
          onClick={() => handleCardClick("completed")}
          className="bg-white rounded-xl shadow-md p-6 cursor-pointer hover:shadow-lg transition duration-300"
        >
          <h3 className="text-gray-500 text-sm font-medium">
            Completed Rentals
          </h3>

          <p className="text-3xl font-bold mt-2">
            {dashboard.completedRentals}
          </p>
        </div>
      </div>

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
