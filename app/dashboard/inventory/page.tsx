"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Package, PackagePlus, AlertTriangle, BarChart3, Plus } from "lucide-react"
import { DataTable } from "@/components/data-table/data-table"
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header"
import { sampleInventoryItems } from "@/lib/models/inventory"

export default function InventoryDashboardPage() {
  const [inventoryItems, setInventoryItems] = useState(sampleInventoryItems)

  // Calculate inventory statistics
  const totalItems = inventoryItems.length
  const lowStockItems = inventoryItems.filter((item) => item.currentStock <= item.reorderPoint).length
  const totalValue = inventoryItems.reduce((sum, item) => sum + item.currentStock * item.costPerUnit, 0)

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount)
  }

  // Define columns for the inventory items table
  const columns = [
    {
      accessorKey: "name",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Item Name" />,
      cell: ({ row }) => (
        <div className="font-medium">
          <Link href={`/dashboard/inventory/items/${row.original.id}`} className="hover:underline">
            {row.getValue("name")}
          </Link>
        </div>
      ),
    },
    {
      accessorKey: "sku",
      header: ({ column }) => <DataTableColumnHeader column={column} title="SKU" />,
    },
    {
      accessorKey: "categoryId",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Category" />,
      cell: ({ row }) => {
        const categoryId = row.getValue("categoryId") as string
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
        return <div>{categoryMap[categoryId] || categoryId}</div>
      },
      filterFn: (row, id, value) => {
        return value.includes(row.getValue(id))
      },
    },
    {
      accessorKey: "currentStock",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Current Stock" />,
      cell: ({ row }) => {
        const stock = Number.parseInt(row.getValue("currentStock"))
        const reorderPoint = Number.parseInt(row.original.reorderPoint)

        return (
          <div className="flex items-center gap-2">
            {stock <= reorderPoint && (
              <Badge variant="destructive" className="h-5 px-1.5">
                Low
              </Badge>
            )}
            <span>
              {stock} {row.original.unitOfMeasure}s
            </span>
          </div>
        )
      },
    },
    {
      accessorKey: "reorderPoint",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Reorder Point" />,
      cell: ({ row }) => (
        <div>
          {row.getValue("reorderPoint")} {row.original.unitOfMeasure}s
        </div>
      ),
    },
    {
      accessorKey: "costPerUnit",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Cost Per Unit" />,
      cell: ({ row }) => <div>{formatCurrency(row.getValue("costPerUnit"))}</div>,
    },
    {
      accessorKey: "value",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Total Value" />,
      cell: ({ row }) => {
        const stock = Number.parseInt(row.original.currentStock)
        const cost = Number.parseFloat(row.original.costPerUnit)
        const value = stock * cost
        return <div>{formatCurrency(value)}</div>
      },
    },
    {
      accessorKey: "location",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Location" />,
      filterFn: (row, id, value) => {
        return value.includes(row.getValue(id))
      },
    },
    {
      accessorKey: "lastRestocked",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Last Restocked" />,
      cell: ({ row }) => {
        const date = row.original.lastRestocked
        return <div>{date ? new Date(date).toLocaleDateString() : "N/A"}</div>
      },
    },
  ]

  return (
    <div className="flex flex-col gap-4 p-4 md:gap-8 md:p-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Inventory Management</h1>
        <div className="flex items-center gap-2">
          <Button asChild>
            <Link href="/dashboard/inventory/items/new">
              <Plus className="mr-2 h-4 w-4" />
              Add Item
            </Link>
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Items</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalItems}</div>
            <p className="text-xs text-muted-foreground">Across all categories</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Low Stock Items</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{lowStockItems}</div>
            <p className="text-xs text-muted-foreground">Items below reorder point</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Value</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(totalValue)}</div>
            <p className="text-xs text-muted-foreground">Current inventory value</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Orders</CardTitle>
            <PackagePlus className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">Orders awaiting delivery</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="all-items" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all-items">All Items</TabsTrigger>
          <TabsTrigger value="low-stock">Low Stock</TabsTrigger>
          <TabsTrigger value="categories">Categories</TabsTrigger>
          <TabsTrigger value="suppliers">Suppliers</TabsTrigger>
        </TabsList>
        <TabsContent value="all-items" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Inventory Items</CardTitle>
              <CardDescription>Manage your inventory items and stock levels</CardDescription>
            </CardHeader>
            <CardContent>
              <DataTable columns={columns} data={inventoryItems} searchPlaceholder="Search items..." />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="low-stock" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Low Stock Items</CardTitle>
              <CardDescription>Items that need to be reordered soon</CardDescription>
            </CardHeader>
            <CardContent>
              <DataTable
                columns={columns}
                data={inventoryItems.filter((item) => item.currentStock <= item.reorderPoint)}
                searchPlaceholder="Search low stock items..."
              />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="categories" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Inventory Categories</CardTitle>
                <CardDescription>Manage your inventory categories</CardDescription>
              </div>
              <Button asChild size="sm">
                <Link href="/dashboard/inventory/categories/new">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Category
                </Link>
              </Button>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {[
                  { id: "1", name: "Linens", count: 2, value: 4798.8 },
                  { id: "2", name: "Toiletries", count: 3, value: 1255.7 },
                  { id: "3", name: "Cleaning Supplies", count: 1, value: 269.55 },
                  { id: "4", name: "Furniture", count: 0, value: 0 },
                  { id: "5", name: "Electronics", count: 0, value: 0 },
                  { id: "6", name: "Kitchen Supplies", count: 0, value: 0 },
                  { id: "7", name: "Maintenance", count: 1, value: 321.75 },
                  { id: "8", name: "Amenities", count: 1, value: 225.0 },
                ].map((category) => (
                  <Card key={category.id}>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">{category.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-sm text-muted-foreground">
                        <div className="flex justify-between py-1">
                          <span>Items:</span>
                          <span className="font-medium text-foreground">{category.count}</span>
                        </div>
                        <div className="flex justify-between py-1">
                          <span>Total Value:</span>
                          <span className="font-medium text-foreground">{formatCurrency(category.value)}</span>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" className="mt-4 w-full" asChild>
                        <Link href={`/dashboard/inventory/categories/${category.id}`}>View Items</Link>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="suppliers" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Suppliers</CardTitle>
                <CardDescription>Manage your inventory suppliers</CardDescription>
              </div>
              <Button asChild size="sm">
                <Link href="/dashboard/inventory/suppliers/new">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Supplier
                </Link>
              </Button>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {[
                  { id: "1", name: "Linen Suppliers Inc.", items: 2, contact: "John Smith", phone: "555-123-4567" },
                  { id: "2", name: "Clean & Fresh Co.", items: 3, contact: "Sarah Johnson", phone: "555-987-6543" },
                  { id: "3", name: "CleanPro Supplies", items: 1, contact: "Mike Wilson", phone: "555-456-7890" },
                  { id: "4", name: "ElectroParts Ltd.", items: 1, contact: "Lisa Chen", phone: "555-789-0123" },
                  { id: "5", name: "Gourmet Supplies Co.", items: 1, contact: "David Brown", phone: "555-234-5678" },
                ].map((supplier) => (
                  <Card key={supplier.id}>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">{supplier.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-sm text-muted-foreground">
                        <div className="flex justify-between py-1">
                          <span>Contact:</span>
                          <span className="font-medium text-foreground">{supplier.contact}</span>
                        </div>
                        <div className="flex justify-between py-1">
                          <span>Phone:</span>
                          <span className="font-medium text-foreground">{supplier.phone}</span>
                        </div>
                        <div className="flex justify-between py-1">
                          <span>Items Supplied:</span>
                          <span className="font-medium text-foreground">{supplier.items}</span>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" className="mt-4 w-full" asChild>
                        <Link href={`/dashboard/inventory/suppliers/${supplier.id}`}>View Details</Link>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
