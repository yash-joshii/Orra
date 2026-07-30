import axiosinstance from "./Axiosconfig"

export const createBooking = (data) => {
    return axiosinstance.post("/booking", data);
};

export const payForBooking = (bookingId) => {
    return axiosinstance.patch(`/booking/${bookingId}/pay`);
};

export const getMyBookings = (renterId) => {
    return axiosinstance.get(`/booking/renter/${renterId}`);
};

export const acceptBooking = (bookingId) => {
    return axiosinstance.patch(`/booking/${bookingId}/accept`);
};

export const rejectBooking = (bookingId) => {
    return axiosinstance.patch(`/booking/${bookingId}/reject`);
};

export const cancelBooking = (bookingId, renterId) => {
    return axiosinstance.patch(`/booking/${bookingId}/cancel?renterId=${renterId}`);
};

export const getIncomingRequests = (ownerId) => {
    return axiosinstance.get(`/booking/owner/${ownerId}/incoming`);
};

export const getBookingById = (bookingId) => {
  return axiosinstance.get(`/booking/${bookingId}`);
};

export const getOwnerBookings = (ownerId) => {
    return axiosinstance.get(`/booking/owner/${ownerId}`);
};

// export const shipBooking = (bookingId) => {
//     return axiosinstance.patch(`/booking/${bookingId}/ship`);
// };
