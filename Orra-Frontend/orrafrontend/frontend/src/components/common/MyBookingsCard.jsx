import React from 'react'
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { Calendar, MapPinIcon } from 'lucide-react'

// badgeConfig maps a booking's derived "displayStatus" to its label + classes
const badgeConfig = {
    active: {
        label: "Active/Paid",
        className: "bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300"
    },
    completed: {
        label: "Completed",
        className: "bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300"
    },
    reuested: {
        label: "Requested",
        className: "bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-300"
    }
}

const MyBookingsCard = ({ booking }) => {
    const {
        productImage,
        productName,
        startDate,
        endDate,
        location,
        ownerName,
        ownerAvatar,
        displayStatus, // "currently_rented" | "upcoming" | "unavailable"
    } = booking

    const badge = badgeConfig[displayStatus]
    const isActive = displayStatus === "currently_rented"

    return (
        <Card className={`relative mx-auto w-[800px] h-[200px] flex-row items-center justify-between 
            ${isActive ? "border-black" : ""}`}>
            <div className="absolute inset-0 z-30 aspect-video" />

            <img
                src={productImage}
                alt={productName}
                className="w-[240px] h-[130px] relative top-[0px] left-[38px] rounded-[20px]"
            />

            <CardHeader className="w-[500px] flex-col relative left-[35px] bottom-[0px] gap-[20px]">
                <div className="upcoming-currently-rented-unavailable">
                    {badge && (
                        <Badge className={`${badge.className} text-[15px] font-bold`}>
                            {badge.label}
                        </Badge>
                    )}
                </div>

                <div className="product-name-location-date">
                    <span className="text-[20px] font-bold">{productName}</span>
                    <div className="product-location-date flex justify-around align-baseline flex-row">
                        <span className="!flex !flex-row !gap-2.5 !items-center !justify-center">
                            <Calendar className="w-3 h-3" /> {startDate} - {endDate}
                        </span>
                        <span className="!flex !flex-row !gap-2.5 !items-center !justify-center">
                            <MapPinIcon className="w-3 h-3" /> {location}
                        </span>
                    </div>
                </div>

                <div className="owner-detail">
                    <div className="flex items-center gap-2">
                        <Avatar>
                            <AvatarImage src={ownerAvatar} alt={ownerName} />
                        </Avatar>
                        <span>Rented from {ownerName}</span>
                    </div>
                </div>
            </CardHeader>

            <div className="flex-col mr-[25px] w-[260px]">
                {isActive ? (
                    <>
                        <Button className="w-full h-[40px] rounded-[16px] bg-[#6a61fd]">
                            Return Instructions
                        </Button>
                        <Button className="w-full h-[40px] rounded-[16px] mt-[10px] bg-[#fff] text-black border border-slate-300">
                            Message Owner
                        </Button>
                    </>
                ) : (
                    <Button className="w-full h-[40px] rounded-[16px]">
                        View Details
                    </Button>
                )}
            </div>
        </Card>
    )
}

export default MyBookingsCard