"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import {
  CalendarClock,
  CreditCard,
  Edit,
  FileText,
  Loader2,
  LogIn,
  LogOut,
  MoreHorizontal,
  Trash,
  User,
} from "lucide-react"
import { format } from "date-fns"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Separator } from "@/components/ui/separator"
import { toast } from "@/components/ui/use-toast"
import { ConfirmDialog } from "@/components/confirm-dialog"

// Mock data - would be replaced with actual API calls
const mockBooking = {
  id: "1234",
  guestId: "5678",
  guestName: "John Doe",
  guestEmail: "john.doe@example.com",
  guestPhone: "+1 (555) 123-4567",
  propertyId: "prop1",
  propertyName: "Seaside Resort",
  roomId: "room1",
  roomName: "Deluxe Ocean View",
  checkInDate: new Date("2023-06-15"),
  checkOutDate: new Date("2023-06-20"),
  adults: 2,
  children: 1,
  totalAmount: 1250.0,
  status: "confirmed",
  paymentStatus: "paid",
  specialRequests: "Late check-in, around 10 PM. Extra pillows please.",
  createdAt: new Date("2023-05-10"),
}

export default function BookingDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [booking, setBooking] = useState<typeof mockBooking | null>(null)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  // Fetch booking data
  useEffect(() => {
    const fetchBooking = async () => {
      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000))

        // In a real app, you would fetch the booking data from an API
        // const response = await fetch(`/api/bookings/${params.id}`)
        // const data = await response.json()

        // Using mock data for now
        setBooking(mockBooking)
        setIsLoading(false)
      } catch (error) {
        console.error("Error fetching booking:", error)
        toast({
          title: "Error",
          description: "Failed to load booking details. Please try again.",
          variant: "destructive",
        })
        setIsLoading(false)
      }
    }

    fetchBooking()
  }, [params.id])

  // Calculate total nights
  const calculateNights = (checkIn: Date, checkOut: Date) => {
    const diffTime = Math.abs(checkOut.getTime() - checkIn.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  // Handle booking deletion
  const handleDeleteBooking = async () => {
    setIsDeleting(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // In a real app, you would delete the booking via an API
      // const response = await fetch(`/api/bookings/${params.id}`, {
      //   method: 'DELETE',
      // })

      // if (!response.ok) throw new Error('Failed to delete booking')

      toast({
        title: "Booking deleted",
        description: "The booking has been deleted successfully.",
      })

      // Navigate back to bookings list
      router.push("/dashboard/bookings")
    } catch (error) {
      console.error("Error deleting booking:", error)
      toast({
        title: "Error",
        description: "Failed to delete booking. Please try again.",
        variant: "destructive",
      })
      setIsDeleting(false)
      setIsDeleteDialogOpen(false)
    }
  }

  // Get status badge variant
  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "confirmed":
        return "outline"
      case "checked_in":
        return "default"
      case "checked_out":
        return "secondary"
      case "cancelled":
        return "destructive"
      default:
        return "outline"
    }
  }

  // Get payment status badge variant
  const getPaymentStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "paid":
        return "success"
      case "pending":
        return "warning"
      case "refunded":
        return "secondary"
      case "failed":
        return "destructive"
      default:
        return "outline"
    }
  }

  if (isLoading) {
    return (
      <div className="flex h-[calc(100vh-4rem)] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2 text-lg">Loading booking details...</span>
      </div>
    )
  }

  if (!booking) {
    return (
      <div className="flex h-[calc(100vh-4rem)] flex-col items-center justify-center">
        <h2 className="text-2xl font-bold">Booking Not Found</h2>
        <p className="text-muted-foreground mb-4">The booking you're looking for doesn't exist or has been removed.</p>
        <Button asChild>
          <Link href="/dashboard/bookings">Back to Bookings</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Booking Details</h1>
          <p className="text-muted-foreground">
            Booking #{booking.id} for {booking.guestName}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button asChild variant="outline">
            <Link href="/dashboard/bookings">Back to Bookings</Link>
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild>
                <Link href={`/dashboard/bookings/(id)/${params.id}/edit`}>
                  <Edit className="mr-2 h-4 w-4" />
                  Edit Booking
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href={`/dashboard/bookings/(id)/${params.id}/check-in`}>
                  <LogIn className="mr-2 h-4 w-4" />
                  Check In
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href={`/dashboard/bookings/(id)/${params.id}/check-out`}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Check Out
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href={`/dashboard/bookings/(id)/${params.id}/invoice`}>
                  <FileText className="mr-2 h-4 w-4" />
                  View Invoice
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="text-destructive focus:text-destructive"
                onClick={() => setIsDeleteDialogOpen(true)}
              >
                <Trash className="mr-2 h-4 w-4" />
                Delete Booking
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="md:col-span-2">
          <Tabs defaultValue="details">
            <TabsList className="mb-4">
              <TabsTrigger value="details">Booking Details</TabsTrigger>
              <TabsTrigger value="guest">Guest Information</TabsTrigger>
              <TabsTrigger value="payment">Payment</TabsTrigger>
            </TabsList>

            <TabsContent value="details" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Reservation Details</CardTitle>
                  <CardDescription>Booking created on {format(booking.createdAt, "PPP")}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <h3 className="font-medium text-sm text-muted-foreground mb-2">Booking ID</h3>
                      <p>{booking.id}</p>
                    </div>
                    <div>
                      <h3 className="font-medium text-sm text-muted-foreground mb-2">Status</h3>
                      <Badge variant={getStatusBadgeVariant(booking.status)}>
                        {booking.status.charAt(0).toUpperCase() + booking.status.slice(1).replace("_", " ")}
                      </Badge>
                    </div>
                    <div>
                      <h3 className="font-medium text-sm text-muted-foreground mb-2">Property</h3>
                      <p>{booking.propertyName}</p>
                    </div>
                    <div>
                      <h3 className="font-medium text-sm text-muted-foreground mb-2">Room</h3>
                      <p>{booking.roomName}</p>
                    </div>
                    <div>
                      <h3 className="font-medium text-sm text-muted-foreground mb-2">Check-in Date</h3>
                      <p>{format(booking.checkInDate, "PPP")}</p>
                    </div>
                    <div>
                      <h3 className="font-medium text-sm text-muted-foreground mb-2">Check-out Date</h3>
                      <p>{format(booking.checkOutDate, "PPP")}</p>
                    </div>
                    <div>
                      <h3 className="font-medium text-sm text-muted-foreground mb-2">Nights</h3>
                      <p>{calculateNights(booking.checkInDate, booking.checkOutDate)}</p>
                    </div>
                    <div>
                      <h3 className="font-medium text-sm text-muted-foreground mb-2">Guests</h3>
                      <p>
                        {booking.adults} Adults, {booking.children} Children
                      </p>
                    </div>
                  </div>

                  <Separator className="my-4" />

                  <div>
                    <h3 className="font-medium text-sm text-muted-foreground mb-2">Special Requests</h3>
                    <p className="whitespace-pre-line">{booking.specialRequests || "No special requests"}</p>
                  </div>
                </CardContent>
              </Card>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild className="flex-1">
                  <Link href={`/dashboard/bookings/(id)/${params.id}/check-in`}>
                    <LogIn className="mr-2 h-4 w-4" />
                    Check In
                  </Link>
                </Button>
                <Button asChild className="flex-1">
                  <Link href={`/dashboard/bookings/(id)/${params.id}/check-out`}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Check Out
                  </Link>
                </Button>
                <Button asChild variant="outline" className="flex-1">
                  <Link href={`/dashboard/bookings/(id)/${params.id}/edit`}>
                    <Edit className="mr-2 h-4 w-4" />
                    Edit Booking
                  </Link>
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="guest" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Guest Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <h3 className="font-medium text-sm text-muted-foreground mb-2">Name</h3>
                      <p>{booking.guestName}</p>
                    </div>
                    <div>
                      <h3 className="font-medium text-sm text-muted-foreground mb-2">Guest ID</h3>
                      <p>{booking.guestId}</p>
                    </div>
                    <div>
                      <h3 className="font-medium text-sm text-muted-foreground mb-2">Email</h3>
                      <p>{booking.guestEmail}</p>
                    </div>
                    <div>
                      <h3 className="font-medium text-sm text-muted-foreground mb-2">Phone</h3>
                      <p>{booking.guestPhone}</p>
                    </div>
                  </div>

                  <div className="mt-4">
                    <Button asChild variant="outline">
                      <Link href={`/dashboard/guests/${booking.guestId}`}>
                        <User className="mr-2 h-4 w-4" />
                        View Guest Profile
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="payment" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Payment Details</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <h3 className="font-medium text-sm text-muted-foreground mb-2">Payment Status</h3>
                      <Badge variant={getPaymentStatusBadgeVariant(booking.paymentStatus)}>
                        {booking.paymentStatus.charAt(0).toUpperCase() + booking.paymentStatus.slice(1)}
                      </Badge>
                    </div>
                    <div>
                      <h3 className="font-medium text-sm text-muted-foreground mb-2">Total Amount</h3>
                      <p className="text-lg font-bold">${booking.totalAmount.toFixed(2)}</p>
                    </div>
                  </div>

                  <Separator className="my-4" />

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Room Charge ({calculateNights(booking.checkInDate, booking.checkOutDate)} nights)</span>
                      <span>${(booking.totalAmount * 0.85).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Taxes</span>
                      <span>${(booking.totalAmount * 0.15).toFixed(2)}</span>
                    </div>
                    <Separator className="my-2" />
                    <div className="flex justify-between font-bold">
                      <span>Total</span>
                      <span>${booking.totalAmount.toFixed(2)}</span>
                    </div>
                  </div>

                  <div className="mt-4">
                    <Button asChild>
                      <Link href={`/dashboard/bookings/(id)/${params.id}/invoice`}>
                        <FileText className="mr-2 h-4 w-4" />
                        View Invoice
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button asChild className="w-full justify-start">
                <Link href={`/dashboard/bookings/(id)/${params.id}/edit`}>
                  <Edit className="mr-2 h-4 w-4" />
                  Edit Booking
                </Link>
              </Button>
              <Button asChild className="w-full justify-start">
                <Link href={`/dashboard/bookings/(id)/${params.id}/check-in`}>
                  <LogIn className="mr-2 h-4 w-4" />
                  Check In
                </Link>
              </Button>
              <Button asChild className="w-full justify-start">
                <Link href={`/dashboard/bookings/(id)/${params.id}/check-out`}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Check Out
                </Link>
              </Button>
              <Button asChild className="w-full justify-start">
                <Link href={`/dashboard/bookings/(id)/${params.id}/invoice`}>
                  <FileText className="mr-2 h-4 w-4" />
                  View Invoice
                </Link>
              </Button>
              <Button
                variant="destructive"
                className="w-full justify-start"
                onClick={() => setIsDeleteDialogOpen(true)}
              >
                <Trash className="mr-2 h-4 w-4" />
                Delete Booking
              </Button>
            </CardContent>
          </Card>

          <Card className="mt-4">
            <CardHeader>
              <CardTitle>Booking Timeline</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex">
                  <div className="mr-4 flex h-10 w-10 items-center justify-center rounded-full border">
                    <CalendarClock className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-medium">Booking Created</p>
                    <p className="text-sm text-muted-foreground">{format(booking.createdAt, "PPP")}</p>
                  </div>
                </div>

                <div className="flex">
                  <div className="mr-4 flex h-10 w-10 items-center justify-center rounded-full border">
                    <CreditCard className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-medium">Payment {booking.paymentStatus}</p>
                    <p className="text-sm text-muted-foreground">
                      {format(new Date(booking.createdAt.getTime() + 1000 * 60 * 5), "PPP")}
                    </p>
                  </div>
                </div>

                <div className="flex">
                  <div className="mr-4 flex h-10 w-10 items-center justify-center rounded-full border">
                    <LogIn className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-medium">Check-in Date</p>
                    <p className="text-sm text-muted-foreground">{format(booking.checkInDate, "PPP")}</p>
                  </div>
                </div>

                <div className="flex">
                  <div className="mr-4 flex h-10 w-10 items-center justify-center rounded-full border">
                    <LogOut className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-medium">Check-out Date</p>
                    <p className="text-sm text-muted-foreground">{format(booking.checkOutDate, "PPP")}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <ConfirmDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        title="Delete Booking"
        description="Are you sure you want to delete this booking? This action cannot be undone."
        onConfirm={handleDeleteBooking}
        loading={isDeleting}
      />
    </div>
  )
}
