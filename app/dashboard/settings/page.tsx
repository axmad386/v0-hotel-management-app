"use client"

import { useState } from "react"
import { usePathname } from "next/navigation"
import { Bell, CreditCard, Globe, Palette, Plug, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function SettingsPage() {
  const pathname = usePathname()
  const [activeTab, setActiveTab] = useState("general")

  const settingsNavigation = [
    { name: "General", href: "/dashboard/settings/general", icon: Globe, id: "general" },
    { name: "Appearance", href: "/dashboard/settings/appearance", icon: Palette, id: "appearance" },
    { name: "Notifications", href: "/dashboard/settings/notifications", icon: Bell, id: "notifications" },
    { name: "Integrations", href: "/dashboard/settings/integrations", icon: Plug, id: "integrations" },
    { name: "Billing", href: "/dashboard/settings/billing", icon: CreditCard, id: "billing" },
    { name: "Account", href: "/dashboard/settings/account", icon: User, id: "account" },
  ]

  return (
    <div className="container mx-auto py-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
          <p className="text-muted-foreground">Manage your account settings and preferences.</p>
        </div>
      </div>

      <Separator className="my-6" />

      <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
        <aside className="lg:w-1/5">
          <nav className="flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1">
            {settingsNavigation.map((item) => (
              <Button
                key={item.name}
                variant={activeTab === item.id ? "secondary" : "ghost"}
                className="justify-start"
                onClick={() => setActiveTab(item.id)}
              >
                <item.icon className="mr-2 h-4 w-4" />
                {item.name}
              </Button>
            ))}
          </nav>
        </aside>
        <div className="flex-1 lg:max-w-4xl">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
            <TabsContent value="general" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>General Settings</CardTitle>
                  <CardDescription>Manage your basic hotel settings and preferences.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="hotelName">Hotel Name</Label>
                    <Input id="hotelName" defaultValue="Grand Hotel" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contactEmail">Contact Email</Label>
                    <Input id="contactEmail" type="email" defaultValue="info@grandhotel.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contactPhone">Contact Phone</Label>
                    <Input id="contactPhone" defaultValue="+1 (555) 123-4567" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="timezone">Timezone</Label>
                    <Select defaultValue="america-new_york">
                      <SelectTrigger id="timezone">
                        <SelectValue placeholder="Select timezone" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="america-new_york">America/New York</SelectItem>
                        <SelectItem value="america-los_angeles">America/Los Angeles</SelectItem>
                        <SelectItem value="europe-london">Europe/London</SelectItem>
                        <SelectItem value="asia-tokyo">Asia/Tokyo</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="currency">Currency</Label>
                    <Select defaultValue="usd">
                      <SelectTrigger id="currency">
                        <SelectValue placeholder="Select currency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="usd">USD ($)</SelectItem>
                        <SelectItem value="eur">EUR (€)</SelectItem>
                        <SelectItem value="gbp">GBP (£)</SelectItem>
                        <SelectItem value="jpy">JPY (¥)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="taxIncluded">Tax Included in Rates</Label>
                      <p className="text-sm text-muted-foreground">Whether tax is included in the displayed rates</p>
                    </div>
                    <Switch id="taxIncluded" defaultChecked />
                  </div>
                  <Button>Save Changes</Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="appearance" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Appearance</CardTitle>
                  <CardDescription>Customize the look and feel of your dashboard.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Theme</Label>
                    <div className="flex space-x-4">
                      <Button variant="outline" className="flex-1">
                        Light
                      </Button>
                      <Button variant="outline" className="flex-1">
                        Dark
                      </Button>
                      <Button variant="outline" className="flex-1">
                        System
                      </Button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="primaryColor">Primary Color</Label>
                    <div className="flex space-x-2">
                      <Input id="primaryColor" type="color" defaultValue="#0f172a" className="w-12" />
                      <Input defaultValue="#0f172a" className="flex-1" />
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="compactMode">Compact Mode</Label>
                      <p className="text-sm text-muted-foreground">Use a more compact layout for the dashboard</p>
                    </div>
                    <Switch id="compactMode" />
                  </div>
                  <Button>Save Changes</Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="notifications" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Notification Settings</CardTitle>
                  <CardDescription>Configure how and when you receive notifications.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Email Notifications</h3>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>New Bookings</Label>
                        <p className="text-sm text-muted-foreground">Receive notifications for new bookings</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Booking Cancellations</Label>
                        <p className="text-sm text-muted-foreground">Receive notifications for booking cancellations</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Payment Confirmations</Label>
                        <p className="text-sm text-muted-foreground">Receive notifications for payment confirmations</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">System Notifications</h3>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Low Inventory Alerts</Label>
                        <p className="text-sm text-muted-foreground">Receive alerts when inventory items are low</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Maintenance Reminders</Label>
                        <p className="text-sm text-muted-foreground">Receive reminders for scheduled maintenance</p>
                      </div>
                      <Switch />
                    </div>
                  </div>
                  <Button>Save Changes</Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="integrations" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Integrations</CardTitle>
                  <CardDescription>Connect with third-party services and APIs.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="rounded-lg border p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="rounded-full bg-primary/10 p-2">
                          <CreditCard className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-medium">Stripe</h3>
                          <p className="text-sm text-muted-foreground">Payment processing</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        Configure
                      </Button>
                    </div>
                  </div>

                  <div className="rounded-lg border p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="rounded-full bg-primary/10 p-2">
                          <Globe className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-medium">Google Calendar</h3>
                          <p className="text-sm text-muted-foreground">Calendar synchronization</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        Connect
                      </Button>
                    </div>
                  </div>

                  <div className="rounded-lg border p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="rounded-full bg-primary/10 p-2">
                          <Bell className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-medium">Twilio</h3>
                          <p className="text-sm text-muted-foreground">SMS notifications</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        Connect
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="billing" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Billing & Subscription</CardTitle>
                  <CardDescription>Manage your subscription and billing information.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="rounded-lg border p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Current Plan: Professional</h3>
                        <p className="text-sm text-muted-foreground">$49.99/month, billed monthly</p>
                      </div>
                      <Button variant="outline">Change Plan</Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-medium">Payment Method</h3>
                    <div className="rounded-lg border p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <CreditCard className="h-6 w-6" />
                          <div>
                            <p>•••• •••• •••• 4242</p>
                            <p className="text-sm text-muted-foreground">Expires 12/2025</p>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">
                          Update
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-medium">Billing History</h3>
                    <div className="rounded-lg border">
                      <div className="flex items-center justify-between border-b p-4">
                        <div>
                          <p className="font-medium">April 2023</p>
                          <p className="text-sm text-muted-foreground">Professional Plan - Monthly</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">$49.99</p>
                          <p className="text-sm text-muted-foreground">Apr 1, 2023</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between border-b p-4">
                        <div>
                          <p className="font-medium">March 2023</p>
                          <p className="text-sm text-muted-foreground">Professional Plan - Monthly</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">$49.99</p>
                          <p className="text-sm text-muted-foreground">Mar 1, 2023</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between p-4">
                        <div>
                          <p className="font-medium">February 2023</p>
                          <p className="text-sm text-muted-foreground">Professional Plan - Monthly</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">$49.99</p>
                          <p className="text-sm text-muted-foreground">Feb 1, 2023</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="account" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Account Settings</CardTitle>
                  <CardDescription>Update your account information and preferences.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" defaultValue="John Doe" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" defaultValue="john.doe@example.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input id="password" type="password" value="••••••••" />
                    <Button variant="outline" size="sm">
                      Change Password
                    </Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="twoFactor">Two-Factor Authentication</Label>
                      <p className="text-sm text-muted-foreground">Add an extra layer of security to your account</p>
                    </div>
                    <Switch id="twoFactor" />
                  </div>
                  <Button>Save Changes</Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Danger Zone</CardTitle>
                  <CardDescription>Irreversible and destructive actions.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <h3 className="font-medium text-destructive">Delete Account</h3>
                    <p className="text-sm text-muted-foreground">
                      Permanently delete your account and all associated data.
                    </p>
                    <Button variant="destructive">Delete Account</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
