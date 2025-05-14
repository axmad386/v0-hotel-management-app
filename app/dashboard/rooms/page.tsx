import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Hotel, MoreHorizontal, Plus } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function RoomsPage() {
  // Sample data for rooms
  const rooms = [
    {
      id: "1",
      number: "101",
      type: "Standard",
      property: "Grand Hotel",
      capacity: 2,
      rate: "$120",
      status: "occupied",
    },
    {
      id: "2",
      number: "102",
      type: "Standard",
      property: "Grand Hotel",
      capacity: 2,
      rate: "$120",
      status: "available",
    },
    {
      id: "3",
      number: "201",
      type: "Deluxe",
      property: "Grand Hotel",
      capacity: 3,
      rate: "$180",
      status: "occupied",
    },
    {
      id: "4",
      number: "301",
      type: "Suite",
      property: "Grand Hotel",
      capacity: 4,
      rate: "$250",
      status: "maintenance",
    },
    {
      id: "5",
      number: "A1",
      type: "Single",
      property: "City Boarding House",
      capacity: 1,
      rate: "$50",
      status: "available",
    },
    {
      id: "6",
      number: "A2",
      type: "Double",
      property: "City Boarding House",
      capacity: 2,
      rate: "$80",
      status: "occupied",
    },
    {
      id: "7",
      number: "B1",
      type: "Single",
      property: "City Boarding House",
      capacity: 1,
      rate: "$50",
      status: "available",
    },
  ]

  return (
    <div className="flex flex-col gap-4 p-4 md:gap-8 md:p-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Rooms</h1>
        <Button asChild>
          <Link href="/dashboard/rooms/new">
            <Plus className="mr-2 h-4 w-4" />
            Add Room
          </Link>
        </Button>
      </div>
      <div className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Rooms</CardTitle>
              <Hotel className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">114</div>
              <p className="text-xs text-muted-foreground">Across all properties</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Available Rooms</CardTitle>
              <Hotel className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">34</div>
              <p className="text-xs text-muted-foreground">Ready for booking</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Occupied Rooms</CardTitle>
              <Hotel className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">75</div>
              <p className="text-xs text-muted-foreground">Currently occupied</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Maintenance</CardTitle>
              <Hotel className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">5</div>
              <p className="text-xs text-muted-foreground">Under maintenance</p>
            </CardContent>
          </Card>
        </div>
        <Card>
          <CardHeader className="space-y-0">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>All Rooms</CardTitle>
                <CardDescription>Manage your rooms and view their details</CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <Select defaultValue="all">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by property" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Properties</SelectItem>
                    <SelectItem value="grand-hotel">Grand Hotel</SelectItem>
                    <SelectItem value="city-boarding">City Boarding House</SelectItem>
                    <SelectItem value="beach-resort">Beach Resort</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Room #</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Property</TableHead>
                  <TableHead>Capacity</TableHead>
                  <TableHead>Rate</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="w-[50px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rooms.map((room) => (
                  <TableRow key={room.id}>
                    <TableCell className="font-medium">
                      <Link href={`/dashboard/rooms/${room.id}`} className="hover:underline">
                        {room.number}
                      </Link>
                    </TableCell>
                    <TableCell>{room.type}</TableCell>
                    <TableCell>{room.property}</TableCell>
                    <TableCell>
                      {room.capacity} person{room.capacity > 1 ? "s" : ""}
                    </TableCell>
                    <TableCell>{room.rate}/night</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          room.status === "available" ? "default" : room.status === "occupied" ? "secondary" : "outline"
                        }
                      >
                        {room.status.charAt(0).toUpperCase() + room.status.slice(1)}
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
                            <Link href={`/dashboard/rooms/${room.id}`}>View Details</Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link href={`/dashboard/rooms/${room.id}/edit`}>Edit Room</Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link href={`/dashboard/bookings/new?room=${room.id}`}>Create Booking</Link>
                          </DropdownMenuItem>
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
