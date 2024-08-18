import { z } from 'zod';

const ISO4217CurrencyEnum = z.enum(['EUR', 'GBP', 'USD']);
const ISO3166Alpha2CountryEnum = z.enum(['GB', 'US', 'FR', 'DE']); // Add more countries as needed

const AddressSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  address1: z.string(),
  address2: z.string().optional(),
  address3: z.string().optional(),
  postalCode: z.string(),
  city: z.string(),
  state: z.string().optional(),
  countryCode: ISO3166Alpha2CountryEnum,
  phoneNumber: z.string().optional(),
});

const OrderSchema = z.object({
  merchant: z.object({
    id: z.number(),
  }),
  buyer: z.object({
    billingAddress: AddressSchema,
    isShippingEqualBilling: z.boolean(),
    shippingAddress: AddressSchema.optional(),
  }),
  value: z.object({
    currency: ISO4217CurrencyEnum,
    amount: z.number().positive(),
  }),
});

export const TransactionProcessSchema = z.object({
  paymentProcessor: z.enum(['WORLDPAY']),
  sessionUrl: z.string().url(),
  cvcUrl: z.string().url().optional(),
  order: OrderSchema,
});

export type TransactionProcessInput = z.infer<typeof TransactionProcessSchema>;