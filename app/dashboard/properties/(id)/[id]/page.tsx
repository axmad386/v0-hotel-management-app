"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Building2, Edit, Hotel, Plus } from "lucide-react"
import { ConfirmDialog } from "@/components/confirm-dialog"

// Sample data for properties
const propertiesData = [
  {
    id: "1",
    name: "Grand Hotel",
    type: "hotel",
    address: "123 Main St, New York, NY",
    city: "New York",
    state: "NY",
    zipCode: "10001",
    country: "USA",
    rooms: 32,
    occupancy: "75%",
    status: "active",
    description: "A luxury hotel in the heart of New York City with modern amenities and exceptional service.",
    amenities: ["Pool", "Spa", "Restaurant", "Gym", "Conference Rooms", "Room Service"],
    images: ["/placeholder.svg?height=400&width=600"],
    createdAt: "2024-01-15",
  },
  {
    id: "2",
    name: "City Boarding House",
    type: "boarding",
    address: "456 Park Ave, Boston, MA",
    city: "Boston",
    state: "MA",
    zipCode: "02108",
    country: "USA",
    rooms: 18,
    occupancy: "60%",
    status: "active",
    description: "A cozy boarding house in Boston offering affordable long-term stays for students and professionals.",
    amenities: ["Shared Kitchen", "Laundry", "Common Area", "Free WiFi", "Bike Storage"],
    images: ["/placeholder.svg?height=400&width=600"],
    createdAt: "2024-02-10",
  },
]

