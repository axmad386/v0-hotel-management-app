import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { ArrowUpRight, Building2, Calendar, DollarSign, Hotel, Users } from "lucide-react"

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-4 p-4 md:gap-8 md:p-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        <div className="flex items-center gap-2">
          <Button asChild>
            <Link href="/dashboard/create-booking">
              <Calendar className="mr-2 h-4 w-4" />
              New Booking
            </Link>
          </Button>
        </div>
      </div>
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$45,231.89</div>
                <p className="text-xs text-muted-foreground">+20.1% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Occupancy Rate</CardTitle>
                <Hotel className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">78%</div>
                <p className="text-xs text-muted-foreground">+4% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Bookings</CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">24</div>
                <p className="text-xs text-muted-foreground">+2 since yesterday</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Guests</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">573</div>
                <p className="text-xs text-muted-foreground">+18 this week</p>
              </CardContent>
            </Card>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Recent Bookings</CardTitle>
                <CardDescription>You have 6 check-ins scheduled for today</CardDescription>
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
                      <Button variant="ghost" size="icon" asChild>
                        <Link href={`/dashboard/bookings/${i}`}>
                          <ArrowUpRight className="h-4 w-4" />
                          <span className="sr-only">View booking</span>
                        </Link>
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Property Overview</CardTitle>
                <CardDescription>Status of your properties and rooms</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Building2 className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium">Grand Hotel</span>
                      </div>
                      <span className="text-sm text-muted-foreground">32 rooms</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-muted">
                      <div className="h-2 w-[75%] rounded-full bg-primary"></div>
                    </div>
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>24 occupied</span>
                      <span>8 available</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Building2 className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium">City Boarding House</span>
                      </div>
                      <span className="text-sm text-muted-foreground">18 rooms</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-muted">
                      <div className="h-2 w-[60%] rounded-full bg-primary"></div>
                    </div>
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>11 occupied</span>
                      <span>7 available</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Building2 className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium">Beach Resort</span>
                      </div>
                      <span className="text-sm text-muted-foreground">24 rooms</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-muted">
                      <div className="h-2 w-[90%] rounded-full bg-primary"></div>
                    </div>
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>22 occupied</span>
                      <span>2 available</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="analytics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Analytics</CardTitle>
              <CardDescription>View detailed analytics for your properties</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] flex items-center justify-center border rounded-md">
                <p className="text-muted-foreground">Analytics charts will be displayed here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="reports" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Reports</CardTitle>
              <CardDescription>Generate and download reports</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <div className="font-medium">Financial Summary</div>
                    <div className="text-sm text-muted-foreground">Monthly revenue and expense report</div>
                  </div>
                  <Button>Generate</Button>
                </div>
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <div className="font-medium">Occupancy Report</div>
                    <div className="text-sm text-muted-foreground">Room occupancy statistics</div>
                  </div>
                  <Button>Generate</Button>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Guest Analytics</div>
                    <div className="text-sm text-muted-foreground">Guest demographics and preferences</div>
                  </div>
                  <Button>Generate</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
