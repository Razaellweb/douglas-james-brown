/**
 * Stripe Payment Server - Backend Implementation Guide
 * 
 * This is a guide for implementing the backend payment processing.
 * You'll need to set up a Node.js/Express server to handle:
 * 1. Payment intent creation
 * 2. Payment confirmation
 * 3. Email notifications for physical products
 * 
 * Below is the implementation structure you should follow.
 */

// ============================================================================
// REQUIRED DEPENDENCIES
// ============================================================================
// npm install express stripe nodemailer cors dotenv body-parser

// ============================================================================
// ENVIRONMENT VARIABLES (.env)
// ============================================================================
/*
STRIPE_SECRET_KEY=sk_test_YOUR_SECRET_KEY
STRIPE_PUBLIC_KEY=pk_test_YOUR_PUBLIC_KEY
STRIPE_WEBHOOK_SECRET=whsec_YOUR_WEBHOOK_SECRET

EMAIL_SERVICE=gmail
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-specific-password
EMAIL_FROM=noreply@marylouwells.com

ADMIN_EMAIL=abdulazeezusman017@gmail.com
NODE_ENV=development
PORT=3000
FRONTEND_URL=http://localhost:5173
*/

// ============================================================================
// IMPLEMENTATION GUIDE
// ============================================================================

import Stripe from "stripe";
import nodemailer from "nodemailer";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Configure email transporter
const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

// ============================================================================
// API ENDPOINT: Create Payment Intent
// ============================================================================

/**
 * POST /api/stripe/create-payment-intent
 * 
 * Request body:
 * {
 *   amount: number (in cents),
 *   currency: string (e.g., "USD"),
 *   items: Array<{
 *     productId: string,
 *     quantity: number,
 *     price: number,
 *     name: string,
 *     productType: "digital" | "physical"
 *   }>,
 *   customerInfo: {
 *     email: string,
 *     name: string,
 *     address: {...}
 *   }
 * }
 * 
 * Response:
 * {
 *   clientSecret: string,
 *   paymentIntentId: string
 * }
 */
async function createPaymentIntent(req, res) {
  const { amount, currency, items, customerInfo } = req.body;

  try {
    // Validate inputs
    if (!amount || amount <= 0) {
      return res.status(400).json({ error: "Invalid amount" });
    }

    if (!customerInfo?.email || !customerInfo?.name) {
      return res.status(400).json({ error: "Missing customer information" });
    }

    // Create Stripe customer
    const customer = await stripe.customers.create({
      email: customerInfo.email,
      name: customerInfo.name,
      address: customerInfo.address,
      metadata: {
        items: JSON.stringify(items),
      },
    });

    // Create payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
      customer: customer.id,
      metadata: {
        email: customerInfo.email,
        name: customerInfo.name,
        itemCount: items.length,
        hasDigitalItems: items.some((i) => i.productType === "digital"),
        hasPhysicalItems: items.some((i) => i.productType === "physical"),
      },
      description: `Order from Mary Lou Wells - ${items.length} items`,
      statement_descriptor: "MARY LOU WELLS",
    });

    res.json({
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
    });
  } catch (error) {
    console.error("Error creating payment intent:", error);
    res.status(500).json({ error: error.message });
  }
}

// ============================================================================
// WEBHOOK ENDPOINT: Handle Stripe Events
// ============================================================================

/**
 * POST /api/stripe/webhook
 * 
 * This endpoint handles Stripe webhook events, particularly:
 * - payment_intent.succeeded: Order completed
 * - payment_intent.payment_failed: Payment failed
 */
async function handleWebhook(req, res) {
  const sig = req.headers["stripe-signature"];

  try {
    const event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );

    switch (event.type) {
      case "payment_intent.succeeded":
        await handlePaymentSuccess(event.data.object);
        break;

      case "payment_intent.payment_failed":
        await handlePaymentFailed(event.data.object);
        break;

      case "charge.refunded":
        await handleRefund(event.data.object);
        break;
    }

    res.json({ received: true });
  } catch (error) {
    console.error("Webhook error:", error);
    res.status(400).send(`Webhook Error: ${error.message}`);
  }
}

// ============================================================================
// HANDLER: Payment Succeeded
// ============================================================================

async function handlePaymentSuccess(paymentIntent) {
  const { customer, id, metadata, amount } = paymentIntent;

  try {
    // Get customer details
    const customerDetails = await stripe.customers.retrieve(customer);
    const itemsMetadata = JSON.parse(customerDetails.metadata?.items || "[]");
    const giftDataMetadata = customerDetails.metadata?.giftData ? JSON.parse(customerDetails.metadata.giftData) : null;

    // Check if this is a gift order
    if (giftDataMetadata && giftDataMetadata.isGift) {
      await sendGiftEmailToRecipient(giftDataMetadata, {
        items: itemsMetadata,
        totalAmount: amount / 100,
      });

      await sendGiftAdminNotification(giftDataMetadata, {
        items: itemsMetadata,
        totalAmount: amount / 100,
      });
    } else {
      // Check if order has physical items
      const hasPhysicalItems = itemsMetadata.some((i) => i.productType === "physical");

      // If physical items, send email to admin
      if (hasPhysicalItems) {
        await sendOrderNotificationEmail({
          paymentIntentId: id,
          customerEmail: customerDetails.email,
          customerName: customerDetails.name,
          customerAddress: customerDetails.address,
          items: itemsMetadata,
          totalAmount: amount / 100, // Convert from cents
        });
      }
    }

    // Log successful payment
    console.log(`Payment succeeded for ${customerDetails.email}: ${id}`);

    // TODO: Save order to database
    // TODO: Create user account/order record
    // TODO: Generate access tokens for digital products
    // TODO: Send customer confirmation email with download links
  } catch (error) {
    console.error("Error handling payment success:", error);
  }
}

