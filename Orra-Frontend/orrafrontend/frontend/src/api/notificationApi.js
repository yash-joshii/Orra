import axiosinstance from "./Axiosconfig"

export const getUserNotifications = (userId) => {
    return axiosinstance.get(`/notification/user/${userId}`);
};

export const getUnreadCount = (userId) => {
    return axiosinstance.get(`/notification/user/${userId}/unread-count`);
};

export const markAsRead = (notificationId) => {
    return axiosinstance.patch(`/notification/${notificationId}/read`);
};