import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setMyBookings, setLoading, setError } from "@/redux/slices/bookingSlice"
import { getMyBookings } from "@/api/bookingApi"

import Navbar from "@/components/common/Navbar"
import Footer from "@/components/common/Footer"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowRight } from 'lucide-react'
import LazyImage from '@/components/common/LazyImage'
import MyBookingsCard from "@/components/common/MyBookingsCard"

const MyBookings = () => {
    const dispatch = useDispatch()
    const { myBookings, loading, error } = useSelector((state) => state.booking)
    const { user } = useSelector((state) => state.auth)

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

    if (loading) return <p className="text-center py-10">Loading your bookings...</p>
    if (error) return <p className="text-center py-10">Something went wrong: {error}</p>

    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />

            <main className="flex-grow max-w-[1200px] w-full mx-auto px-6 py-8">
                <h1 className="font-bold text-[30px] mb-6">My Bookings</h1>

                <div className="tabs-change-container text-[#5650cc]">
                    <Tabs defaultValue="active_upcoming">
                        <TabsList variant="line">
                            <TabsTrigger value="active_upcoming">Active</TabsTrigger>
                            <TabsTrigger value="awaiting_owner">Awaiting Owner</TabsTrigger>
                            <TabsTrigger value="completed">Completed</TabsTrigger>
                        </TabsList>

                        <TabsContent value="active_upcoming" className="flex flex-col mt-6 gap-6">
                            {active.map((booking) => (
                                <MyBookingsCard key={booking.bookingId} booking={booking} />
                            ))}

                            <Card className="mx-auto w-full max-w-[800px] p-6 flex flex-col items-center justify-center bg-[#f0f0ff] gap-3">
                                <h2 className="text-[22px] font-bold">Need more gear?</h2>
                                <span className="text-[16px] text-center">Explore thousands of premium electronics available in your area.</span>
                                <a href='#' className="text-[#5650cc] flex items-center gap-1 font-bold">
                                    Browse Marketplace <ArrowRight className="w-4 h-4" />
                                </a>
                            </Card>
                        </TabsContent>

                        <TabsContent value="awaiting_owner" className="flex flex-col mt-6 gap-6">
                            {awaitingOwner.map((booking) => (
                                <MyBookingsCard key={booking.bookingId} booking={booking} />
                            ))}
                        </TabsContent>

                        <TabsContent value="completed" className="flex flex-col mt-6 gap-6">
                            {completed.map((booking) => (
                                <MyBookingsCard key={booking.bookingId} booking={booking} />
                            ))}
                        </TabsContent>
                    </Tabs>
                </div>
            </main>

            <Footer />
        </div>
    )
};

export default MyBookings;