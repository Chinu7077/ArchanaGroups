import {
  pgTable,
  text,
  serial,
  integer,
  boolean,
  timestamp,
  decimal,
  varchar,
  date,
  index,
  unique,
  uuid,
  jsonb,
  bigint,
  doublePrecision,
} from 'drizzle-orm/pg-core';
import { relations, sql } from 'drizzle-orm';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';

// Common validation patterns
const commonValidations = {
  email: z.string().email('Invalid email address').or(z.literal('')),
  phone: z
    .string()
    .regex(/^\+?[\d\s\-\(\)]+$/, 'Invalid phone number format')
    .or(z.literal('')),
  nonEmptyString: (message: string) => z.string().min(1, message),
  positiveDecimal: (message: string) =>
    z.string().regex(/^\d+(\.\d{1,3})?$/, message),
  uppercaseString: (message: string) =>
    z
      .string()
      .min(1, message)
      .transform((val) => val.toUpperCase()),
  partnerIdFormat: z
    .string()
    .regex(
      /^[A-Z]{1,3}\d{4}$/,
      'Partner ID must be in format: initials + 4 digits'
    ),
};

// Partners table - stores partner credentials and info
export const partners = pgTable(
  'partners',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    name: text('name').notNull(),
    partnerId: text('partner_id').notNull(), // Format: initials + 4 digits (e.g., "JD1234")
    password: text('password').notNull(), // Hashed password
    email: text('email'), // Optional email
    phone: text('phone'), // Optional phone
    isActive: boolean('is_active').default(true).notNull(),
    metadata: jsonb('metadata'), // Additional partner data
    createdAt: timestamp('created_at', { withTimezone: true })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp('updated_at', { withTimezone: true })
      .defaultNow()
      .notNull()
      .$onUpdate(() => new Date()),
    lastLogin: timestamp('last_login', { withTimezone: true }),
  },
  (table) => [
    // Indexes for better query performance
    unique('partners_partner_id_unique').on(table.partnerId),
    index('partners_name_idx').on(table.name),
    index('partners_is_active_idx').on(table.isActive),
    index('partners_created_at_idx').on(table.createdAt),
  ]
);

// Admins table - stores admin credentials
export const admins = pgTable(
  'admins',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    username: text('username').notNull(),
    password: text('password').notNull(), // Hashed password
    email: text('email'), // Optional email
    fullName: text('full_name'), // Admin's full name
    role: text('role').default('admin').notNull(), // super_admin, admin, etc.
    isActive: boolean('is_active').default(true).notNull(),
    permissions: jsonb('permissions'), // Admin permissions as JSON
    createdAt: timestamp('created_at', { withTimezone: true })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp('updated_at', { withTimezone: true })
      .defaultNow()
      .notNull()
      .$onUpdate(() => new Date()),
    lastLogin: timestamp('last_login', { withTimezone: true }),
  },
  (table) => [
    // Indexes for better query performance
    unique('admins_username_unique').on(table.username),
    index('admins_role_idx').on(table.role),
    index('admins_is_active_idx').on(table.isActive),
    index('admins_created_at_idx').on(table.createdAt),
  ]
);

// Dispatch Data table - stores unload/dispatch information
export const dispatchData = pgTable(
  'dispatch_data',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    date: date('date').notNull(),
    vehicleNumber: text('vehicle_number').notNull(),
    material: text('material').notNull(),
    quantity: decimal('quantity', { precision: 12, scale: 3 }).notNull(), // In tons with higher precision
    destination: text('destination').notNull(),
    ownerName: text('owner_name').notNull(), // Used to link to partners
    partnerId: uuid('partner_id').references(() => partners.id),
    // Additional fields for better tracking
    driverName: text('driver_name'),
    driverPhone: text('driver_phone'),
    loadingTime: timestamp('loading_time', { withTimezone: true }),
    unloadingTime: timestamp('unloading_time', { withTimezone: true }),
    status: text('status').default('pending').notNull(), // pending, in_transit, delivered, cancelled
    notes: text('notes'),
    metadata: jsonb('metadata'), // Additional dispatch data
    createdAt: timestamp('created_at', { withTimezone: true })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp('updated_at', { withTimezone: true })
      .defaultNow()
      .notNull()
      .$onUpdate(() => new Date()),
  },
  (table) => [
    // Indexes for better query performance
    index('dispatch_data_date_idx').on(table.date),
    index('dispatch_data_vehicle_idx').on(table.vehicleNumber),
    index('dispatch_data_partner_idx').on(table.partnerId),
    index('dispatch_data_material_idx').on(table.material),
    index('dispatch_data_status_idx').on(table.status),
    index('dispatch_data_owner_name_idx').on(table.ownerName),
    index('dispatch_data_created_at_idx').on(table.createdAt),
  ]
);

