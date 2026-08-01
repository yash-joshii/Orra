import axiosinstance from "./axiosinstance";

export const getDashboardSummary = () => {
    return axiosinstance.get("/owner/dashboard");
};

export const getEarningDetails = () => {
    return axiosinstance.get("/owner/dashboard/earnings");
};

export const getActiveListings = () => {
    return axiosinstance.get("/owner/dashboard/active-listings");
};

export const getCompletedRentals = () => {
    return axiosinstance.get("/owner/dashboard/completed-rentals");
};