// Inventory data models

export interface InventoryCategory {
  id: string
  name: string
  description?: string
}

export interface InventoryItem {
  id: string
  name: string
  categoryId: string
  description?: string
  sku: string
  unitOfMeasure: string
  costPerUnit: number
  currentStock: number
  reorderPoint: number
  reorderQuantity: number
  location?: string
  propertyId?: string
  supplier?: string
  lastRestocked?: Date
  createdAt: Date
  updatedAt: Date
}

export interface InventoryTransaction {
  id: string
  itemId: string
  type: "received" | "used" | "transferred" | "adjusted" | "damaged"
  quantity: number
  date: Date
  notes?: string
  userId: string
  propertyId: string
  roomId?: string
  cost?: number
  supplierId?: string
  invoiceNumber?: string
}

export interface InventorySupplier {
  id: string
  name: string
  contactPerson?: string
  email?: string
  phone?: string
  address?: string
  website?: string
  notes?: string
}

// Sample data for inventory categories
export const sampleInventoryCategories: InventoryCategory[] = [
  { id: "1", name: "Linens", description: "Bed sheets, towels, pillowcases, etc." },
  { id: "2", name: "Toiletries", description: "Soaps, shampoos, toilet paper, etc." },
  { id: "3", name: "Cleaning Supplies", description: "Detergents, disinfectants, etc." },
  { id: "4", name: "Furniture", description: "Beds, chairs, tables, etc." },
  { id: "5", name: "Electronics", description: "TVs, phones, alarm clocks, etc." },
  { id: "6", name: "Kitchen Supplies", description: "Dishes, utensils, cookware, etc." },
  { id: "7", name: "Maintenance", description: "Tools, spare parts, light bulbs, etc." },
  { id: "8", name: "Amenities", description: "Coffee, tea, snacks, etc." },
]

// Sample data for inventory items
export const sampleInventoryItems: InventoryItem[] = [
  {
    id: "1",
    name: "Bath Towels",
    categoryId: "1",
    description: "Standard white bath towels",
    sku: "LIN-BT-001",
    unitOfMeasure: "piece",
    costPerUnit: 12.99,
    currentStock: 250,
    reorderPoint: 50,
    reorderQuantity: 100,
    location: "Main Storage",
    propertyId: "1",
    supplier: "Linen Suppliers Inc.",
    lastRestocked: new Date("2025-04-15"),
    createdAt: new Date("2025-01-01"),
    updatedAt: new Date("2025-04-15"),
  },
  {
    id: "2",
    name: "Hand Soap",
    categoryId: "2",
    description: "Luxury hand soap 250ml bottles",
    sku: "TOI-HS-001",
    unitOfMeasure: "bottle",
    costPerUnit: 3.49,
    currentStock: 180,
    reorderPoint: 40,
    reorderQuantity: 120,
    location: "Toiletries Storage",
    propertyId: "1",
    supplier: "Clean & Fresh Co.",
    lastRestocked: new Date("2025-04-20"),
    createdAt: new Date("2025-01-01"),
    updatedAt: new Date("2025-04-20"),
  },
  {
    id: "3",
    name: "All-Purpose Cleaner",
    categoryId: "3",
    description: "Multi-surface cleaning solution 1L bottles",
    sku: "CLN-AP-001",
    unitOfMeasure: "bottle",
    costPerUnit: 5.99,
    currentStock: 45,
    reorderPoint: 15,
    reorderQuantity: 30,
    location: "Cleaning Supply Room",
    propertyId: "1",
    supplier: "CleanPro Supplies",
    lastRestocked: new Date("2025-05-01"),
    createdAt: new Date("2025-01-01"),
    updatedAt: new Date("2025-05-01"),
  },
  {
    id: "4",
    name: "Queen Bed Sheets",
    categoryId: "1",
    description: "White 400 thread count queen size bed sheets",
    sku: "LIN-QS-001",
    unitOfMeasure: "set",
    costPerUnit: 29.99,
    currentStock: 120,
    reorderPoint: 30,
    reorderQuantity: 50,
    location: "Main Storage",
    propertyId: "1",
    supplier: "Linen Suppliers Inc.",
    lastRestocked: new Date("2025-04-10"),
    createdAt: new Date("2025-01-01"),
    updatedAt: new Date("2025-04-10"),
  },
  {
    id: "5",
    name: "Toilet Paper",
    categoryId: "2",
    description: "2-ply toilet paper rolls",
    sku: "TOI-TP-001",
    unitOfMeasure: "roll",
    costPerUnit: 0.89,
    currentStock: 350,
    reorderPoint: 100,
    reorderQuantity: 200,
    location: "Toiletries Storage",
    propertyId: "1",
    supplier: "Clean & Fresh Co.",
    lastRestocked: new Date("2025-05-05"),
    createdAt: new Date("2025-01-01"),
    updatedAt: new Date("2025-05-05"),
  },
  {
    id: "6",
    name: "Light Bulbs",
    categoryId: "7",
    description: "LED light bulbs 9W",
    sku: "MNT-LB-001",
    unitOfMeasure: "piece",
    costPerUnit: 4.29,
    currentStock: 75,
    reorderPoint: 20,
    reorderQuantity: 50,
    location: "Maintenance Room",
    propertyId: "1",
    supplier: "ElectroParts Ltd.",
    lastRestocked: new Date("2025-03-15"),
    createdAt: new Date("2025-01-01"),
    updatedAt: new Date("2025-03-15"),
  },
  {
    id: "7",
    name: "Coffee Pods",
    categoryId: "8",
    description: "Single-serve coffee pods",
    sku: "AMN-CP-001",
    unitOfMeasure: "pod",
    costPerUnit: 0.45,
    currentStock: 500,
    reorderPoint: 150,
    reorderQuantity: 300,
    location: "Amenities Storage",
    propertyId: "1",
    supplier: "Gourmet Supplies Co.",
    lastRestocked: new Date("2025-05-10"),
    createdAt: new Date("2025-01-01"),
    updatedAt: new Date("2025-05-10"),
  },
  {
    id: "8",
    name: "Shampoo",
    categoryId: "2",
    description: "Luxury shampoo 50ml bottles",
    sku: "TOI-SH-001",
    unitOfMeasure: "bottle",
    costPerUnit: 2.99,
    currentStock: 200,
    reorderPoint: 50,
    reorderQuantity: 150,
    location: "Toiletries Storage",
    propertyId: "1",
    supplier: "Clean & Fresh Co.",
    lastRestocked: new Date("2025-04-25"),
    createdAt: new Date("2025-01-01"),
    updatedAt: new Date("2025-04-25"),
  },
]