// Diesel Data table - stores diesel consumption information
export const dieselData = pgTable(
  'diesel_data',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    date: date('date').notNull(),
    vehicleNumber: text('vehicle_number').notNull(),
    volume: decimal('volume', { precision: 10, scale: 3 }).notNull(), // In liters with higher precision
    item: text('item').notNull(), // Type of fuel/item
    fuelStation: text('fuel_station').notNull(),
    status: text('status').notNull(), // Status of the transaction
    partnerId: uuid('partner_id').references(() => partners.id),
    // Additional fields for better tracking
    pricePerLiter: doublePrecision('price_per_liter'), // Price per liter - using double precision for better performance
    totalAmount: doublePrecision('total_amount'), // Total cost - using double precision for better performance
    driverName: text('driver_name'),
    fuelType: text('fuel_type').default('diesel').notNull(), // diesel, petrol, etc.
    odometer: bigint('odometer', { mode: 'number' }), // Vehicle odometer reading
    billNumber: text('bill_number'), // Fuel station bill number
    notes: text('notes'),
    metadata: jsonb('metadata'), // Additional fuel data
    createdAt: timestamp('created_at', { withTimezone: true })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp('updated_at', { withTimezone: true })
      .defaultNow()
      .notNull()
      .$onUpdate(() => new Date()),
  },
  (table) => [
    // Indexes for better query performance
    index('diesel_data_date_idx').on(table.date),
    index('diesel_data_vehicle_idx').on(table.vehicleNumber),
    index('diesel_data_partner_idx').on(table.partnerId),
    index('diesel_data_fuel_station_idx').on(table.fuelStation),
    index('diesel_data_status_idx').on(table.status),
    index('diesel_data_fuel_type_idx').on(table.fuelType),
    index('diesel_data_created_at_idx').on(table.createdAt),
  ]
);

export const supportQueries = pgTable('support_queries', {
  id: uuid('id').defaultRandom().primaryKey(),
  partnerId: uuid('partner_id').references(() => partners.id, { onDelete: 'cascade' }),
  subject: text('subject').notNull(),
  message: text('message').notNull(),
  status: text('status').notNull().default('pending'),  // pending, in_progress, resolved
  priority: text('priority').notNull().default('normal'),  // low, normal, high
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
  resolvedAt: timestamp('resolved_at'),
  response: text('response'),
});

// Relations
export const partnersRelations = relations(partners, ({ many }) => ({
  dispatchData: many(dispatchData),
  dieselData: many(dieselData),
}));

export const dispatchDataRelations = relations(dispatchData, ({ one }) => ({
  partner: one(partners, {
    fields: [dispatchData.partnerId],
    references: [partners.id],
  }),
}));

export const dieselDataRelations = relations(dieselData, ({ one }) => ({
  partner: one(partners, {
    fields: [dieselData.partnerId],
    references: [partners.id],
  }),
}));

// Enhanced Zod schemas with improved validation patterns
export const insertPartnerSchema = createInsertSchema(partners, {
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be less than 100 characters')
    .transform((val) => val.trim().replace(/\s+/g, ' ')), // Normalize whitespace
  partnerId: commonValidations.partnerIdFormat,
  email: commonValidations.email.optional(),
  phone: commonValidations.phone.optional(),
}).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  lastLogin: true,
});

export const selectPartnerSchema = createSelectSchema(partners);

export const insertAdminSchema = createInsertSchema(admins, {
  username: z
    .string()
    .min(3, 'Username must be at least 3 characters')
    .max(50, 'Username must be less than 50 characters')
    .regex(
      /^[a-zA-Z0-9_]+$/,
      'Username can only contain letters, numbers, and underscores'
    ),
  email: commonValidations.email.optional(),
  fullName: z
    .string()
    .min(2, 'Full name must be at least 2 characters')
    .optional()
    .or(z.literal('')),
  role: z.enum(['super_admin', 'admin']).default('admin'),
}).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  lastLogin: true,
});

