import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setMyBookings, setLoading, setError } from "@/redux/slices/bookingSlice"
import { getMyBookings } from "@/api/bookingApi"

import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowRight } from 'lucide-react'
import MyBookingsCard from "@/components/common/MyBookingsCard"

const MyBookings = () => {
    const dispatch = useDispatch()
    const { myBookings, loading, error } = useSelector((state) => state.booking)
    const { user } = useSelector((state) => state.auth)

    useEffect(() => {
        const userId = user?.id || user?.userId
        if (!userId) return

        const fetchBookings = async () => {
            dispatch(setLoading(true))
            try {
                const response = await getMyBookings(userId)
                dispatch(setMyBookings(response.data || []))
            } catch (err) {
                dispatch(setError(err.message))
            } finally {
                dispatch(setLoading(false))
            }
        }

        fetchBookings()
    }, [user?.id, user?.userId, dispatch])

    // Filter using status
    const awaitingOwner = myBookings.filter(
        (b) => b.status === "PENDING" || b.status === "ACCEPTED"
    )
    const active = myBookings.filter(
        (b) => b.status === "ACTIVE"
    )
    const completed = myBookings.filter(
        (b) => b.status === "COMPLETED"
    )

    if (loading) return <p className="text-center py-10">Loading your bookings...</p>
    if (error) return <p className="text-center py-10">Something went wrong: {error}</p>

    return (
        <div className="flex flex-col min-h-screen">
            <main className="flex-grow max-w-[1200px] w-full mx-auto px-6 py-8">
                <h1 className="font-bold text-[30px] mb-6">My Bookings</h1>

                <div className="tabs-change-container text-[#5650cc]">
                    <Tabs defaultValue="awaiting_owner">
                        <TabsList variant="line">
                            <TabsTrigger value="awaiting_owner">
                                Awaiting Owner / Payment ({awaitingOwner.length})
                            </TabsTrigger>
                            <TabsTrigger value="active_upcoming">
                                Active ({active.length})
                            </TabsTrigger>
                            <TabsTrigger value="completed">
                                Completed ({completed.length})
                            </TabsTrigger>
                        </TabsList>

                        {/* 1. Awaiting Owner / Payment Tab */}
                        <TabsContent value="awaiting_owner" className="flex flex-col mt-6 gap-6">
                            {awaitingOwner.length > 0 ? (
                                awaitingOwner.map((booking) => (
                                    <MyBookingsCard key={booking.bookingId} booking={booking} />
                                ))
                            ) : (
                                <p className="text-slate-500 text-center py-8">No pending requests awaiting approval or payment.</p>
                            )}
                        </TabsContent>

                        {/* 2. Active Tab */}
                        <TabsContent value="active_upcoming" className="flex flex-col mt-6 gap-6">
                            {active.length > 0 ? (
                                active.map((booking) => (
                                    <MyBookingsCard key={booking.bookingId} booking={booking} />
                                ))
                            ) : (
                                <p className="text-slate-500 text-center py-8">No active rentals right now.</p>
                            )}

                            <Card className="mx-auto w-full max-w-[800px] p-6 flex flex-col items-center justify-center bg-[#f0f0ff] gap-3">
                                <h2 className="text-[22px] font-bold">Need more gear?</h2>
                                <span className="text-[16px] text-center">Explore thousands of premium electronics available in your area.</span>
                                <a href='#' className="text-[#5650cc] flex items-center gap-1 font-bold">
                                    Browse Marketplace <ArrowRight className="w-4 h-4" />
                                </a>
                            </Card>
                        </TabsContent>

                        {/* 3. Completed Tab */}
                        <TabsContent value="completed" className="flex flex-col mt-6 gap-6">
                            {completed.length > 0 ? (
                                completed.map((booking) => (
                                    <MyBookingsCard key={booking.bookingId} booking={booking} />
                                ))
                            ) : (
                                <p className="text-slate-500 text-center py-8">No completed bookings yet.</p>
                            )}
                        </TabsContent>
                    </Tabs>
                </div>
            </main>
        </div>
    )
}

export default MyBookings