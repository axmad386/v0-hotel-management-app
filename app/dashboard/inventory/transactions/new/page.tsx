"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"

// Sample inventory items data
const sampleInventoryItems = [
  { id: "1", name: "Bath Towels", sku: "BT-001", category: "Linens", currentStock: 150 },
  { id: "2", name: "Hand Soap", sku: "HS-002", category: "Toiletries", currentStock: 200 },
  { id: "3", name: "Toilet Paper", sku: "TP-003", category: "Toiletries", currentStock: 300 },
  { id: "4", name: "Bed Sheets", sku: "BS-004", category: "Linens", currentStock: 100 },
  { id: "5", name: "Pillowcases", sku: "PC-005", category: "Linens", currentStock: 200 },
  { id: "6", name: "Shampoo", sku: "SH-006", category: "Toiletries", currentStock: 250 },
  { id: "7", name: "Coffee Pods", sku: "CP-007", category: "Food & Beverage", currentStock: 500 },
  { id: "8", name: "Cleaning Solution", sku: "CS-008", category: "Cleaning", currentStock: 75 },
]

// Sample suppliers data
const sampleSuppliers = [
  { id: "1", name: "Linen Supply Co." },
  { id: "2", name: "Toiletry Wholesale" },
  { id: "3", name: "Cleaning Products Inc." },
  { id: "4", name: "Food & Beverage Distributors" },
]

// Sample rooms data
const sampleRooms = [
  { id: "1", name: "101", type: "Standard" },
  { id: "2", name: "102", type: "Standard" },
  { id: "3", name: "201", type: "Deluxe" },
  { id: "4", name: "202", type: "Deluxe" },
  { id: "5", name: "301", type: "Suite" },
]

// Form schema with validation
const formSchema = z.object({
  itemId: z.string({ required_error: "Please select an item." }),
  type: z.enum(["received", "used", "transferred", "adjusted", "damaged"], {
    required_error: "Please select a transaction type.",
  }),
  quantity: z.coerce.number().positive({ message: "Quantity must be a positive number." }),
  date: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Please enter a valid date.",
  }),
  notes: z.string().optional(),
  cost: z.coerce.number().optional(),
  supplierId: z.string().optional(),
  invoiceNumber: z.string().optional(),
  roomId: z.string().optional(),
  propertyId: z.string().default("1"),
})

export default function RecordInventoryTransactionPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [items, setItems] = useState(sampleInventoryItems)
  const [selectedItem, setSelectedItem] = useState<any>(null)

  // Get the itemId from the URL query parameters
  const itemIdFromQuery = searchParams.get("itemId")

  // Initialize form with react-hook-form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      itemId: itemIdFromQuery || "",
      type: "received",
      quantity: 1,
      date: new Date().toISOString().split("T")[0],
      notes: "",
      cost: undefined,
      supplierId: "",
      invoiceNumber: "",
      roomId: "",
      propertyId: "1",
    },
  })

  // Watch for changes to the itemId and type fields
  const watchItemId = form.watch("itemId")
  const watchType = form.watch("type")

  // Update the selected item when the itemId changes
  useEffect(() => {
    if (watchItemId) {
      const item = items.find((i) => i.id === watchItemId)
      setSelectedItem(item)
    } else {
      setSelectedItem(null)
    }
  }, [watchItemId, items])

  // Handle form submission
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      console.log("Transaction recorded:", values)

      toast({
        title: "Success",
        description: "Inventory transaction has been recorded.",
      })

      // Redirect to inventory page after successful submission
      if (values.itemId) {
        router.push(`/dashboard/inventory/items/${values.itemId}`)
      } else {
        router.push("/dashboard/inventory")
      }
    } catch (error) {
      console.error("Error recording transaction:", error)
      toast({
        title: "Error",
        description: "Failed to record inventory transaction. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="container mx-auto py-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" asChild>
            <Link href="/dashboard/inventory">
              <ArrowLeft className="h-4 w-4" />
              <span className="sr-only">Back</span>
            </Link>
          </Button>
          <h1 className="text-2xl font-bold tracking-tight">Record Inventory Transaction</h1>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Transaction Details</CardTitle>
          <CardDescription>
            Record a new inventory transaction such as receiving new stock, using items, or adjusting inventory.
          </CardDescription>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="itemId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Item</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select an item" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {items.map((item) => (
                            <SelectItem key={item.id} value={item.id}>
                              {item.name} ({item.sku})
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Transaction Type</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select transaction type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="received">Received</SelectItem>
                          <SelectItem value="used">Used</SelectItem>
                          <SelectItem value="transferred">Transferred</SelectItem>
                          <SelectItem value="adjusted">Adjusted</SelectItem>
                          <SelectItem value="damaged">Damaged/Discarded</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="quantity"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Quantity</FormLabel>
                      <FormControl>
                        <Input type="number" min="1" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Date</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {watchType === "received" && (
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="cost"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Cost (Total)</FormLabel>
                        <FormControl>
                          <Input type="number" step="0.01" min="0" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="supplierId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Supplier</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a supplier" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {sampleSuppliers.map((supplier) => (
                              <SelectItem key={supplier.id} value={supplier.id}>
                                {supplier.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="invoiceNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Invoice Number</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              )}

              {(watchType === "used" || watchType === "transferred") && (
                <FormField
                  control={form.control}
                  name="roomId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Room</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a room" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {sampleRooms.map((room) => (
                            <SelectItem key={room.id} value={room.id}>
                              Room {room.name} ({room.type})
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              <FormField
                control={form.control}
                name="notes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Notes</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Add any additional information about this transaction"
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex justify-end gap-2">
                <Button variant="outline" asChild>
                  <Link href="/dashboard/inventory">Cancel</Link>
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Recording..." : "Record Transaction"}
                </Button>
              </div>
            </CardContent>
          </form>
        </Form>
      </Card>
    </div>
  )
}
