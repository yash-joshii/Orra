import React from 'react'
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardAction,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
    Avatar,
    AvatarBadge,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import { Calendar, LocateFixedIcon, LocateIcon, Map, MapIcon, MapPinIcon, ArrowRight } from 'lucide-react'

const Bookings = () => {
    return <>
        {/* Shadcn - tabs, cards, button, badge, avatar, lucide icons */}

        {/* Bookings Body */}
        <div className = "bookings-body">
            <h1 className = "absolute top-[80px] left-[390px] font-bold text-[30px]">My Bookings</h1>
            <div className = "tabs-change-container absolute top-[150px] left-[385px] text-[#5650cc]">
                <Tabs defaultValue="overview">
                    <TabsList variant="line">
                        <TabsTrigger value="active&upcoming">Active & Upcoming</TabsTrigger>
                        <TabsTrigger value="completed">Completed</TabsTrigger>
                        <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
                    </TabsList>

                    <TabsContent value="active&upcoming" className="flex flex-col mt-[20px] gap-[24px]">

                        <Card className="relative mx-auto w-[800px] h-[200px] flex-row items-center justify-between border-black">
                            <div className="absolute inset-0 z-30 aspect-video" />
                            <img
                                src="/public/drone.avif"
                                alt="Event cover"
                                className="w-[240px] h-[130px] relative top-[0px] left-[38px] rounded-[20px]"
                            />
                            <CardHeader className="w-[500px] flex-col relative left-[35px] bottom-[0px] gap-[20px]">
                                <div className="upcoming-currently-rented-unavailable">
                                    {/* 
                                        <Badge className="bg-blue-50 text-blue-700 dark:bg-blue-950 
                                                    dark:text-blue-300 text-[15px] font-bold">
                                            Upcoming
                                        </Badge> 
                                    */}
                                    
                                    <Badge className="bg-green-50 text-green-700 dark:bg-green-950 
                                        dark:text-green-300 text-[15px] font-bold">
                                        Currently Rented
                                    </Badge>
                                    {/* 
                                        <Badge className="bg-red-50 text-red-700 dark:bg-red-950 
                                            dark:text-red-300 text-[15px] font-bold">
                                            Unavailable
                                        </Badge> 
                                    */}
                                    
                                </div>

                                <div className="product-name-location-date">
                                    <span className="text-[20px] font-bold">DJI Mavic 3 Pro Cinematic</span>
                                    <div className="product-location-date flex justify-around align-baseline flex-row">
                                        <span name="date !flex !flex-row !gap-2.5 !items-center !justify-center"> <Calendar className="w-3 h-3" /> Oct 12 - Oct, 2026</span>
                                        <span name="location !flex !flex-row !gap-2.5 !items-center !justify-center"><MapPinIcon className="w-3 h-3" />  Pune, Maharashtra</span>
                                    </div>
                                </div>

                                <div className="owner-detail">
                                    <div className="flex items-center gap-2 ">
                                        <Avatar>
                                            <AvatarImage src="/public/profile1.avif" alt="@shadcn" />
                                        </Avatar>
                                        <span>Rented from Alex D.</span>
                                    </div>
                                </div>

                            </CardHeader>

                            <div className="flex-col mr-[25px] w-[260px]">
                                <Button className="w-full h-[40px] rounded-[16px] bg-[#6a61fd]">Return Instructions</Button>
                                <Button className="w-full h-[40px] rounded-[16px] mt-[10px] bg-[#fff] text-black border
                                 border-slate-300">
                                    Message Owner</Button>
                            </div>

                        </Card>

                        <Card className="relative mx-auto w-[800px] h-[200px] flex-row items-center justify-between">
                            <div className="absolute inset-0 z-30 aspect-video" />
                            <img
                                src="/public/drone.avif"
                                alt="Event cover"
                                className="w-[240px] h-[130px] relative top-[0px] left-[38px] rounded-[20px]"
                            />
                            <CardHeader className="w-[500px] flex-col relative left-[35px] bottom-[0px] gap-[20px]">
                                <div className="upcoming-currently-rented-unavailable">
                                    <Badge className="bg-blue-50 text-blue-700 dark:bg-blue-950 
                                                dark:text-blue-300 text-[15px] font-bold">
                                        Upcoming
                                    </Badge>
                                    {/* 
                                    <Badge className="bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300">
                                        Currently Rented
                                    </Badge>
                                    <Badge className="bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-300">
                                        Unavailable
                                    </Badge> 
                                */}
                                </div>

                                <div className="product-name-location-date">
                                    <span className="text-[20px] font-bold">DJI Mavic 3 Pro Cinematic</span>
                                    <div className="product-location-date flex">
                                        <span name="date">Oct 12 - Oct, 2026</span>
                                        <span name="location"> Pune, Maharashtra</span>
                                    </div>
                                </div>

                                <div className="owner-detail">
                                    <div className="flex items-center gap-2 ">
                                        <Avatar>
                                            <AvatarImage src="/public/profile1.avif" alt="@shadcn" />
                                        </Avatar>
                                        <span>Rented from Alex D.</span>
                                    </div>
                                </div>

                            </CardHeader>

                            <div className="flex-col mr-[25px] w-[260px]">
                                <Button className="w-full h-[40px] rounded-[16px]">View Details</Button>
                            </div>

                        </Card>

                        <Card className="relative mx-auto w-[800px] h-[170px] flex-col items-center justify-evenly bg-[#f0f0ff]">

                            <h1 className="text-[22px] font-bold relative top-[20px]">Need more gear?</h1>
                            <span className="text-[16px]">Explore thousands of premium electronics available in your area.</span>
                            <a href='#' className="text-[#5650cc] mb-[25px] flex gap-1 font-bold">Browse Marketplace<ArrowRight /></a>

                        </Card>

                    </TabsContent>
                </Tabs>
            </div>
        </div>

    </>
}

export default Bookings