/**
 * Centralized validation utilities using Zod
 * Following modern Zod patterns and best practices
 */

import { z } from 'zod';

// Common validation patterns that can be reused across the application
export const commonValidations = {
  // String validations
  nonEmptyString: (fieldName: string) =>
    z.string().min(1, `${fieldName} is required`),

  trimmedString: (fieldName: string, minLength = 1, maxLength = 255) =>
    z
      .string()
      .min(minLength, `${fieldName} must be at least ${minLength} characters`)
      .max(maxLength, `${fieldName} must be less than ${maxLength} characters`)
      .transform((val) => val.trim().replace(/\s+/g, ' ')),

  // Email validation with optional empty string support
  optionalEmail: z
    .string()
    .optional()
    .or(z.literal(''))
    .refine((val) => !val || z.string().email().safeParse(val).success, {
      message: 'Please enter a valid email address',
    }),

  requiredEmail: z.string().email('Please enter a valid email address'),

  // Phone validation with international format support
  optionalPhone: z
    .string()
    .optional()
    .or(z.literal(''))
    .refine((val) => !val || /^\+?[\d\s\-\(\)]+$/.test(val), {
      message: 'Please enter a valid phone number',
    }),

  requiredPhone: z
    .string()
    .min(1, 'Phone number is required')
    .regex(/^\+?[\d\s\-\(\)]+$/, 'Please enter a valid phone number'),

  // Username validation
  username: z
    .string()
    .min(3, 'Username must be at least 3 characters')
    .max(50, 'Username must be less than 50 characters')
    .regex(
      /^[a-zA-Z0-9_]+$/,
      'Username can only contain letters, numbers, and underscores'
    ),

  // Password validation
  password: z
    .string()
    .min(6, 'Password must be at least 6 characters')
    .max(128, 'Password must be less than 128 characters'),

  // Partner ID validation
  partnerId: z
    .string()
    .regex(
      /^[A-Z]{1,3}\d{4}$/,
      'Partner ID must be in format: initials + 4 digits (e.g., JD1234)'
    )
    .transform((val) => val.toUpperCase()),

  // UUID validation
  uuid: z.string().uuid('Invalid ID format'),

  // Numeric validations
  positiveInteger: (fieldName: string) =>
    z.number().positive(`${fieldName} must be a positive number`),

  numberInRange: (fieldName: string, min: number, max: number) =>
    z
      .number()
      .min(min, `${fieldName} must be at least ${min}`)
      .max(max, `${fieldName} must be at most ${max}`),

  // Decimal string validation (for monetary/quantity values)
  positiveDecimal: (fieldName: string, decimalPlaces = 3) =>
    z
      .string()
      .regex(
        new RegExp(`^\\d+(\\.\\d{1,${decimalPlaces}})?$`),
        `Invalid ${fieldName} format`
      ),

  // Vehicle number validation
  vehicleNumber: z
    .string()
    .min(1, 'Vehicle number is required')
    .transform((val) => val.toUpperCase()),

  // Date validation helpers
  pastOrPresentDate: z.date().max(new Date(), 'Date cannot be in the future'),

  futureDate: z.date().min(new Date(), 'Date must be in the future'),

  // Enum validation with better error messages
  createEnum: <T extends string>(values: readonly T[], fieldName: string) =>
    z.enum(values as [T, ...T[]], {
      message: `Please select a valid ${fieldName}`,
    }),
};

// Compound validation schemas for common use cases
export const compoundValidations = {
  // Name validation (for people/entities)
  personName: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be less than 100 characters')
    .regex(
      /^[a-zA-Z\s\.]+$/,
      'Name can only contain letters, spaces, and periods'
    )
    .transform((val) => val.trim().replace(/\s+/g, ' ')),

  // Address validation
  address: z
    .string()
    .min(5, 'Address must be at least 5 characters')
    .max(255, 'Address must be less than 255 characters')
    .transform((val) => val.trim()),

  // Date range validation
  dateRange: z
    .object({
      startDate: z.date(),
      endDate: z.date(),
    })
    .refine((data) => data.endDate >= data.startDate, {
      message: 'End date must be after start date',
      path: ['endDate'],
    }),

  // Pagination validation
  pagination: z.object({
    limit: z
      .number()
      .min(1, 'Limit must be at least 1')
      .max(100, 'Limit cannot exceed 100')
      .default(20),
    offset: z.number().min(0, 'Offset cannot be negative').default(0),
  }),
};

// Utility functions for schema composition
export const schemaUtils = {
  // Create optional field that allows empty strings
  optionalString: <T extends z.ZodTypeAny>(schema: T) =>
    schema.optional().or(z.literal('')),

  // Add transform to trim whitespace
  withTrim: <T extends z.ZodString>(schema: T) =>
    schema.transform((val) => val.trim()),

  // Add transform to normalize whitespace
  withNormalizedWhitespace: <T extends z.ZodString>(schema: T) =>
    schema.transform((val) => val.trim().replace(/\s+/g, ' ')),

  // Create a schema that validates array length
  arrayWithLength: <T extends z.ZodTypeAny>(
    itemSchema: T,
    minItems: number,
    maxItems?: number
  ) => {
    let schema = z
      .array(itemSchema)
      .min(minItems, `At least ${minItems} items required`);
    if (maxItems) {
      schema = schema.max(maxItems, `At most ${maxItems} items allowed`);
    }
    return schema;
  },
};

// Error message utilities
export const errorMessages = {
  required: (fieldName: string) => `${fieldName} is required`,
  invalid: (fieldName: string) => `Invalid ${fieldName} format`,
  tooShort: (fieldName: string, minLength: number) =>
    `${fieldName} must be at least ${minLength} characters`,
  tooLong: (fieldName: string, maxLength: number) =>
    `${fieldName} must be less than ${maxLength} characters`,
  outOfRange: (fieldName: string, min: number, max: number) =>
    `${fieldName} must be between ${min} and ${max}`,
};

export default {
  commonValidations,
  compoundValidations,
  schemaUtils,
  errorMessages,
};
