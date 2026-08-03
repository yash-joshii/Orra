import axiosInstance from "./Axiosconfig";

export const getDashboard = () =>
    axiosInstance.get("/owner/dashboard");

export const getEarningDetails = () =>
    axiosInstance.get("/owner/dashboard/earnings");

export const getActiveListings = () =>
    axiosInstance.get("/owner/dashboard/active-listings");

export const getCompletedRentals = () =>
    axiosInstance.get("/owner/dashboard/completed-rentals");