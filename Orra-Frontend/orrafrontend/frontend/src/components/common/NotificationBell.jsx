import React, { useEffect, useState } from "react";
import { Bell, Package, User, CreditCard, Check } from "lucide-react";
import { useSelector } from "react-redux";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getUserNotifications, getUnreadCount, markAsRead } from "@/api/notificationApi";
import { toast } from "sonner";

const TYPE_CONFIG = {
    BOOKING_REQUEST: { icon: Package, bg: "bg-indigo-100", color: "text-indigo-600", title: "Booking Request" },
    MESSAGE: { icon: User, bg: "bg-teal-100", color: "text-teal-600", title: "Message Received" },
    PAYMENT_SUCCESS: { icon: CreditCard, bg: "bg-emerald-100", color: "text-emerald-600", title: "Payment Successful" },
    PAYOUT_RECEIVED: { icon: CreditCard, bg: "bg-emerald-100", color: "text-emerald-600", title: "Payment Received" },
};
const DEFAULT_CONFIG = { icon: Bell, bg: "bg-slate-100", color: "text-slate-500", title: "Notification" };

const timeAgo = (dateString) => {
    const date = new Date(dateString);
    const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
    if (seconds < 60) return "just now";
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes} min${minutes !== 1 ? "s" : ""} ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours} hour${hours !== 1 ? "s" : ""} ago`;
    const days = Math.floor(hours / 24);
    if (days === 1) return "Yesterday";
    if (days < 7) return `${days} days ago`;
    return date.toLocaleDateString("en-GB");
};

const NotificationBell = () => {

    const user = useSelector((state) => state.auth.user);

    const [notifications, setNotifications] = useState([]);
    const [unreadCount, setUnreadCount] = useState(0);


    useEffect(() => {
        if (!user) return;
        fetchUnreadCount();

        const intervalId = setInterval(fetchUnreadCount, 10000);
        return () => clearInterval(intervalId);
    }, [user]);

    const fetchUnreadCount = async () => {
        try {
            const response = await getUnreadCount(user.userId);
            setUnreadCount((prevCount) => {
                if (response.data.count > prevCount) {
                    toast("You have a new notification");
                }
                return response.data.count;
            });
        } catch (error) {
            console.error("Failed to fetch unread count:", error);
        }
    };

    const fetchNotifications = async () => {
        try {
            const response = await getUserNotifications(user.userId);
            setNotifications(response.data);
        } catch (error) {
            console.error("Failed to fetch notifications: ", error);
        }
    };

    const handleOpenChange = (open) => {
        if (open) fetchNotifications();
    };

    const handleNotificationClick = async (notification) => {
        if (notification.read) return;
        try {
            const response = await markAsRead(notification.id);
            const updateNotification = response.data;
            setNotifications((prev) =>
                prev.map((n) => (n.id === updateNotification.id ? updateNotification : n))
            );
            setUnreadCount((prev) => Math.max(0, prev - 1));
        } catch (error) {
            console.error("Failed to mark as read:", error);
        }
    };

    const handleMarkAllRead = async () => {
    const unread = notifications.filter((n) => !n.read);
    if (unread.length === 0) return;
    try {
        await Promise.all(unread.map((n) => markAsRead(n.id)));
        setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
        setUnreadCount(0);
    } catch (error) {
        console.error("Failed to mark all as read:", error);
    }
};
    return (
        <DropdownMenu onOpenChange={handleOpenChange}>
            <DropdownMenuTrigger asChild>
                <button className="relative">
                    <Bell className="w-5 h-5 text-gray-600" />
                    {unreadCount > 0 && (
                        <span className="absolute -top-2 -right-2 text-xs bg-indigo-600 text-white px-1.5 py-0.5 rounded-full">
                            {unreadCount}
                        </span>
                    )}
                </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="w-96 p-0 rounded-2xl overflow-hidden">
                {/* Header */}
                <div className="flex items-center justify-between px-4 py-3.5 border-b border-slate-100">
                    <h3 className="font-bold text-slate-900">Notifications</h3>
                    <button
                        onClick={handleMarkAllRead}
                        className="flex items-center gap-1 text-xs font-semibold text-indigo-600 hover:text-indigo-700"
                    >
                        <Check className="w-3.5 h-3.5" />
                        Mark all read
                    </button>
                </div>

                {/* List */}
                <div className="max-h-[360px] overflow-y-auto">
                    {notifications.length === 0 ? (
                        <div className="px-4 py-8 text-sm text-slate-400 text-center">
                            No notifications yet.
                        </div>
                    ) : (
                        notifications.map((notification) => {
                            const config = TYPE_CONFIG[notification.type] || DEFAULT_CONFIG;
                            const Icon = config.icon;
                            return (
                                <button
                                    key={notification.id}
                                    onClick={() => handleNotificationClick(notification)}
                                    className={`w-full flex items-start gap-3 px-4 py-3.5 text-left border-b border-slate-50 hover:bg-slate-50 transition-colors ${!notification.read ? "bg-indigo-50/40" : "bg-white"
                                        }`}
                                >
                                    <div className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 ${config.bg}`}>
                                        <Icon className={`w-4 h-4 ${config.color}`} />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center justify-between gap-2">
                                            <span className="text-sm font-bold text-slate-900">{config.title}</span>
                                            {!notification.read && (
                                                <span className="w-2 h-2 rounded-full bg-indigo-600 shrink-0" />
                                            )}
                                        </div>
                                        <p className="text-sm text-slate-500 mt-0.5 line-clamp-2">
                                            {notification.message}
                                        </p>
                                        <span className="text-xs text-slate-400 mt-1 block">
                                            {timeAgo(notification.createdAt)}
                                        </span>
                                    </div>
                                </button>
                            );
                        })
                    )}
                </div>

                {/* Footer */}
                <button
                    onClick={() => console.log("View all activity - page not built yet")}
                    className="w-full py-3 text-sm font-semibold text-slate-600 hover:bg-slate-50 border-t border-slate-100"
                >
                    View all activity
                </button>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default NotificationBell;