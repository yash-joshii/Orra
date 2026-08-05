import React from 'react'
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { Calendar, MapPinIcon } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import LazyImage from './LazyImage'

const badgeConfig = {
    PENDING: {
        label: "Pending Owner Approval",
        className: "bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-300"
    },
    ACCEPTED: {
        label: "Accepted - Payment Required",
        className: "bg-purple-50 text-purple-700 dark:bg-purple-950 dark:text-purple-300"
    },
    ACTIVE: {
        label: "Active Rental",
        className: "bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300"
    },
    COMPLETED: {
        label: "Completed",
        className: "bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300"
    }
}

const MyBookingsCard = ({ booking }) => {
    const navigate = useNavigate()

    // 1. Direct binding to your BookingResponseDTO fields
    const productName = booking?.listingTitle || booking?.productName || "Product"
    const ownerName = booking?.ownerName || "Owner"
    
    // Dates
    const startDate = booking?.startDateTime || ""
    const endDate = booking?.endDateTime || ""

    // Image & Location
    const productImage = booking?.listingImage || "https://via.placeholder.com/240x130?text=No+Image"
    const location = booking?.location || "N/A"

    // Status
    const status = (booking?.status || booking?.displayStatus || "PENDING").toUpperCase()
    const badge = badgeConfig[status] || badgeConfig["PENDING"]

    const dateRangeDisplay = (startDate && endDate) 
        ? `${startDate} - ${endDate}` 
        : (startDate || endDate || "Dates not specified")

    return (
        <Card className={`relative mx-auto w-full max-w-[800px] min-h-[180px] flex flex-row items-center justify-between p-4 ${status === 'ACTIVE' ? 'border-black' : ''}`}>
            
            {/* Product Image */}
            <LazyImage
    src={productImage}
    alt={productName}
    className="w-[220px] h-[130px] object-cover rounded-[16px] bg-slate-100 flex-shrink-0"
/>

            <CardHeader className="flex-1 flex flex-col gap-2 px-6 py-2">
                <div>
                    <Badge className={`${badge.className} text-[12px] font-bold px-3 py-1`}>
                        {badge.label}
                    </Badge>
                </div>

                <div className="product-name-location-date flex flex-col gap-1">
                    <span className="text-[18px] font-bold text-slate-900 leading-snug">
                        {productName}
                    </span>

                    <div className="product-location-date flex items-center gap-4 text-xs text-slate-600">
                        <span className="flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5 text-slate-500" /> 
                            {dateRangeDisplay}
                        </span>
                        <span className="flex items-center gap-1">
                            <MapPinIcon className="w-3.5 h-3.5 text-slate-500" /> 
                            {location}
                        </span>
                    </div>
                </div>

                <div className="owner-detail flex items-center gap-2">
                    <Avatar className="w-6 h-6">
                        <AvatarImage src="" alt={ownerName} />
                    </Avatar>
                    <span className="text-xs text-slate-600">
                        Rented from <strong className="text-slate-800">{ownerName}</strong>
                    </span>
                </div>
            </CardHeader>

            {/* Action Buttons */}
            <div className="flex flex-col gap-2 w-[160px] flex-shrink-0">
                {status === "PENDING" && (
                    <Button variant="outline" className="w-full h-[40px] rounded-[16px] text-xs" disabled>
                        Awaiting Owner
                    </Button>
                )}

                {status === "ACCEPTED" && (
                    <Button 
                        onClick={() => navigate('/cart')} 
                        className="w-full h-[40px] rounded-[16px] bg-[#6a61fd] hover:bg-[#5850e0] text-xs font-semibold"
                    >
                        Pay Now
                    </Button>
                )}

                {status === "ACTIVE" && (
                    <>
                        <Button className="w-full h-[36px] rounded-[12px] bg-[#6a61fd] hover:bg-[#5850e0] text-xs">
                            Return Info
                        </Button>
                        <Button className="w-full h-[36px] rounded-[12px] bg-white text-black border border-slate-300 hover:bg-slate-50 text-xs">
                            Message Owner
                        </Button>
                    </>
                )}

                {status === "COMPLETED" && (
                    <Button variant="outline" className="w-full h-[40px] rounded-[16px] text-xs">
                        View Receipt
                    </Button>
                )}
            </div>
        </Card>
    )
}

export default MyBookingsCard