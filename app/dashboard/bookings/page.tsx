import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Calendar, MoreHorizontal, Plus } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function BookingsPage() {
  // Sample data for bookings
  const bookings = [
    {
      id: "1",
      guest: "John Smith",
      property: "Grand Hotel",
      room: "101",
      checkIn: "2025-05-15",
      checkOut: "2025-05-18",
      status: "confirmed",
      payment: "paid",
    },
    {
      id: "2",
      guest: "Jane Doe",
      property: "Grand Hotel",
      room: "201",
      checkIn: "2025-05-16",
      checkOut: "2025-05-20",
      status: "confirmed",
      payment: "pending",
    },
    {
      id: "3",
      guest: "Robert Johnson",
      property: "City Boarding House",
      room: "A2",
      checkIn: "2025-05-14",
      checkOut: "2025-06-14",
      status: "checked-in",
      payment: "paid",
    },
    {
      id: "4",
      guest: "Emily Wilson",
      property: "Beach Resort",
      room: "105",
      checkIn: "2025-05-20",
      checkOut: "2025-05-25",
      status: "confirmed",
      payment: "paid",
    },
    {
      id: "5",
      guest: "Michael Brown",
      property: "Grand Hotel",
      room: "301",
      checkIn: "2025-05-18",
      checkOut: "2025-05-21",
      status: "cancelled",
      payment: "refunded",
    },
    {
      id: "6",
      guest: "Sarah Davis",
      property: "City Boarding House",
      room: "B1",
      checkIn: "2025-05-15",
      checkOut: "2025-05-30",
      status: "checked-in",
      payment: "paid",
    },
  ]

  // Format date to display in a more readable format
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
  }

  return (
    <div className="flex flex-col gap-4 p-4 md:gap-8 md:p-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Bookings</h1>
        <Button asChild>
          <Link href="/dashboard/bookings/new">
            <Plus className="mr-2 h-4 w-4" />
            New Booking
          </Link>
        </Button>
      </div>
      <div className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Bookings</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">128</div>
              <p className="text-xs text-muted-foreground">This month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Upcoming Check-ins</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">24</div>
              <p className="text-xs text-muted-foreground">Next 7 days</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Current Stays</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">75</div>
              <p className="text-xs text-muted-foreground">Active bookings</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Upcoming Check-outs</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">18</div>
              <p className="text-xs text-muted-foreground">Next 7 days</p>
            </CardContent>
          </Card>
        </div>
        <Card>
          <CardHeader className="space-y-0">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>All Bookings</CardTitle>
                <CardDescription>Manage your bookings and view their details</CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <Select defaultValue="all">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="confirmed">Confirmed</SelectItem>
                    <SelectItem value="checked-in">Checked In</SelectItem>
                    <SelectItem value="checked-out">Checked Out</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Guest</TableHead>
                  <TableHead>Property</TableHead>
                  <TableHead>Room</TableHead>
                  <TableHead>Check-in</TableHead>
                  <TableHead>Check-out</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Payment</TableHead>
                  <TableHead className="w-[50px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {bookings.map((booking) => (
                  <TableRow key={booking.id}>
                    <TableCell className="font-medium">
                      <Link href={`/dashboard/bookings/${booking.id}`} className="hover:underline">
                        {booking.guest}
                      </Link>
                    </TableCell>
                    <TableCell>{booking.property}</TableCell>
                    <TableCell>{booking.room}</TableCell>
                    <TableCell>{formatDate(booking.checkIn)}</TableCell>
                    <TableCell>{formatDate(booking.checkOut)}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          booking.status === "confirmed"
                            ? "outline"
                            : booking.status === "checked-in"
                              ? "default"
                              : booking.status === "checked-out"
                                ? "secondary"
                                : "destructive"
                        }
                      >
                        {booking.status
                          .split("-")
                          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                          .join(" ")}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          booking.payment === "paid"
                            ? "default"
                            : booking.payment === "pending"
                              ? "outline"
                              : "secondary"
                        }
                      >
                        {booking.payment.charAt(0).toUpperCase() + booking.payment.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Actions</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem asChild>
                            <Link href={`/dashboard/bookings/${booking.id}`}>View Details</Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link href={`/dashboard/bookings/${booking.id}/edit`}>Edit Booking</Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link href={`/dashboard/bookings/${booking.id}/invoice`}>View Invoice</Link>
                          </DropdownMenuItem>
                          {booking.status === "confirmed" && (
                            <DropdownMenuItem asChild>
                              <Link href={`/dashboard/bookings/${booking.id}/check-in`}>Check In</Link>
                            </DropdownMenuItem>
                          )}
                          {booking.status === "checked-in" && (
                            <DropdownMenuItem asChild>
                              <Link href={`/dashboard/bookings/${booking.id}/check-out`}>Check Out</Link>
                            </DropdownMenuItem>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
