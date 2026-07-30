import { useEffect, useState } from "react";
import { getDashboard } from "../../api/ownerDashboardApi";

const DashboardStats = () => {
    const [dashboard, setDashboard] = useState({
        totalEarnings: 0,
        activeListings: 0,
        completedRentals: 0,
    });

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

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Total Earnings */}
            <div className="bg-white rounded-xl shadow-md p-6">
                <h3 className="text-gray-500 text-sm font-medium">
                    Total Earnings
                </h3>

                <p className="text-3xl font-bold mt-2">
                    ₹{dashboard.totalEarnings}
                </p>
            </div>

            {/* Active Listings */}
            <div className="bg-white rounded-xl shadow-md p-6">
                <h3 className="text-gray-500 text-sm font-medium">
                    Active Listings
                </h3>

                <p className="text-3xl font-bold mt-2">
                    {dashboard.activeListings}
                </p>
            </div>

            {/* Completed Rentals */}
            <div className="bg-white rounded-xl shadow-md p-6">
                <h3 className="text-gray-500 text-sm font-medium">
                    Completed Rentals
                </h3>

                <p className="text-3xl font-bold mt-2">
                    {dashboard.completedRentals}
                </p>
            </div>
        </div>
    );
};

export default DashboardStats;