import { paymentAxios } from "./Axiosconfig";

export const createOrder = (amount, bookingId) => {
  return paymentAxios.post("/create-order", { amount, bookingId });
};

export const getPaymentStatus = (transactionId) => {
  return paymentAxios.get(`/status/${transactionId}`);
};
