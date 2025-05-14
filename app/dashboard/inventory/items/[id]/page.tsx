"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Edit, Package, TrendingDown, TrendingUp } from "lucide-react"
import { DataTable } from "@/components/data-table/data-table"
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header"
import { ConfirmDialog } from "@/components/confirm-dialog"
import { sampleInventoryItems, sampleInventoryTransactions } from "@/lib/models/inventory"

export default function InventoryItemDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [item, setItem] = useState<any>(null)
  const [transactions, setTransactions] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // In a real app, this would fetch from an API
    const foundItem = sampleInventoryItems.find((i) => i.id === params.id)
    const itemTransactions = sampleInventoryTransactions.filter((t) => t.itemId === params.id)

    if (foundItem) {
      setItem(foundItem)
      setTransactions(itemTransactions)
    }
    setLoading(false)
  }, [params.id])

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount)
  }

  const handleDelete = () => {
    // In a real app, this would call an API to delete the item
    router.push("/dashboard/inventory")
  }

  const transactionColumns = [
    {
      accessorKey: "date",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Date" />,
      cell: ({ row }) => <div>{new Date(row.original.date).toLocaleDateString()}</div>,
    },
    {
      accessorKey: "type",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Type" />,
      cell: ({ row }) => {
        const type = row.getValue("type") as string
        const badgeVariant =
          type === "received"
            ? "default"
            : type === "used"
              ? "secondary"
              : type === "transferred"
                ? "outline"
                : type === "damaged"
                  ? "destructive"
                  : "outline"

        return <Badge variant={badgeVariant}>{type.charAt(0).toUpperCase() + type.slice(1)}</Badge>
      },
    },
    {
      accessorKey: "quantity",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Quantity" />,
      cell: ({ row }) => {
        const quantity = row.getValue("quantity") as number
        const type = row.original.type
        const isPositive = type === "received"

        return (
          <div className="flex items-center">
            {isPositive ? (
              <TrendingUp className="mr-2 h-4 w-4 text-green-500" />
            ) : (
              <TrendingDown className="mr-2 h-4 w-4 text-red-500" />
            )}
            <span className={isPositive ? "text-green-500" : "text-red-500"}>
              {isPositive ? "+" : "-"}
              {quantity} {item?.unitOfMeasure}s
            </span>
          </div>
        )
      },
    },
    {
      accessorKey: "notes",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Notes" />,
    },
    {
      accessorKey: "cost",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Cost" />,
      cell: ({ row }) => {
        const cost = row.original.cost
        return <div>{cost ? formatCurrency(cost) : "N/A"}</div>
      },
    },
    {
      accessorKey: "invoiceNumber",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Invoice #" />,
      cell: ({ row }) => <div>{row.original.invoiceNumber || "N/A"}</div>,
    },
  ]

  if (loading) {
    return <div className="p-8">Loading...</div>
  }

  if (!item) {
    return (
      <div className="p-8">
        <h1 className="text-2xl font-bold">Item not found</h1>
        <Button asChild className="mt-4">
          <Link href="/dashboard/inventory">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Inventory
          </Link>
        </Button>
      </div>
    )
  }

  // Get category name
  const categoryMap: Record<string, string> = {
    "1": "Linens",
    "2": "Toiletries",
    "3": "Cleaning Supplies",
    "4": "Furniture",
    "5": "Electronics",
    "6": "Kitchen Supplies",
    "7": "Maintenance",
    "8": "Amenities",
  }

  const categoryName = categoryMap[item.categoryId] || item.categoryId

  return (
    <div className="flex flex-col gap-4 p-4 md:gap-8 md:p-8">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" asChild>
            <Link href="/dashboard/inventory">
              <ArrowLeft className="h-4 w-4" />
              <span className="sr-only">Back</span>
            </Link>
          </Button>
          <h1 className="text-2xl font-bold tracking-tight">{item.name}</h1>
          <Badge variant={item.currentStock <= item.reorderPoint ? "destructive" : "default"}>
            {item.currentStock <= item.reorderPoint ? "Low Stock" : "In Stock"}
          </Badge>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" asChild>
            <Link href={`/dashboard/inventory/items/${item.id}/edit`}>
              <Edit className="mr-2 h-4 w-4" />
              Edit Item
            </Link>
          </Button>
          <Button asChild>
            <Link href={`/dashboard/inventory/transactions/new?itemId=${item.id}`}>
              <Package className="mr-2 h-4 w-4" />
              Record Transaction
            </Link>
          </Button>
          <ConfirmDialog
            title="Delete Item"
            description={`Are you sure you want to delete ${item.name}? This action cannot be undone.`}
            onConfirm={handleDelete}
          />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Item Information</CardTitle>
            <CardDescription>Basic details about this inventory item</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">SKU</h3>
                <p className="mt-1">{item.sku}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Category</h3>
                <p className="mt-1">{categoryName}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Unit of Measure</h3>
                <p className="mt-1">{item.unitOfMeasure}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Cost Per Unit</h3>
                <p className="mt-1">{formatCurrency(item.costPerUnit)}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Current Stock</h3>
                <p className="mt-1">
                  {item.currentStock} {item.unitOfMeasure}s
                </p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Total Value</h3>
                <p className="mt-1">{formatCurrency(item.currentStock * item.costPerUnit)}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Reorder Point</h3>
                <p className="mt-1">
                  {item.reorderPoint} {item.unitOfMeasure}s
                </p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Reorder Quantity</h3>
                <p className="mt-1">
                  {item.reorderQuantity} {item.unitOfMeasure}s
                </p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Location</h3>
                <p className="mt-1">{item.location}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Supplier</h3>
                <p className="mt-1">{item.supplier}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Last Restocked</h3>
                <p className="mt-1">{item.lastRestocked ? new Date(item.lastRestocked).toLocaleDateString() : "N/A"}</p>
              </div>
            </div>
            {item.description && (
              <div className="mt-4">
                <h3 className="text-sm font-medium text-muted-foreground">Description</h3>
                <p className="mt-1">{item.description}</p>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Stock Status</CardTitle>
            <CardDescription>Current inventory levels and reorder information</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Current Stock Level</h3>
                <div className="mt-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">
                      {item.currentStock} / {item.reorderPoint + item.reorderQuantity} {item.unitOfMeasure}s
                    </span>
                    <span className="text-sm">
                      {Math.round((item.currentStock / (item.reorderPoint + item.reorderQuantity)) * 100)}%
                    </span>
                  </div>
                  <div className="mt-1 h-2 w-full rounded-full bg-muted">
                    <div
                      className={`h-2 rounded-full ${
                        item.currentStock <= item.reorderPoint ? "bg-destructive" : "bg-primary"
                      }`}
                      style={{
                        width: `${Math.min(100, Math.round((item.currentStock / (item.reorderPoint + item.reorderQuantity)) * 100))}%`,
                      }}
                    ></div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-lg border p-3">
                  <div className="text-sm font-medium">Reorder Point</div>
                  <div className="mt-1 text-2xl font-bold">{item.reorderPoint}</div>
                  <div className="text-xs text-muted-foreground">{item.unitOfMeasure}s</div>
                </div>
                <div className="rounded-lg border p-3">
                  <div className="text-sm font-medium">Reorder Quantity</div>
                  <div className="mt-1 text-2xl font-bold">{item.reorderQuantity}</div>
                  <div className="text-xs text-muted-foreground">{item.unitOfMeasure}s</div>
                </div>
                <div className="rounded-lg border p-3">
                  <div className="text-sm font-medium">Total Value</div>
                  <div className="mt-1 text-2xl font-bold">{formatCurrency(item.currentStock * item.costPerUnit)}</div>
                  <div className="text-xs text-muted-foreground">Current inventory value</div>
                </div>
                <div className="rounded-lg border p-3">
                  <div className="text-sm font-medium">Restock Cost</div>
                  <div className="mt-1 text-2xl font-bold">
                    {formatCurrency(item.reorderQuantity * item.costPerUnit)}
                  </div>
                  <div className="text-xs text-muted-foreground">Cost to reorder</div>
                </div>
              </div>

              {item.currentStock <= item.reorderPoint && (
                <div className="mt-4">
                  <Button className="w-full" asChild>
                    <Link href={`/dashboard/inventory/orders/new?itemId=${item.id}`}>Create Purchase Order</Link>
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="transactions" className="space-y-4">
        <TabsList>
          <TabsTrigger value="transactions">Transaction History</TabsTrigger>
          <TabsTrigger value="usage">Usage Analytics</TabsTrigger>
        </TabsList>
        <TabsContent value="transactions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Transaction History</CardTitle>
              <CardDescription>Record of all inventory movements for this item</CardDescription>
            </CardHeader>
            <CardContent>
              {transactions.length > 0 ? (
                <DataTable
                  columns={transactionColumns}
                  data={transactions}
                  searchPlaceholder="Search transactions..."
                />
              ) : (
                <div className="flex h-[200px] items-center justify-center rounded-md border border-dashed">
                  <div className="text-center">
                    <Package className="mx-auto h-10 w-10 text-muted-foreground" />
                    <h3 className="mt-2 text-lg font-medium">No transactions</h3>
                    <p className="mt-1 text-sm text-muted-foreground">This item has no recorded transactions yet.</p>
                    <Button className="mt-4" asChild>
                      <Link href={`/dashboard/inventory/transactions/new?itemId=${item.id}`}>Record Transaction</Link>
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="usage" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Usage Analytics</CardTitle>
              <CardDescription>Consumption patterns and forecasting</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex h-[300px] items-center justify-center rounded-md border border-dashed">
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">Usage analytics charts will be displayed here</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
