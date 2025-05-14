import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import {
  ArrowDownToLine,
  CreditCard,
  DollarSign,
  Download,
  MoreHorizontal,
  TrendingDown,
  TrendingUp,
} from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function FinancePage() {
  // Sample data for transactions
  const transactions = [
    {
      id: "1",
      date: "2025-05-15",
      description: "Booking #1234 - John Smith",
      amount: 396.0,
      type: "income",
      status: "completed",
      property: "Grand Hotel",
    },
    {
      id: "2",
      date: "2025-05-14",
      description: "Booking #1233 - Jane Doe",
      amount: 720.0,
      type: "income",
      status: "completed",
      property: "Grand Hotel",
    },
    {
      id: "3",
      date: "2025-05-14",
      description: "Maintenance - Plumbing",
      amount: 150.0,
      type: "expense",
      status: "completed",
      property: "City Boarding House",
    },
    {
      id: "4",
      date: "2025-05-13",
      description: "Booking #1232 - Robert Johnson",
      amount: 1500.0,
      type: "income",
      status: "completed",
      property: "City Boarding House",
    },
    {
      id: "5",
      date: "2025-05-12",
      description: "Utilities - Electricity",
      amount: 450.0,
      type: "expense",
      status: "completed",
      property: "Grand Hotel",
    },
    {
      id: "6",
      date: "2025-05-12",
      description: "Booking #1231 - Emily Wilson",
      amount: 1250.0,
      type: "income",
      status: "pending",
      property: "Beach Resort",
    },
  ]

  // Format date to display in a more readable format
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
  }

  // Format amount to display as currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(amount)
  }

  return (
    <div className="flex flex-col gap-4 p-4 md:gap-8 md:p-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Finance</h1>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button asChild>
            <Link href="/dashboard/finance/new-transaction">
              <DollarSign className="mr-2 h-4 w-4" />
              New Transaction
            </Link>
          </Button>
        </div>
      </div>
      <div className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$45,231.89</div>
              <div className="flex items-center text-xs text-muted-foreground">
                <TrendingUp className="mr-1 h-4 w-4 text-green-500" />
                <span className="text-green-500">+20.1%</span>
                <span className="ml-1">from last month</span>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Expenses</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$12,345.67</div>
              <div className="flex items-center text-xs text-muted-foreground">
                <TrendingDown className="mr-1 h-4 w-4 text-red-500" />
                <span className="text-red-500">+5.2%</span>
                <span className="ml-1">from last month</span>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Net Profit</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$32,886.22</div>
              <div className="flex items-center text-xs text-muted-foreground">
                <TrendingUp className="mr-1 h-4 w-4 text-green-500" />
                <span className="text-green-500">+15.3%</span>
                <span className="ml-1">from last month</span>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Payments</CardTitle>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$3,450.00</div>
              <p className="text-xs text-muted-foreground">From 8 bookings</p>
            </CardContent>
          </Card>
        </div>
        <Tabs defaultValue="transactions" className="space-y-4">
          <TabsList>
            <TabsTrigger value="transactions">Transactions</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
            <TabsTrigger value="invoices">Invoices</TabsTrigger>
          </TabsList>
          <TabsContent value="transactions" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Recent Transactions</CardTitle>
                <CardDescription>View and manage all financial transactions</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Property</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="w-[50px]"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {transactions.map((transaction) => (
                      <TableRow key={transaction.id}>
                        <TableCell>{formatDate(transaction.date)}</TableCell>
                        <TableCell className="font-medium">
                          <Link href={`/dashboard/finance/transactions/${transaction.id}`} className="hover:underline">
                            {transaction.description}
                          </Link>
                        </TableCell>
                        <TableCell>{transaction.property}</TableCell>
                        <TableCell>{formatCurrency(transaction.amount)}</TableCell>
                        <TableCell>
                          <Badge variant={transaction.type === "income" ? "default" : "destructive"}>
                            {transaction.type === "income" ? "Income" : "Expense"}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant={transaction.status === "completed" ? "outline" : "secondary"}>
                            {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
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
                                <Link href={`/dashboard/finance/transactions/${transaction.id}`}>View Details</Link>
                              </DropdownMenuItem>
                              <DropdownMenuItem asChild>
                                <Link href={`/dashboard/finance/transactions/${transaction.id}/edit`}>
                                  Edit Transaction
                                </Link>
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <div className="flex items-center">
                                  <ArrowDownToLine className="mr-2 h-4 w-4" />
                                  Download Receipt
                                </div>
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
          </TabsContent>
          <TabsContent value="reports" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Financial Reports</CardTitle>
                <CardDescription>Generate and download financial reports</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b pb-4">
                    <div>
                      <div className="font-medium">Income Statement</div>
                      <div className="text-sm text-muted-foreground">Revenue, expenses, and profit report</div>
                    </div>
                    <Button>Generate</Button>
                  </div>
                  <div className="flex items-center justify-between border-b pb-4">
                    <div>
                      <div className="font-medium">Cash Flow Statement</div>
                      <div className="text-sm text-muted-foreground">Cash inflows and outflows</div>
                    </div>
                    <Button>Generate</Button>
                  </div>
                  <div className="flex items-center justify-between border-b pb-4">
                    <div>
                      <div className="font-medium">Property Performance</div>
                      <div className="text-sm text-muted-foreground">Revenue and expenses by property</div>
                    </div>
                    <Button>Generate</Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">Tax Report</div>
                      <div className="text-sm text-muted-foreground">Annual tax summary</div>
                    </div>
                    <Button>Generate</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="invoices" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Invoices</CardTitle>
                <CardDescription>Manage and track all invoices</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Invoice #</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Guest</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="w-[100px]">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium">INV-1234</TableCell>
                        <TableCell>May 15, 2025</TableCell>
                        <TableCell>John Smith</TableCell>
                        <TableCell>$396.00</TableCell>
                        <TableCell>
                          <Badge variant="default">Paid</Badge>
                        </TableCell>
                        <TableCell>
                          <Button variant="outline" size="sm">
                            <Download className="mr-2 h-4 w-4" />
                            Download
                          </Button>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">INV-1233</TableCell>
                        <TableCell>May 14, 2025</TableCell>
                        <TableCell>Jane Doe</TableCell>
                        <TableCell>$720.00</TableCell>
                        <TableCell>
                          <Badge variant="default">Paid</Badge>
                        </TableCell>
                        <TableCell>
                          <Button variant="outline" size="sm">
                            <Download className="mr-2 h-4 w-4" />
                            Download
                          </Button>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">INV-1232</TableCell>
                        <TableCell>May 13, 2025</TableCell>
                        <TableCell>Robert Johnson</TableCell>
                        <TableCell>$1,500.00</TableCell>
                        <TableCell>
                          <Badge variant="default">Paid</Badge>
                        </TableCell>
                        <TableCell>
                          <Button variant="outline" size="sm">
                            <Download className="mr-2 h-4 w-4" />
                            Download
                          </Button>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">INV-1231</TableCell>
                        <TableCell>May 12, 2025</TableCell>
                        <TableCell>Emily Wilson</TableCell>
                        <TableCell>$1,250.00</TableCell>
                        <TableCell>
                          <Badge variant="secondary">Pending</Badge>
                        </TableCell>
                        <TableCell>
                          <Button variant="outline" size="sm">
                            <Download className="mr-2 h-4 w-4" />
                            Download
                          </Button>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
