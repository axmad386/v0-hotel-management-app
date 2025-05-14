"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { CalendarIcon, Loader2 } from "lucide-react"
import { format } from "date-fns"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { toast } from "@/components/ui/use-toast"

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

const mockProperties = [
  { id: "prop1", name: "Seaside Resort" },
  { id: "prop2", name: "Mountain Lodge" },
  { id: "prop3", name: "City Center Hotel" },
]

const mockRooms = [
  { id: "room1", propertyId: "prop1", name: "Deluxe Ocean View", price: 250 },
  { id: "room2", propertyId: "prop1", name: "Standard Ocean View", price: 180 },
  { id: "room3", propertyId: "prop2", name: "Mountain Suite", price: 300 },
  { id: "room4", propertyId: "prop2", name: "Standard Mountain View", price: 220 },
  { id: "room5", propertyId: "prop3", name: "Executive Suite", price: 350 },
  { id: "room6", propertyId: "prop3", name: "Standard City View", price: 200 },
]

const mockGuests = [
  { id: "5678", name: "John Doe", email: "john.doe@example.com", phone: "+1 (555) 123-4567" },
  { id: "5679", name: "Jane Smith", email: "jane.smith@example.com", phone: "+1 (555) 987-6543" },
  { id: "5680", name: "Robert Johnson", email: "robert.johnson@example.com", phone: "+1 (555) 456-7890" },
]

const bookingFormSchema = z
  .object({
    guestId: z.string({
      required_error: "Please select a guest",
    }),
    propertyId: z.string({
      required_error: "Please select a property",
    }),
    roomId: z.string({
      required_error: "Please select a room",
    }),
    checkInDate: z.date({
      required_error: "Please select a check-in date",
    }),
    checkOutDate: z
      .date({
        required_error: "Please select a check-out date",
      })
      .refine((date) => date > new Date(), {
        message: "Check-out date must be in the future",
      }),
    adults: z.coerce
      .number()
      .min(1, {
        message: "At least 1 adult is required",
      })
      .max(10, {
        message: "Maximum 10 adults allowed",
      }),
    children: z.coerce.number().min(0).max(10, {
      message: "Maximum 10 children allowed",
    }),
    specialRequests: z.string().optional(),
    status: z.enum(["pending", "confirmed", "checked_in", "checked_out", "cancelled"]),
    paymentStatus: z.enum(["pending", "paid", "refunded", "failed"]),
  })
  .refine((data) => data.checkOutDate > data.checkInDate, {
    message: "Check-out date must be after check-in date",
    path: ["checkOutDate"],
  })

type BookingFormValues = z.infer<typeof bookingFormSchema>

