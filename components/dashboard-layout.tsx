"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Building2,
  Calendar,
  CreditCard,
  Home,
  Hotel,
  LogOut,
  Menu,
  Package,
  Settings,
  User,
  Users,
  X,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useMobile } from "@/hooks/use-mobile"

interface DashboardLayoutProps {
  children: React.ReactNode
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const pathname = usePathname()
  const isMobile = useMobile()
  const [selectedProperty, setSelectedProperty] = useState("1")
  const [open, setOpen] = useState(false)

  // Close mobile nav when path changes
  useEffect(() => {
    setOpen(false)
  }, [pathname])

  const navigation = [
    { name: "Dashboard", href: "/dashboard", icon: Home },
    { name: "Properties", href: "/dashboard/properties", icon: Building2 },
    { name: "Rooms", href: "/dashboard/rooms", icon: Hotel },
    { name: "Bookings", href: "/dashboard/bookings", icon: Calendar },
    { name: "Guests", href: "/dashboard/guests", icon: Users },
    { name: "Inventory", href: "/dashboard/inventory", icon: Package },
    { name: "Finance", href: "/dashboard/finance", icon: CreditCard },
    { name: "Users & Roles", href: "/dashboard/users", icon: User },
    { name: "Settings", href: "/dashboard/settings", icon: Settings },
  ]

  const properties = [
    { id: "1", name: "Grand Hotel" },
    { id: "2", name: "City Boarding House" },
    { id: "3", name: "Beach Resort" },
  ]

  const NavItems = () => (
    <div className="space-y-1">
      {navigation.map((item) => {
        const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`)
        return (
          <Link
            key={item.name}
            href={item.href}
            className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium ${
              isActive
                ? "bg-primary text-primary-foreground"
                : "hover:bg-muted text-muted-foreground hover:text-foreground"
            }`}
          >
            <item.icon className="h-5 w-5" />
            {item.name}
          </Link>
        )
      })}
    </div>
  )

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-72 sm:max-w-none">
            <div className="flex h-full flex-col">
              <div className="flex items-center border-b px-2 py-4">
                <Link href="/dashboard" className="flex items-center gap-2 font-semibold">
                  <Building2 className="h-6 w-6" />
                  <span>PropertyPro</span>
                </Link>
                <Button variant="ghost" size="icon" className="ml-auto" onClick={() => setOpen(false)}>
                  <X className="h-5 w-5" />
                  <span className="sr-only">Close navigation menu</span>
                </Button>
              </div>
              <div className="flex-1 overflow-auto py-2">
                <div className="px-2 py-2">
                  <Select value={selectedProperty} onValueChange={setSelectedProperty}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select property" />
                    </SelectTrigger>
                    <SelectContent>
                      {properties.map((property) => (
                        <SelectItem key={property.id} value={property.id}>
                          {property.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <nav className="grid gap-1 px-2 py-2">
                  <NavItems />
                </nav>
              </div>
              <div className="border-t p-4">
                <div className="flex items-center gap-4">
                  <Avatar>
                    <AvatarImage src="/placeholder.svg?height=40&width=40" alt="User" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="text-sm font-medium">John Doe</div>
                    <div className="text-xs text-muted-foreground">Owner</div>
                  </div>
                  <Button variant="ghost" size="icon" asChild>
                    <Link href="/login">
                      <LogOut className="h-5 w-5" />
                      <span className="sr-only">Log out</span>
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </SheetContent>
        </Sheet>
        <div className="flex items-center gap-2">
          <Link href="/dashboard" className="flex items-center gap-2 font-semibold">
            <Building2 className="h-6 w-6" />
            <span className="hidden md:inline-block">PropertyPro</span>
          </Link>
        </div>
        <div className="flex-1 md:ml-4">
          {!isMobile && (
            <Select value={selectedProperty} onValueChange={setSelectedProperty}>
              <SelectTrigger className="w-[240px]">
                <SelectValue placeholder="Select property" />
              </SelectTrigger>
              <SelectContent>
                {properties.map((property) => (
                  <SelectItem key={property.id} value={property.id}>
                    {property.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        </div>
        <div className="flex items-center gap-4">
          <Avatar>
            <AvatarImage src="/placeholder.svg?height=40&width=40" alt="User" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
        </div>
      </header>
      <div className="flex flex-1">
        <aside className="hidden w-64 border-r bg-muted/40 md:block">
          <div className="flex h-full flex-col">
            <div className="flex-1 overflow-auto py-4">
              <nav className="grid gap-1 px-2">
                <NavItems />
              </nav>
            </div>
          </div>
        </aside>
        <main className="flex-1 overflow-auto">{children}</main>
      </div>
    </div>
  )
}
