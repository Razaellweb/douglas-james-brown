// Stripe configuration and utilities
// In production, use environment variables to store your Stripe key

export const STRIPE_PUBLIC_KEY = import.meta.env.VITE_STRIPE_PUBLIC_KEY || "";

export const STRIPE_API_URL = "/api/stripe";

export interface CreatePaymentIntentRequest {
  amount: number;
  currency: string;
  items: Array<{
    productId: string;
    quantity: number;
    price: number;
    name: string;
    productType: "digital" | "physical";
  }>;
  customerInfo: {
    email: string;
    name: string;
    address?: {
      line1: string;
      line2?: string;
      city: string;
      state: string;
      postal_code: string;
      country: string;
    };
  };
}

export interface PaymentIntentResponse {
  clientSecret: string;
  paymentIntentId: string;
}

export interface PaymentConfirmation {
  success: boolean;
  paymentIntentId: string;
  hasDigitalItems: boolean;
  hasPhysicalItems: boolean;
  message?: string;
  error?: string;
}

// Helper to format price for Stripe (cents)
export const formatPriceForStripe = (price: number): number => {
  return Math.round(price * 100);
};

// Helper to format price from Stripe (cents to dollars)
export const formatPriceFromStripe = (cents: number): number => {
  return cents / 100;
};