export default function PropertyDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [property, setProperty] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // In a real app, this would fetch from an API
    const foundProperty = propertiesData.find((p) => p.id === params.id)
    if (foundProperty) {
      setProperty(foundProperty)
    }
    setLoading(false)
  }, [params.id])

  const handleDelete = () => {
    // In a real app, this would call an API to delete the property
    router.push("/dashboard/properties")
  }

  if (loading) {
    return <div className="p-8">Loading...</div>
  }

  if (!property) {
    return (
      <div className="p-8">
        <h1 className="text-2xl font-bold">Property not found</h1>
        <Button asChild className="mt-4">
          <Link href="/dashboard/properties">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Properties
          </Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-4 p-4 md:gap-8 md:p-8">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" asChild>
            <Link href="/dashboard/properties">
              <ArrowLeft className="h-4 w-4" />
              <span className="sr-only">Back</span>
            </Link>
          </Button>
          <h1 className="text-2xl font-bold tracking-tight">{property.name}</h1>
          <Badge variant={property.status === "active" ? "default" : "secondary"}>
            {property.status === "active" ? "Active" : "Maintenance"}
          </Badge>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" asChild>
            <Link href={`/dashboard/properties/${property.id}/edit`}>
              <Edit className="mr-2 h-4 w-4" />
              Edit Property
            </Link>
          </Button>
          <ConfirmDialog
            title="Delete Property"
            description={`Are you sure you want to delete ${property.name}? This action cannot be undone.`}
            onConfirm={handleDelete}
          />
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="rooms">Rooms</TabsTrigger>
          <TabsTrigger value="bookings">Bookings</TabsTrigger>
          <TabsTrigger value="finances">Finances</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Property Information</CardTitle>
                <CardDescription>Basic details about this property</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <div className="mb-4">
                      <h3 className="text-lg font-medium">Details</h3>
                      <div className="mt-2 grid grid-cols-2 gap-2">
                        <div className="text-sm text-muted-foreground">Type</div>
                        <div className="text-sm">{property.type === "hotel" ? "Hotel" : "Boarding House"}</div>
                        <div className="text-sm text-muted-foreground">Total Rooms</div>
                        <div className="text-sm">{property.rooms}</div>
                        <div className="text-sm text-muted-foreground">Current Occupancy</div>
                        <div className="text-sm">{property.occupancy}</div>
                        <div className="text-sm text-muted-foreground">Created On</div>
                        <div className="text-sm">{new Date(property.createdAt).toLocaleDateString()}</div>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-medium">Address</h3>
                      <div className="mt-2 grid grid-cols-2 gap-2">
                        <div className="text-sm text-muted-foreground">Street</div>
                        <div className="text-sm">{property.address}</div>
                        <div className="text-sm text-muted-foreground">City</div>
                        <div className="text-sm">{property.city}</div>
                        <div className="text-sm text-muted-foreground">State/Province</div>
                        <div className="text-sm">{property.state}</div>
                        <div className="text-sm text-muted-foreground">Zip/Postal Code</div>
                        <div className="text-sm">{property.zipCode}</div>
                        <div className="text-sm text-muted-foreground">Country</div>
                        <div className="text-sm">{property.country}</div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="mb-4">
                      <h3 className="text-lg font-medium">Description</h3>
                      <p className="mt-2 text-sm">{property.description}</p>
                    </div>
                    <div>
                      <h3 className="text-lg font-medium">Amenities</h3>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {property.amenities.map((amenity: string) => (
                          <Badge key={amenity} variant="outline">
                            {amenity}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="mt-4">
                      <h3 className="text-lg font-medium">Property Image</h3>
                      <div className="mt-2 overflow-hidden rounded-md border">
                        <img
                          src={property.images[0] || "/placeholder.svg"}
                          alt={property.name}
                          className="h-auto w-full object-cover"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Occupancy Statistics</CardTitle>
                <CardDescription>Current occupancy and availability</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Current Occupancy</span>
                      <span className="text-sm text-muted-foreground">{property.occupancy}</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-muted">
                      <div className="h-2 rounded-full bg-primary" style={{ width: property.occupancy }}></div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="rounded-md border p-4 text-center">
                      <div className="text-2xl font-bold">
                        {Math.round((Number.parseInt(property.occupancy) / 100) * property.rooms)}
                      </div>
                      <div className="text-xs text-muted-foreground">Occupied Rooms</div>
                    </div>
                    <div className="rounded-md border p-4 text-center">
                      <div className="text-2xl font-bold">
                        {property.rooms - Math.round((Number.parseInt(property.occupancy) / 100) * property.rooms)}
                      </div>
                      <div className="text-xs text-muted-foreground">Available Rooms</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Financial Summary</CardTitle>
                <CardDescription>Revenue and expenses for this property</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="rounded-md border p-4 text-center">
                      <div className="text-2xl font-bold">$12,450</div>
                      <div className="text-xs text-muted-foreground">Monthly Revenue</div>
                    </div>
                    <div className="rounded-md border p-4 text-center">
                      <div className="text-2xl font-bold">$4,280</div>
                      <div className="text-xs text-muted-foreground">Monthly Expenses</div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Profit Margin</span>
                      <span className="text-sm text-muted-foreground">65.6%</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-muted">
                      <div className="h-2 w-[65.6%] rounded-full bg-green-500"></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="rooms" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Room Management</CardTitle>
                <CardDescription>Manage rooms for this property</CardDescription>
              </div>
              <Button asChild>
                <Link href={`/dashboard/properties/${property.id}/rooms/new`}>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Room
                </Link>
              </Button>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Standard Room</CardTitle>
                    <Hotel className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">12 Units</div>
                    <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
                      <span>$120/night</span>
                      <span>8 occupied, 4 available</span>
                    </div>
                    <div className="mt-4 flex justify-end">
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/dashboard/properties/${property.id}/rooms/standard`}>Manage</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Deluxe Room</CardTitle>
                    <Hotel className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">10 Units</div>
                    <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
                      <span>$180/night</span>
                      <span>8 occupied, 2 available</span>
                    </div>
                    <div className="mt-4 flex justify-end">
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/dashboard/properties/${property.id}/rooms/deluxe`}>Manage</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Suite</CardTitle>
                    <Hotel className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">10 Units</div>
                    <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
                      <span>$250/night</span>
                      <span>8 occupied, 2 available</span>
                    </div>
                    <div className="mt-4 flex justify-end">
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/dashboard/properties/${property.id}/rooms/suite`}>Manage</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="bookings" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Recent Bookings</CardTitle>
                <CardDescription>Bookings for this property</CardDescription>
              </div>
              <Button asChild>
                <Link href={`/dashboard/bookings/new?property=${property.id}`}>
                  <Plus className="mr-2 h-4 w-4" />
                  New Booking
                </Link>
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
                    <div className="flex items-center gap-4">
                      <div className="w-14 text-center text-xs">
                        <div className="font-medium">May</div>
                        <div className="text-lg font-bold">{i + 14}</div>
                      </div>
                      <div>
                        <div className="font-medium">John Smith</div>
                        <div className="text-sm text-muted-foreground">Deluxe Room • 3 nights</div>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/dashboard/bookings/${i}`}>View</Link>
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="finances" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Financial Overview</CardTitle>
              <CardDescription>Revenue and expenses for this property</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                <div className="grid gap-4 md:grid-cols-3">
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                      <Building2 className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">$145,231.89</div>
                      <p className="text-xs text-muted-foreground">Year to date</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Total Expenses</CardTitle>
                      <Building2 className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">$52,345.67</div>
                      <p className="text-xs text-muted-foreground">Year to date</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Net Profit</CardTitle>
                      <Building2 className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">$92,886.22</div>
                      <p className="text-xs text-muted-foreground">Year to date</p>
                    </CardContent>
                  </Card>
                </div>
                <div className="rounded-md border p-4">
                  <h3 className="mb-4 text-lg font-medium">Monthly Revenue (2025)</h3>
                  <div className="h-[200px] w-full bg-muted flex items-center justify-center">
                    <p className="text-muted-foreground">Revenue chart will be displayed here</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
