import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setMyBookings, setLoading, setError } from "@/redux/slices/bookingSlice"
import { getMyBookings } from "@/redux/slices/BookingApi"

import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowRight } from 'lucide-react'
import MyBookingsCard from "@/components/common/MyBookingsCard"

const myBookings = () => {
    const dispatch = useDispatch()

    // useSelector: reads current state, re-renders when it changes
    const { myBookings, loading, error } = useSelector((state) => state.booking)
    const { user } = useSelector((state) => state.auth)

    // useEffect: fires the dispatch that populates the store above
    useEffect(() => {
        if (!user?.id) return

        const fetchBookings = async () => {
            dispatch(setLoading(true))
            try {
                const response = await getMyBookings(user.id)
                dispatch(setMyBookings(response.data))
            } catch (err) {
                dispatch(setError(err.message))
            } finally {
                dispatch(setLoading(false))
            }
        }

        fetchBookings()
    }, [user?.id, dispatch])

    const active = myBookings.filter(b => b.displayStatus === "ACTIVE")
    const awaitingOwner = myBookings.filter(b => b.displayStatus === "PENDING")
    const completed = myBookings.filter(b => b.displayStatus === "COMPLETED")
    const cancelled = myBookings.filter(b => b.displayStatus === "CANCELLED")

    if (loading) return <p>Loading your bookings...</p>
    if (error) return <p>Something went wrong: {error}</p>

    return <>
        <div className="bookings-body">
            <h1 className="absolute top-[80px] left-[390px] font-bold text-[30px]">My Bookings</h1>
            <div className="tabs-change-container absolute top-[150px] left-[385px] text-[#5650cc]">
                <Tabs defaultValue="active_upcoming">
                    <TabsList variant="line">
                        <TabsTrigger value="active_upcoming">Active</TabsTrigger>
                        <TabsTrigger value="awaiting_owner">Awaiting Owner</TabsTrigger>
                        <TabsTrigger value="completed">Completed</TabsTrigger>
                        <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
                    </TabsList>

                    <TabsContent value="active_upcoming" className="flex flex-col mt-[20px] gap-[24px]">
                        {activeUpcoming.map((booking) => (
                            <MyBookingsCard key={booking.bookingId} booking={booking} />
                        ))}

                        <Card className="relative mx-auto w-[800px] h-[170px] flex-col items-center justify-evenly bg-[#f0f0ff]">
                            <h1 className="text-[22px] font-bold relative top-[20px]">Need more gear?</h1>
                            <span className="text-[16px]">Explore thousands of premium electronics available in your area.</span>
                            <a href='#' className="text-[#5650cc] mb-[25px] flex gap-1 font-bold">
                                Browse Marketplace<ArrowRight />
                            </a>
                        </Card>
                    </TabsContent>

                    <TabsContent value="active" className="flex flex-col mt-[20px] gap-[24px]">
                        {active.map((booking) => (
                            <MyBookingsCard key={booking.bookingId} booking={booking} />
                        ))}
                    </TabsContent>

                    <TabsContent value="completed" className="flex flex-col mt-[20px] gap-[24px]">
                        {completed.map((booking) => (
                            <MyBookingsCard key={booking.bookingId} booking={booking} />
                        ))}
                    </TabsContent>

                    <TabsContent value="cancelled" className="flex flex-col mt-[20px] gap-[24px]">
                        {cancelled.map((booking) => (
                            <MyBookingsCard key={booking.bookingId} booking={booking} />
                        ))}
                    </TabsContent>

                    <TabsContent value="requested" className="flex flex-col mt-[20px] gap-[24px]">
                        {awaitingOwner.map((booking) => (
                            <MyBookingsCard key={booking.bookingId} booking={booking} />
                        ))}
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    </>
};

export default myBookings;