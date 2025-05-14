"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Eye, MoreHorizontal, Pencil, Plus, Trash } from "lucide-react"
import { DataTable } from "@/components/data-table/data-table"
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

// Sample data for bookings
const bookingsData = [
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
  {
    id: "7",
    guest: "David Wilson",
    property: "Beach Resort",
    room: "106",
    checkIn: "2025-05-22",
    checkOut: "2025-05-26",
    status: "confirmed",
    payment: "pending",
  },
  {
    id: "8",
    guest: "Jennifer Lee",
    property: "Grand Hotel",
    room: "202",
    checkIn: "2025-05-19",
    checkOut: "2025-05-22",
    status: "confirmed",
    payment: "paid",
  },
  {
    id: "9",
    guest: "Thomas Moore",
    property: "City Boarding House",
    room: "A3",
    checkIn: "2025-05-16",
    checkOut: "2025-06-16",
    status: "checked-in",
    payment: "paid",
  },
  {
    id: "10",
    guest: "Lisa Johnson",
    property: "Beach Resort",
    room: "107",
    checkIn: "2025-05-25",
    checkOut: "2025-05-30",
    status: "confirmed",
    payment: "pending",
  },
  {
    id: "11",
    guest: "James Wilson",
    property: "Grand Hotel",
    room: "302",
    checkIn: "2025-05-17",
    checkOut: "2025-05-19",
    status: "checked-out",
    payment: "paid",
  },
  {
    id: "12",
    guest: "Patricia Brown",
    property: "City Boarding House",
    room: "B2",
    checkIn: "2025-05-18",
    checkOut: "2025-05-25",
    status: "checked-in",
    payment: "paid",
  },
]

export default function BookingsPage() {
  const router = useRouter()
  const [bookings, setBookings] = useState(bookingsData)

  // Format date to display in a more readable format
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
  }

  const handleDelete = (id: string) => {
    setBookings(bookings.filter((booking) => booking.id !== id))
  }

  const columns = [
    {
      accessorKey: "guest",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Guest" />,
      cell: ({ row }) => (
        <div className="font-medium">
          <Link href={`/dashboard/bookings/${row.original.id}`} className="hover:underline">
            {row.getValue("guest")}
          </Link>
        </div>
      ),
    },
    {
      accessorKey: "property",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Property" />,
      filterFn: (row, id, value) => {
        return value.includes(row.getValue(id))
      },
    },
    {
      accessorKey: "room",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Room" />,
    },
    {
      accessorKey: "checkIn",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Check-in" />,
      cell: ({ row }) => formatDate(row.getValue("checkIn")),
    },
    {
      accessorKey: "checkOut",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Check-out" />,
      cell: ({ row }) => formatDate(row.getValue("checkOut")),
    },
    {
      accessorKey: "status",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Status" />,
      cell: ({ row }) => {
        const status = row.getValue("status") as string
        return (
          <Badge
            variant={
              status === "confirmed"
                ? "outline"
                : status === "checked-in"
                  ? "default"
                  : status === "checked-out"
                    ? "secondary"
                    : "destructive"
            }
          >
            {status
              .split("-")
              .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
              .join(" ")}
          </Badge>
        )
      },
      filterFn: (row, id, value) => {
        return value.includes(row.getValue(id))
      },
    },
    {
      accessorKey: "payment",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Payment" />,
      cell: ({ row }) => {
        const payment = row.getValue("payment") as string
        return (
          <Badge variant={payment === "paid" ? "default" : payment === "pending" ? "outline" : "secondary"}>
            {payment.charAt(0).toUpperCase() + payment.slice(1)}
          </Badge>
        )
      },
      filterFn: (row, id, value) => {
        return value.includes(row.getValue(id))
      },
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const booking = row.original

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreHorizontal className="h-4 w-4" />
                <span className="sr-only">Actions</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild>
                <Link href={`/dashboard/bookings/${booking.id}`}>
                  <Eye className="mr-2 h-4 w-4" />
                  View Details
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href={`/dashboard/bookings/${booking.id}/edit`}>
                  <Pencil className="mr-2 h-4 w-4" />
                  Edit Booking
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href={`/dashboard/bookings/${booking.id}/invoice`}>
                  <Calendar className="mr-2 h-4 w-4" />
                  View Invoice
                </Link>
              </DropdownMenuItem>
              {booking.status === "confirmed" && (
                <DropdownMenuItem asChild>
                  <Link href={`/dashboard/bookings/${booking.id}/check-in`}>
                    <Calendar className="mr-2 h-4 w-4" />
                    Check In
                  </Link>
                </DropdownMenuItem>
              )}
              {booking.status === "checked-in" && (
                <DropdownMenuItem asChild>
                  <Link href={`/dashboard/bookings/${booking.id}/check-out`}>
                    <Calendar className="mr-2 h-4 w-4" />
                    Check Out
                  </Link>
                </DropdownMenuItem>
              )}
              <DropdownMenuItem>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <div className="flex w-full items-center text-destructive cursor-pointer">
                      <Trash className="mr-2 h-4 w-4" />
                      Delete Booking
                    </div>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Delete Booking</AlertDialogTitle>
                      <AlertDialogDescription>
                        Are you sure you want to delete the booking for {booking.guest}? This action cannot be undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={() => handleDelete(booking.id)}>Delete</AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
    },
  ]

  return (
    <div className="flex flex-col gap-4 p-4 md:gap-8 md:p-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Bookings</h1>
        <Button asChild>
          <Link href="/dashboard/create-booking">
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
              <div className="text-2xl font-bold">{bookings.length}</div>
              <p className="text-xs text-muted-foreground">This month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Upcoming Check-ins</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{bookings.filter((b) => b.status === "confirmed").length}</div>
              <p className="text-xs text-muted-foreground">Next 7 days</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Current Stays</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{bookings.filter((b) => b.status === "checked-in").length}</div>
              <p className="text-xs text-muted-foreground">Active bookings</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Upcoming Check-outs</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{bookings.filter((b) => b.status === "checked-in").length}</div>
              <p className="text-xs text-muted-foreground">Next 7 days</p>
            </CardContent>
          </Card>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>All Bookings</CardTitle>
            <CardDescription>Manage your bookings and view their details</CardDescription>
          </CardHeader>
          <CardContent>
            <DataTable columns={columns} data={bookings} searchPlaceholder="Search bookings..." />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
