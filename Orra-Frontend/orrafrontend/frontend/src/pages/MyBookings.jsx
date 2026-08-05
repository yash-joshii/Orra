import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { setMyBookings, setLoading, setError } from "@/redux/slices/bookingSlice"
import { getMyBookings } from "@/api/bookingApi"

import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowRight, AlertCircle } from 'lucide-react'
import MyBookingsCard from "@/components/common/MyBookingsCard"
import LogoLoader from "@/components/common/LogoLoader"

const MyBookings = () => {
    const dispatch = useDispatch()
    const { myBookings = [], loading, error } = useSelector((state) => state.booking)
    const { user } = useSelector((state) => state.auth)

    useEffect(() => {
        const userId = user?.id || user?.userId
        if (!userId) return

        const fetchBookings = async () => {
            dispatch(setLoading(true))
            try {
                const response = await getMyBookings(userId)
                dispatch(setMyBookings(response?.data || []))
            } catch (err) {
                dispatch(setError(err.message))
            } finally {
                dispatch(setLoading(false))
            }
        }

        fetchBookings()
    }, [user?.id, user?.userId, dispatch])

    // Filter using status safely
    const bookingList = Array.isArray(myBookings) ? myBookings : []
    const awaitingOwner = bookingList.filter(
        (b) => b.status === "PENDING" || b.status === "ACCEPTED"
    )
    const active = bookingList.filter(
        (b) => b.status === "ACTIVE"
    )
    const completed = bookingList.filter(
        (b) => b.status === "COMPLETED"
    )

    if (loading && bookingList.length === 0) {
        return (
            <div className="min-h-[70vh] flex items-center justify-center">
                <LogoLoader />
            </div>
        )
    }

    if (error) {
        return (
            <div className="max-w-md mx-auto my-20 p-8 bg-white rounded-3xl border border-rose-100 shadow-xs text-center space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 border border-rose-100 flex items-center justify-center mx-auto">
                    <AlertCircle className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-slate-900 text-base">Failed to load bookings</h3>
                <p className="text-xs text-slate-500">{error}</p>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col">
            <main className="flex-grow max-w-[1200px] w-full mx-auto px-6 py-12 space-y-8">
                
                {/* Header */}
                <div>
                    <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
                        My Bookings
                    </h1>
                    <p className="text-sm text-slate-500 font-medium mt-1">
                        Track your current rentals, pending approvals, and past history.
                    </p>
                </div>

                {/* Tabs Container */}
                <div className="w-full">
                    <Tabs defaultValue="awaiting_owner">
                        <TabsList className="bg-white border border-slate-200/80 p-1 rounded-2xl shadow-xs">
                            <TabsTrigger value="awaiting_owner" className="rounded-xl text-xs font-bold">
                                Awaiting Owner / Payment ({awaitingOwner.length})
                            </TabsTrigger>
                            <TabsTrigger value="active_upcoming" className="rounded-xl text-xs font-bold">
                                Active ({active.length})
                            </TabsTrigger>
                            <TabsTrigger value="completed" className="rounded-xl text-xs font-bold">
                                Completed ({completed.length})
                            </TabsTrigger>
                        </TabsList>

                        {/* 1. Awaiting Owner / Payment Tab */}
                        <TabsContent value="awaiting_owner" className="flex flex-col mt-6 gap-4">
                            {awaitingOwner.length > 0 ? (
                                awaitingOwner.map((booking) => (
                                    <MyBookingsCard key={booking.bookingId} booking={booking} />
                                ))
                            ) : (
                                <div className="text-center py-16 bg-white rounded-3xl border border-slate-200/80 shadow-xs p-8 space-y-2">
                                    <p className="text-sm font-semibold text-slate-700">No pending requests</p>
                                    <p className="text-xs text-slate-400">You have no requests awaiting owner approval or payment.</p>
                                </div>
                            )}
                        </TabsContent>

                        {/* 2. Active Tab */}
                        <TabsContent value="active_upcoming" className="flex flex-col mt-6 gap-4">
                            {active.length > 0 ? (
                                active.map((booking) => (
                                    <MyBookingsCard key={booking.bookingId} booking={booking} />
                                ))
                            ) : (
                                <div className="text-center py-16 bg-white rounded-3xl border border-slate-200/80 shadow-xs p-8 space-y-2">
                                    <p className="text-sm font-semibold text-slate-700">No active rentals right now</p>
                                    <p className="text-xs text-slate-400">Your active equipment rentals will appear here.</p>
                                </div>
                            )}

                            {/* Promotional Card */}
                            <Card className="rounded-3xl border border-indigo-100 bg-gradient-to-br from-indigo-50/80 to-slate-50 shadow-xs overflow-hidden mt-4">
                                <CardContent className="p-8 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
                                    <div className="space-y-1">
                                        <h2 className="text-lg font-bold text-slate-900 tracking-tight">Need more gear?</h2>
                                        <p className="text-xs text-slate-600 font-medium">
                                            Explore thousands of premium electronics available in your area.
                                        </p>
                                    </div>
                                    <Link
                                        to="/browserdevices"
                                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition-all shadow-xs shrink-0"
                                    >
                                        <span>Browse Marketplace</span>
                                        <ArrowRight className="w-3.5 h-3.5" />
                                    </Link>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        {/* 3. Completed Tab */}
                        <TabsContent value="completed" className="flex flex-col mt-6 gap-4">
                            {completed.length > 0 ? (
                                completed.map((booking) => (
                                    <MyBookingsCard key={booking.bookingId} booking={booking} />
                                ))
                            ) : (
                                <div className="text-center py-16 bg-white rounded-3xl border border-slate-200/80 shadow-xs p-8 space-y-2">
                                    <p className="text-sm font-semibold text-slate-700">No completed bookings yet</p>
                                    <p className="text-xs text-slate-400">Past completed rental orders will be archived here.</p>
                                </div>
                            )}
                        </TabsContent>
                    </Tabs>
                </div>

            </main>
        </div>
    )
}

export default MyBookings