// ============================================================================
// EMAIL HANDLER: Gift Notification
// ============================================================================

/**
 * Send gift notification email to recipient
 */
async function sendGiftEmailToRecipient(giftData, orderData) {
  const {
    recipientName,
    recipientEmail,
    senderName,
    personalMessage,
    deliveryDate,
  } = giftData;

  const { items } = orderData;
  const giftProduct = items[0]; // Assuming single product for gift

  const deliveryTime = deliveryDate 
    ? new Date(deliveryDate).toLocaleDateString('en-US', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      })
    : 'immediately';

  const emailBody = `
    <div style="font-family: 'Cormorant Garamond', serif; max-width: 600px; margin: 0 auto; background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%); padding: 40px; color: #e4d5ff;">
      <div style="text-align: center; margin-bottom: 40px;">
        <h1 style="font-size: 48px; margin: 0; color: #d4af37; font-weight: bold;">🎁</h1>
        <h2 style="font-size: 32px; margin: 10px 0; color: #d4af37;">You've Received a Gift!</h2>
        <p style="font-size: 16px; color: #b8a8d8; margin: 5px 0;">From: <strong>${senderName}</strong></p>
      </div>

      <div style="background: rgba(212, 175, 55, 0.1); border-left: 4px solid #d4af37; padding: 20px; margin: 20px 0; border-radius: 4px;">
        <h3 style="color: #d4af37; margin-top: 0;">A Special Gift for You</h3>
        <p style="font-size: 18px; color: #e4d5ff; margin: 10px 0;">
          <strong>${giftProduct.name}</strong>
        </p>
        <p style="font-size: 14px; color: #b8a8d8; margin: 10px 0;">
          ${giftProduct.description}
        </p>
      </div>

      ${personalMessage ? `
        <div style="background: rgba(180, 168, 216, 0.05); padding: 20px; margin: 20px 0; border-radius: 4px; font-style: italic;">
          <p style="color: #b8a8d8; margin: 0; font-size: 14px;">"${personalMessage}"</p>
          <p style="text-align: right; color: #8b7ba8; margin: 10px 0 0 0; font-size: 12px;">— ${senderName}</p>
        </div>
      ` : ''}

      <div style="background: rgba(212, 175, 55, 0.05); padding: 20px; margin: 20px 0; border-radius: 4px;">
        <p style="color: #b8a8d8; margin: 0;">
          <strong style="color: #d4af37;">Delivery:</strong> This gift will be sent to you ${deliveryTime}
        </p>
      </div>

      <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid rgba(212, 175, 55, 0.2);">
        <p style="color: #8b7ba8; font-size: 12px; margin: 5px 0;">
          From the Mary Lou Wells Collection
        </p>
        <p style="color: #8b7ba8; font-size: 12px; margin: 5px 0;">
          Share the magic of epic storytelling
        </p>
      </div>
    </div>
  `;

  try {
    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: recipientEmail,
      subject: `🎁 You've Received a Gift from ${senderName}!`,
      html: emailBody,
    });

    console.log(`Gift notification email sent to ${recipientEmail}`);
  } catch (error) {
    console.error("Error sending gift notification email:", error);
  }
}

/**
 * Send gift admin notification to seller
 */
async function sendGiftAdminNotification(giftData, orderData) {
  const {
    recipientName,
    recipientEmail,
    senderName,
    senderEmail,
    personalMessage,
    deliveryDate,
  } = giftData;

  const { items, totalAmount } = orderData;

  const emailBody = `
    <h2>🎁 New Gift Order</h2>
    <p><strong>From:</strong> ${senderName} (${senderEmail})</p>
    <p><strong>To:</strong> ${recipientName} (${recipientEmail})</p>
    <p><strong>Amount:</strong> $${totalAmount.toFixed(2)}</p>
    
    <h3>Gift Product</h3>
    <p>${items[0].name}</p>
    
    <h3>Personal Message</h3>
    <p>${personalMessage || '(No message included)'}</p>
    
    <h3>Delivery Date</h3>
    <p>${deliveryDate || 'Immediate delivery'}</p>
    
    <p>The recipient has been notified via email.</p>
  `;

  try {
    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: process.env.ADMIN_EMAIL,
      subject: `Gift Order - ${senderName} → ${recipientName}`,
      html: emailBody,
    });

    console.log(`Gift admin notification sent for ${recipientEmail}`);
  } catch (error) {
    console.error("Error sending gift admin notification:", error);
  }
}

