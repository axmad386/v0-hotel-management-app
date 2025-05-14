import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Building2, Calendar, CreditCard, Users } from "lucide-react"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="font-semibold text-xl">PropertyPro</div>
          <nav className="hidden md:flex gap-6 items-center">
            <Link href="#features" className="text-muted-foreground hover:text-foreground transition-colors">
              Features
            </Link>
            <Link href="#pricing" className="text-muted-foreground hover:text-foreground transition-colors">
              Pricing
            </Link>
            <Link href="#about" className="text-muted-foreground hover:text-foreground transition-colors">
              About
            </Link>
            <Link href="/login">
              <Button variant="outline">Login</Button>
            </Link>
          </nav>
          <Button asChild className="md:hidden">
            <Link href="/login">Login</Link>
          </Button>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Manage Your Properties with Ease
                </h1>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  A comprehensive solution for hotels and boarding houses. Streamline bookings, manage finances, and
                  grow your business.
                </p>
              </div>
              <div className="space-x-4">
                <Button asChild size="lg">
                  <Link href="/login">
                    Get Started <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link href="#features">Learn More</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
        <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-muted/50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                  Powerful Features for Property Management
                </h2>
                <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl">
                  Everything you need to manage your properties efficiently
                </p>
              </div>
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4 lg:gap-10 pt-8">
                <div className="flex flex-col items-center space-y-2 border rounded-lg p-6 bg-background">
                  <Building2 className="h-12 w-12 text-primary" />
                  <h3 className="text-xl font-bold">Property Management</h3>
                  <p className="text-muted-foreground text-center">
                    Manage multiple properties, room types, and units from a single dashboard
                  </p>
                </div>
                <div className="flex flex-col items-center space-y-2 border rounded-lg p-6 bg-background">
                  <Calendar className="h-12 w-12 text-primary" />
                  <h3 className="text-xl font-bold">Booking System</h3>
                  <p className="text-muted-foreground text-center">
                    Streamline reservations, check-ins, and check-outs with our intuitive booking system
                  </p>
                </div>
                <div className="flex flex-col items-center space-y-2 border rounded-lg p-6 bg-background">
                  <CreditCard className="h-12 w-12 text-primary" />
                  <h3 className="text-xl font-bold">Financial Management</h3>
                  <p className="text-muted-foreground text-center">
                    Track payments, generate invoices, and export financial reports
                  </p>
                </div>
                <div className="flex flex-col items-center space-y-2 border rounded-lg p-6 bg-background">
                  <Users className="h-12 w-12 text-primary" />
                  <h3 className="text-xl font-bold">Role-Based Access</h3>
                  <p className="text-muted-foreground text-center">
                    Create custom roles with specific permissions for your staff
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="w-full border-t py-6">
        <div className="container flex flex-col items-center justify-center gap-4 md:flex-row md:gap-8">
          <p className="text-center text-sm text-muted-foreground">© 2025 PropertyPro. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