// Sample data for inventory transactions
export const sampleInventoryTransactions: InventoryTransaction[] = [
  {
    id: "1",
    itemId: "1",
    type: "received",
    quantity: 100,
    date: new Date("2025-04-15"),
    notes: "Regular monthly order",
    userId: "1",
    propertyId: "1",
    cost: 1299.0,
    supplierId: "1",
    invoiceNumber: "INV-2025-04-123",
  },
  {
    id: "2",
    itemId: "1",
    type: "used",
    quantity: 10,
    date: new Date("2025-04-20"),
    notes: "Replaced towels in rooms 101-110",
    userId: "3",
    propertyId: "1",
    roomId: "101",
  },
  {
    id: "3",
    itemId: "2",
    type: "received",
    quantity: 120,
    date: new Date("2025-04-20"),
    notes: "Regular order",
    userId: "1",
    propertyId: "1",
    cost: 418.8,
    supplierId: "2",
    invoiceNumber: "INV-2025-04-145",
  },
  {
    id: "4",
    itemId: "3",
    type: "used",
    quantity: 5,
    date: new Date("2025-05-02"),
    notes: "Used for deep cleaning",
    userId: "4",
    propertyId: "1",
  },
  {
    id: "5",
    itemId: "5",
    type: "transferred",
    quantity: 50,
    date: new Date("2025-05-05"),
    notes: "Transferred to Beach Resort property",
    userId: "1",
    propertyId: "1",
  },
]

// Sample data for inventory suppliers
export const sampleInventorySuppliers: InventorySupplier[] = [
  {
    id: "1",
    name: "Linen Suppliers Inc.",
    contactPerson: "John Smith",
    email: "john@linensuppliers.com",
    phone: "555-123-4567",
    address: "123 Textile Ave, Fabric City, FC 12345",
    website: "www.linensuppliers.com",
  },
  {
    id: "2",
    name: "Clean & Fresh Co.",
    contactPerson: "Sarah Johnson",
    email: "sarah@cleanfresh.com",
    phone: "555-987-6543",
    address: "456 Soap St, Cleanville, CV 67890",
    website: "www.cleanfresh.com",
  },
  {
    id: "3",
    name: "CleanPro Supplies",
    contactPerson: "Mike Wilson",
    email: "mike@cleanpro.com",
    phone: "555-456-7890",
    address: "789 Cleaner Rd, Sparkle Town, ST 34567",
    website: "www.cleanprosupplies.com",
  },
  {
    id: "4",
    name: "ElectroParts Ltd.",
    contactPerson: "Lisa Chen",
    email: "lisa@electroparts.com",
    phone: "555-789-0123",
    address: "321 Electric Ave, Circuit City, CC 45678",
    website: "www.electroparts.com",
  },
  {
    id: "5",
    name: "Gourmet Supplies Co.",
    contactPerson: "David Brown",
    email: "david@gourmetsupplies.com",
    phone: "555-234-5678",
    address: "654 Flavor St, Tasteville, TV 89012",
    website: "www.gourmetsupplies.com",
  },
]
