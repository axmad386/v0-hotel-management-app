import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Building2, MoreHorizontal, Plus } from "lucide-react"

export default function PropertiesPage() {
  // Sample data for properties
  const properties = [
    {
      id: "1",
      name: "Grand Hotel",
      type: "hotel",
      address: "123 Main St, New York, NY",
      rooms: 32,
      occupancy: "75%",
      status: "active",
    },
    {
      id: "2",
      name: "City Boarding House",
      type: "boarding",
      address: "456 Park Ave, Boston, MA",
      rooms: 18,
      occupancy: "60%",
      status: "active",
    },
    {
      id: "3",
      name: "Beach Resort",
      type: "hotel",
      address: "789 Ocean Dr, Miami, FL",
      rooms: 24,
      occupancy: "90%",
      status: "active",
    },
    {
      id: "4",
      name: "Mountain Lodge",
      type: "boarding",
      address: "101 Pine Rd, Denver, CO",
      rooms: 12,
      occupancy: "40%",
      status: "maintenance",
    },
    {
      id: "5",
      name: "Downtown Suites",
      type: "hotel",
      address: "202 Central St, Chicago, IL",
      rooms: 28,
      occupancy: "85%",
      status: "active",
    },
  ]

  return (
    <div className="flex flex-col gap-4 p-4 md:gap-8 md:p-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Properties</h1>
        <Button asChild>
          <Link href="/dashboard/properties/new">
            <Plus className="mr-2 h-4 w-4" />
            Add Property
          </Link>
        </Button>
      </div>
      <div className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Properties</CardTitle>
              <Building2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">5</div>
              <p className="text-xs text-muted-foreground">3 hotels, 2 boarding houses</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Rooms</CardTitle>
              <Building2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">114</div>
              <p className="text-xs text-muted-foreground">84 hotel rooms, 30 boarding rooms</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average Occupancy</CardTitle>
              <Building2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">70%</div>
              <p className="text-xs text-muted-foreground">+5% from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Properties</CardTitle>
              <Building2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">4</div>
              <p className="text-xs text-muted-foreground">1 in maintenance</p>
            </CardContent>
          </Card>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>All Properties</CardTitle>
            <CardDescription>Manage your properties and view their details</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Address</TableHead>
                  <TableHead>Rooms</TableHead>
                  <TableHead>Occupancy</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="w-[50px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {properties.map((property) => (
                  <TableRow key={property.id}>
                    <TableCell className="font-medium">
                      <Link href={`/dashboard/properties/${property.id}`} className="hover:underline">
                        {property.name}
                      </Link>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{property.type === "hotel" ? "Hotel" : "Boarding House"}</Badge>
                    </TableCell>
                    <TableCell>{property.address}</TableCell>
                    <TableCell>{property.rooms}</TableCell>
                    <TableCell>{property.occupancy}</TableCell>
                    <TableCell>
                      <Badge variant={property.status === "active" ? "default" : "secondary"}>
                        {property.status === "active" ? "Active" : "Maintenance"}
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
                            <Link href={`/dashboard/properties/${property.id}`}>View Details</Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link href={`/dashboard/properties/${property.id}/edit`}>Edit Property</Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link href={`/dashboard/properties/${property.id}/rooms`}>Manage Rooms</Link>
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
