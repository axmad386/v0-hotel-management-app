import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { MoreHorizontal, Plus, Search, Users } from "lucide-react"
import { Input } from "@/components/ui/input"

export default function GuestsPage() {
  // Sample data for guests
  const guests = [
    {
      id: "1",
      name: "John Smith",
      email: "john@example.com",
      phone: "123-456-7890",
      address: "123 Main St, New York, NY",
      stays: 5,
      status: "active",
    },
    {
      id: "2",
      name: "Jane Doe",
      email: "jane@example.com",
      phone: "234-567-8901",
      address: "456 Park Ave, Boston, MA",
      stays: 2,
      status: "active",
    },
    {
      id: "3",
      name: "Robert Johnson",
      email: "robert@example.com",
      phone: "345-678-9012",
      address: "789 Ocean Dr, Miami, FL",
      stays: 8,
      status: "active",
    },
    {
      id: "4",
      name: "Emily Wilson",
      email: "emily@example.com",
      phone: "456-789-0123",
      address: "101 Pine Rd, Denver, CO",
      stays: 1,
      status: "active",
    },
    {
      id: "5",
      name: "Michael Brown",
      email: "michael@example.com",
      phone: "567-890-1234",
      address: "202 Central St, Chicago, IL",
      stays: 3,
      status: "inactive",
    },
    {
      id: "6",
      name: "Sarah Davis",
      email: "sarah@example.com",
      phone: "678-901-2345",
      address: "303 Lake Dr, Seattle, WA",
      stays: 4,
      status: "active",
    },
  ]

  return (
    <div className="flex flex-col gap-4 p-4 md:gap-8 md:p-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Guests</h1>
        <Button asChild>
          <Link href="/dashboard/guests/new">
            <Plus className="mr-2 h-4 w-4" />
            Add Guest
          </Link>
        </Button>
      </div>
      <div className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Guests</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">573</div>
              <p className="text-xs text-muted-foreground">Registered in the system</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Guests</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">128</div>
              <p className="text-xs text-muted-foreground">Currently staying</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Returning Guests</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">342</div>
              <p className="text-xs text-muted-foreground">More than one stay</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">New Guests</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">48</div>
              <p className="text-xs text-muted-foreground">This month</p>
            </CardContent>
          </Card>
        </div>
        <Card>
          <CardHeader className="space-y-0">
            <div className="flex flex-col space-y-3 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
              <div>
                <CardTitle>All Guests</CardTitle>
                <CardDescription>Manage your guests and view their details</CardDescription>
              </div>
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input type="search" placeholder="Search guests..." className="pl-8 sm:w-[300px]" />
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Stays</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="w-[50px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {guests.map((guest) => (
                  <TableRow key={guest.id}>
                    <TableCell className="font-medium">
                      <Link href={`/dashboard/guests/${guest.id}`} className="hover:underline">
                        {guest.name}
                      </Link>
                    </TableCell>
                    <TableCell>{guest.email}</TableCell>
                    <TableCell>{guest.phone}</TableCell>
                    <TableCell>{guest.stays}</TableCell>
                    <TableCell>
                      <Badge variant={guest.status === "active" ? "default" : "secondary"}>
                        {guest.status.charAt(0).toUpperCase() + guest.status.slice(1)}
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
                            <Link href={`/dashboard/guests/${guest.id}`}>View Details</Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link href={`/dashboard/guests/${guest.id}/edit`}>Edit Guest</Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link href={`/dashboard/bookings/new?guest=${guest.id}`}>Create Booking</Link>
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