export const selectAdminSchema = createSelectSchema(admins);

export const insertDispatchDataSchema = createInsertSchema(dispatchData, {
  vehicleNumber: commonValidations.uppercaseString(
    'Vehicle number is required'
  ),
  material: commonValidations.nonEmptyString('Material is required'),
  quantity: commonValidations.positiveDecimal('Invalid quantity format'),
  destination: commonValidations.nonEmptyString('Destination is required'),
  ownerName: commonValidations.nonEmptyString('Owner name is required'),
  status: z
    .enum(['pending', 'in_transit', 'delivered', 'cancelled'])
    .default('pending'),
  driverName: z.string().optional().or(z.literal('')),
  driverPhone: commonValidations.phone.optional(),
}).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const selectDispatchDataSchema = createSelectSchema(dispatchData);

export const insertDieselDataSchema = createInsertSchema(dieselData, {
  vehicleNumber: commonValidations.uppercaseString(
    'Vehicle number is required'
  ),
  volume: commonValidations.positiveDecimal('Invalid volume format'),
  item: commonValidations.nonEmptyString('Item is required'),
  fuelStation: commonValidations.nonEmptyString('Fuel station is required'),
  status: commonValidations.nonEmptyString('Status is required'),
  fuelType: z.enum(['diesel', 'petrol', 'cng', 'other']).default('diesel'),
  pricePerLiter: z
    .string()
    .regex(/^\d+(\.\d{1,2})?$/, 'Invalid price format')
    .optional()
    .or(z.literal('')),
  driverName: z.string().optional().or(z.literal('')),
  billNumber: z.string().optional().or(z.literal('')),
}).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const selectDieselDataSchema = createSelectSchema(dieselData);

// Authentication schemas with enhanced validation
export const loginSchema = z.object({
  username: z
    .string()
    .min(1, 'Username is required')
    .min(3, 'Username must be at least 3 characters')
    .max(50, 'Username must be less than 50 characters')
    .regex(
      /^[a-zA-Z0-9_]+$/,
      'Username can only contain letters, numbers, and underscores'
    ),
  password: z
    .string()
    .min(1, 'Password is required')
    .min(6, 'Password must be at least 6 characters')
    .max(128, 'Password must be less than 128 characters'),
});

export const partnerLoginSchema = z.object({
  partnerId: commonValidations.partnerIdFormat.transform((val) =>
    val.toUpperCase()
  ),
  password: z
    .string()
    .min(1, 'Password is required')
    .min(6, 'Password must be at least 6 characters')
    .max(128, 'Password must be less than 128 characters'),
});

// Data filtering schemas with enhanced validation
export const dataFilterSchema = z
  .object({
    month: z
      .number()
      .min(1, 'Invalid month')
      .max(12, 'Invalid month')
      .default(new Date().getMonth() + 1),
    year: z
      .number()
      .min(2020, 'Year must be 2020 or later')
      .max(2030, 'Year must be 2030 or earlier')
      .default(new Date().getFullYear()),
    dateRange: z
      .enum(['1-15', '16-31', 'all'], {
        message: 'Please select a valid date range',
      })
      .default('all'),
  })
  .refine(
    (data) => {
      // Validate that the selected month/year combination is not in the future
      const currentDate = new Date();
      const selectedDate = new Date(data.year, data.month - 1);
      return selectedDate <= currentDate;
    },
    {
      message: 'Cannot select future dates',
      path: ['month'], // Show error on month field
    }
  );

// TypeScript types
export type Partner = typeof partners.$inferSelect;
export type Admin = typeof admins.$inferSelect;
export type DispatchData = typeof dispatchData.$inferSelect;
export type DieselData = typeof dieselData.$inferSelect;

export type InsertPartner = z.infer<typeof insertPartnerSchema>;
export type InsertAdmin = z.infer<typeof insertAdminSchema>;
export type InsertDispatchData = z.infer<typeof insertDispatchDataSchema>;
export type InsertDieselData = z.infer<typeof insertDieselDataSchema>;

export type LoginData = z.infer<typeof loginSchema>;
export type PartnerLoginData = z.infer<typeof partnerLoginSchema>;
export type DataFilter = z.infer<typeof dataFilterSchema>;
