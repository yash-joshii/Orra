import axiosinstance from "./Axiosconfig"

export const createBooking = (data) => {
    return axiosinstance.post("/api/booking", data);
};

export const payForBooking = (bookingId) => {
    return axiosinstance.patch(`/api/booking/${bookingId}/pay`);
};

export const getMyBookings = (renterId) => {
    return axiosinstance.get(`/api/booking/renter/${renterId}`);
};

export const acceptBooking = (bookingId) => {
    return axiosinstance.patch(`/api/booking/${bookingId}/accept`);
};

export const rejectBooking = (bookingId) => {
    return axiosinstance.patch(`/api/booking/${bookingId}/reject`);
};

export const cancelBooking = (bookingId, renterId) => {
    return axiosinstance.patch(`/api/booking/${bookingId}/cancel?renterId=${renterId}`);
};

export const getIncomingRequests = (ownerId) => {
    return axiosinstance.get(`/api/booking/owner/${ownerId}/incoming`);
};

export const getBookingById = (bookingId) => {
  return axiosinstance.get(`/api/booking/${bookingId}`);
};

export const getOwnerBookings = (ownerId) => {
    return axiosinstance.get(`/api/booking/owner/${ownerId}`);
};

export const shipBooking = (bookingId) => {
    return axiosinstance.patch(`/api/booking/${bookingId}/ship`);
};