// ============================================================================
// EMAIL HANDLER: Order Notification
// ============================================================================

/**
 * Send order notification email to admin for physical products
 */
async function sendOrderNotificationEmail(orderData) {
  const {
    paymentIntentId,
    customerEmail,
    customerName,
    customerAddress,
    items,
    totalAmount,
  } = orderData;

  const physicalItems = items.filter((i) => i.productType === "physical");

  if (physicalItems.length === 0) {
    return; // No physical items, no need to send admin email
  }

  const emailBody = `
    <h2>New Order from Mary Lou Wells Shop</h2>
    <p><strong>Payment ID:</strong> ${paymentIntentId}</p>
    
    <h3>Customer Information</h3>
    <p>
      <strong>Name:</strong> ${customerName}<br>
      <strong>Email:</strong> ${customerEmail}
    </p>
    
    <h3>Delivery Address</h3>
    <p>
      ${customerAddress.line1}<br>
      ${customerAddress.line2 ? customerAddress.line2 + "<br>" : ""}
      ${customerAddress.city}, ${customerAddress.state} ${customerAddress.postal_code}<br>
      ${customerAddress.country}
    </p>
    
    <h3>Physical Items to Ship</h3>
    <ul>
      ${physicalItems
        .map(
          (item) => `
        <li>
          ${item.name} (Qty: ${item.quantity}) - $${(item.price * item.quantity).toFixed(2)}
        </li>
      `
        )
        .join("")}
    </ul>
    
    <h3>Order Total</h3>
    <p><strong>$${totalAmount.toFixed(2)}</strong></p>
    
    <p>Please process this order for shipment.</p>
  `;

  try {
    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: process.env.ADMIN_EMAIL,
      subject: `New Order - ${customerName} (${paymentIntentId})`,
      html: emailBody,
    });

    console.log(`Order notification email sent for ${paymentIntentId}`);
  } catch (error) {
    console.error("Error sending order notification email:", error);
  }
}

// ============================================================================
// HANDLER: Payment Failed
// ============================================================================

async function handlePaymentFailed(paymentIntent) {
  const { customer, id } = paymentIntent;

  try {
    const customerDetails = await stripe.customers.retrieve(customer);

    // TODO: Send failure notification to customer
    console.log(`Payment failed for ${customerDetails.email}: ${id}`);
  } catch (error) {
    console.error("Error handling payment failure:", error);
  }
}

// ============================================================================
// HANDLER: Refund
// ============================================================================

async function handleRefund(charge) {
  const { payment_intent } = charge;

  try {
    console.log(`Refund processed for payment intent: ${payment_intent}`);

    // TODO: Update order status in database
    // TODO: Send refund confirmation email to customer
  } catch (error) {
    console.error("Error handling refund:", error);
  }
}

// ============================================================================
// EXPRESS SERVER SETUP
// ============================================================================

/*
import express from "express";
import cors from "cors";

const app = express();

// Middleware
app.use(cors({ origin: process.env.FRONTEND_URL }));
app.use(express.json());

// Routes
app.post("/api/stripe/create-payment-intent", createPaymentIntent);
app.post("/api/stripe/webhook", express.raw({type: 'application/json'}), handleWebhook);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Payment server running on port ${PORT}`);
});
*/

// ============================================================================
// DEPLOYMENT CHECKLIST
// ============================================================================

/*
BEFORE GOING TO PRODUCTION:

1. Stripe Setup:
   - [ ] Create Stripe account
   - [ ] Generate API keys (public and secret)
   - [ ] Set up Stripe webhook
   - [ ] Configure webhook endpoint URL

2. Email Setup:
   - [ ] Set up email service (Gmail with app password, SendGrid, Mailgun, etc.)
   - [ ] Configure sender email address
   - [ ] Test email sending

3. Database:
   - [ ] Set up database for storing orders
   - [ ] Create order table schema
   - [ ] Create digital access table for download links

4. Security:
   - [ ] Enable HTTPS
   - [ ] Set up environment variables on server
   - [ ] Verify webhook signature validation
   - [ ] Implement rate limiting
   - [ ] Add CSRF protection

5. Testing:
   - [ ] Test payment flow with Stripe test keys
   - [ ] Test email notifications
   - [ ] Test digital product delivery
   - [ ] Test physical product order notifications
   - [ ] Test refund handling

6. Monitoring:
   - [ ] Set up error logging
   - [ ] Monitor Stripe events
   - [ ] Set up alerts for failed payments
   - [ ] Monitor email delivery

7. Documentation:
   - [ ] Document API endpoints
   - [ ] Document database schema
   - [ ] Document deployment process
*/

export { 
  createPaymentIntent, 
  handleWebhook, 
  handlePaymentSuccess, 
  sendOrderNotificationEmail,
  sendGiftEmailToRecipient,
  sendGiftAdminNotification
};