export default function EditBookingPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [availableRooms, setAvailableRooms] = useState<typeof mockRooms>([])
  const [booking, setBooking] = useState<typeof mockBooking | null>(null)
  const [totalNights, setTotalNights] = useState(0)
  const [totalAmount, setTotalAmount] = useState(0)

  const form = useForm<BookingFormValues>({
    resolver: zodResolver(bookingFormSchema),
    defaultValues: {
      guestId: "",
      propertyId: "",
      roomId: "",
      checkInDate: new Date(),
      checkOutDate: new Date(new Date().setDate(new Date().getDate() + 1)),
      adults: 1,
      children: 0,
      specialRequests: "",
      status: "pending" as const,
      paymentStatus: "pending" as const,
    },
  })

  // Fetch booking data
  useEffect(() => {
    // In a real app, this would be an API call
    const fetchBooking = async () => {
      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000))

        // In a real app, you would fetch the booking data from an API
        // const response = await fetch(`/api/bookings/${params.id}`);
        // const data = await response.json();

        // Using mock data for now
        setBooking(mockBooking)

        // Set form values
        form.reset({
          guestId: mockBooking.guestId,
          propertyId: mockBooking.propertyId,
          roomId: mockBooking.roomId,
          checkInDate: new Date(mockBooking.checkInDate),
          checkOutDate: new Date(mockBooking.checkOutDate),
          adults: mockBooking.adults,
          children: mockBooking.children,
          specialRequests: mockBooking.specialRequests,
          status: mockBooking.status as any,
          paymentStatus: mockBooking.paymentStatus as any,
        })

        // Filter rooms for the selected property
        const filteredRooms = mockRooms.filter((room) => room.propertyId === mockBooking.propertyId)
        setAvailableRooms(filteredRooms)

        // Calculate total nights and amount
        const nights = calculateNights(new Date(mockBooking.checkInDate), new Date(mockBooking.checkOutDate))
        setTotalNights(nights)

        const selectedRoom = mockRooms.find((room) => room.id === mockBooking.roomId)
        if (selectedRoom) {
          setTotalAmount(selectedRoom.price * nights)
        }

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
  }, [params.id, form])

  // Update available rooms when property changes
  const onPropertyChange = (propertyId: string) => {
    const filteredRooms = mockRooms.filter((room) => room.propertyId === propertyId)
    setAvailableRooms(filteredRooms)
    form.setValue("roomId", "")
  }

  // Calculate total nights and amount when dates or room changes
  useEffect(() => {
    const checkInDate = form.watch("checkInDate")
    const checkOutDate = form.watch("checkOutDate")
    const roomId = form.watch("roomId")

    if (checkInDate && checkOutDate && roomId) {
      const nights = calculateNights(checkInDate, checkOutDate)
      setTotalNights(nights)

      const selectedRoom = mockRooms.find((room) => room.id === roomId)
      if (selectedRoom) {
        setTotalAmount(selectedRoom.price * nights)
      }
    }
  }, [form.watch("checkInDate"), form.watch("checkOutDate"), form.watch("roomId"), form])

  // Calculate nights between two dates
  const calculateNights = (checkIn: Date, checkOut: Date) => {
    const diffTime = Math.abs(checkOut.getTime() - checkIn.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  // Handle form submission
  async function onSubmit(data: BookingFormValues) {
    setIsSaving(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // In a real app, you would update the booking via an API
      // const response = await fetch(`/api/bookings/${params.id}`, {
      //   method: 'PUT',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(data),
      // });

      // if (!response.ok) throw new Error('Failed to update booking');

      toast({
        title: "Booking updated",
        description: "The booking has been updated successfully.",
      })

      // Navigate back to booking details
      router.push(`/dashboard/bookings/${params.id}`)
    } catch (error) {
      console.error("Error updating booking:", error)
      toast({
        title: "Error",
        description: "Failed to update booking. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSaving(false)
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

  return (
    <div className="container mx-auto py-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Edit Booking</h1>
          <p className="text-muted-foreground">Update the booking details for {booking?.guestName}</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={() => router.push(`/dashboard/bookings/${params.id}`)}>
            Cancel
          </Button>
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* Guest Information */}
            <Card>
              <CardHeader>
                <CardTitle>Guest Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="guestId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Guest</FormLabel>
                      <Select disabled={isSaving} onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a guest" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {mockGuests.map((guest) => (
                            <SelectItem key={guest.id} value={guest.id}>
                              {guest.name} ({guest.email})
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Display selected guest details */}
                {form.watch("guestId") && (
                  <div className="rounded-md bg-muted p-4">
                    <h4 className="mb-2 font-medium">Selected Guest Details</h4>
                    {(() => {
                      const selectedGuest = mockGuests.find((g) => g.id === form.watch("guestId"))
                      return selectedGuest ? (
                        <div className="space-y-1 text-sm">
                          <p>
                            <span className="font-medium">Name:</span> {selectedGuest.name}
                          </p>
                          <p>
                            <span className="font-medium">Email:</span> {selectedGuest.email}
                          </p>
                          <p>
                            <span className="font-medium">Phone:</span> {selectedGuest.phone}
                          </p>
                        </div>
                      ) : null
                    })()}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Booking Details */}
            <Card>
              <CardHeader>
                <CardTitle>Booking Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="propertyId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Property</FormLabel>
                      <Select
                        disabled={isSaving}
                        onValueChange={(value) => {
                          field.onChange(value)
                          onPropertyChange(value)
                        }}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a property" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {mockProperties.map((property) => (
                            <SelectItem key={property.id} value={property.id}>
                              {property.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="roomId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Room</FormLabel>
                      <Select
                        disabled={isSaving || !form.watch("propertyId")}
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a room" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {availableRooms.map((room) => (
                            <SelectItem key={room.id} value={room.id}>
                              {room.name} (${room.price}/night)
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="adults"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Adults</FormLabel>
                        <FormControl>
                          <Input type="number" min={1} max={10} disabled={isSaving} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="children"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Children</FormLabel>
                        <FormControl>
                          <Input type="number" min={0} max={10} disabled={isSaving} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Dates */}
            <Card>
              <CardHeader>
                <CardTitle>Dates</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="checkInDate"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Check-in Date</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className={`w-full pl-3 text-left font-normal ${!field.value ? "text-muted-foreground" : ""}`}
                                disabled={isSaving}
                              >
                                {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="checkOutDate"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Check-out Date</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className={`w-full pl-3 text-left font-normal ${!field.value ? "text-muted-foreground" : ""}`}
                                disabled={isSaving}
                              >
                                {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              disabled={(date) =>
                                date < new Date(new Date().setHours(0, 0, 0, 0)) ||
                                (form.watch("checkInDate") && date <= form.watch("checkInDate"))
                              }
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Display total nights and amount */}
                {totalNights > 0 && form.watch("roomId") && (
                  <div className="rounded-md bg-muted p-4">
                    <h4 className="mb-2 font-medium">Booking Summary</h4>
                    <div className="space-y-1 text-sm">
                      <p>
                        <span className="font-medium">Total Nights:</span> {totalNights}
                      </p>
                      <p>
                        <span className="font-medium">Room Rate:</span> $
                        {mockRooms.find((r) => r.id === form.watch("roomId"))?.price}/night
                      </p>
                      <Separator className="my-2" />
                      <p className="text-base font-bold">
                        <span>Total Amount:</span> ${totalAmount.toFixed(2)}
                      </p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Status and Special Requests */}
            <Card>
              <CardHeader>
                <CardTitle>Status and Requests</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="status"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Booking Status</FormLabel>
                        <Select disabled={isSaving} onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select status" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="pending">Pending</SelectItem>
                            <SelectItem value="confirmed">Confirmed</SelectItem>
                            <SelectItem value="checked_in">Checked In</SelectItem>
                            <SelectItem value="checked_out">Checked Out</SelectItem>
                            <SelectItem value="cancelled">Cancelled</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="paymentStatus"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Payment Status</FormLabel>
                        <Select disabled={isSaving} onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select payment status" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="pending">Pending</SelectItem>
                            <SelectItem value="paid">Paid</SelectItem>
                            <SelectItem value="refunded">Refunded</SelectItem>
                            <SelectItem value="failed">Failed</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="specialRequests"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Special Requests</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Enter any special requests or notes"
                          className="resize-none"
                          disabled={isSaving}
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>Add any special requests or notes for this booking.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
          </div>

          <div className="flex justify-end gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push(`/dashboard/bookings/${params.id}`)}
              disabled={isSaving}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSaving}>
              {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isSaving ? "Saving Changes..." : "Save Changes"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
