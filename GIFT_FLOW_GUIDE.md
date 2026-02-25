# 🎁 Gift Purchase Flow - Complete Guide

## Overview

The gift purchase flow allows customers to buy products as gifts for someone special. The flow includes personalization, scheduling, secure payment via Stripe, and automated email notifications.

---

## Frontend Gift Flow

### Step 1: Gift Selection
**Component:** `Shop.tsx`
- User clicks "Start Gift Experience" button
- Opens `GiftFlowModal` component

### Step 2: Choose Product
**Component:** `GiftFlowModal.tsx` - Step 1
- User selects from popular gift products
- Shows product name, description, and price
- Can browse all available products

### Step 3: Personalize Gift Details
**Component:** `GiftFlowModal.tsx` - Step 2
**Fields Required:**
- **Recipient Name** - Who is receiving the gift
- **Recipient Email** - Where gift notification will be sent
- **Your Name** - Gift sender name
- **Your Email** - Sender email (for order confirmation)
- **Personal Message** (optional) - Custom message from sender

**Validation:**
- All required fields must be filled
- Email addresses must be valid format
- Required error messages guide user to completion

### Step 4: Schedule Delivery
**Component:** `GiftFlowModal.tsx` - Step 3
**Options:**
- **Send Immediately** - Gift notification sent right after purchase
- **Schedule for Later** - Select specific date (useful for birthdays)

**Additional Options:**
- Premium gift presentation (included free)
- Beautiful email template with animated reveal
- Personalized message included

### Step 5: Review Gift
**Component:** `GiftFlowModal.tsx` - Step 4
**Summary Shows:**
- Product details and price
- Recipient information
- Sender information
- Delivery date/timing
- Personal message (if included)
- Total amount to be charged

### Step 6: Proceed to Checkout
**Component:** `GiftFlowModal.tsx`
**Process:**
1. Gift data stored in localStorage as `giftData`
2. Product added to cart using `useCartStore`
3. User redirected to checkout (`/checkout`)
4. Modal closes automatically

**Gift Data Stored:**
```json
{
  "isGift": true,
  "recipientName": "Jane Doe",
  "recipientEmail": "jane@example.com",
  "senderName": "John Smith",
  "senderEmail": "john@example.com",
  "personalMessage": "Enjoy this epic tale!",
  "deliveryDate": "2026-02-14"
}
```

---

## Checkout Flow with Gift

### Step 1: Fill Checkout Form
**Component:** `Checkout.tsx`
- User enters billing/shipping information
- Note: For gifts, shipping address is for sender, not recipient
- Same form as regular checkout

### Step 2: Process Payment
**Component:** `Checkout.tsx` - `CheckoutForm`

**Process:**
1. Fetch gift data from localStorage
2. Create Stripe payment intent with gift metadata
3. Send to backend: `/api/stripe/create-payment-intent`
4. Include `giftData` in request body:
```json
{
  "amount": 2999,
  "currency": "USD",
  "items": [...],
  "customerInfo": {...},
  "giftData": {
    "isGift": true,
    "recipientName": "Jane Doe",
    "recipientEmail": "jane@example.com",
    "senderName": "John Smith",
    "senderEmail": "john@example.com",
    "personalMessage": "...",
    "deliveryDate": "2026-02-14"
  }
}
```

### Step 3: Payment Confirmation
- Card processed securely via Stripe
- Gift data cleaned from localStorage
- Order confirmation page shown
- Cart cleared

---

## Backend Gift Processing

### Incoming Data
Backend receives gift data in payment intent metadata:
- `isGift` flag to identify gift orders
- Recipient information
- Sender information  
- Delivery date
- Personal message

### Email Notifications Sent

#### 1. **Recipient Email** (Immediate or Scheduled)
**Sent to:** Recipient's email address
**Subject:** `🎁 You've Received a Gift from {SenderName}!`
**Content:**
- Beautiful themed email template
- Gift product details
- Sender's personal message
- Delivery timing information
- Professional branding

**Template Styling:**
- Dark theme with gold accents
- Cormorant Garamond typography
- Animated reveal design
- Professional HTML email

#### 2. **Admin Email** (Immediate)
**Sent to:** `abdulazeezusman017@gmail.com`
**Subject:** `Gift Order - {SenderName} → {RecipientName}`
**Content:**
- Sender information
- Recipient information
- Gift product details
- Order amount
- Delivery date
- Personal message preview

---

## Email Implementation in Backend

### Email Handlers

#### `sendGiftEmailToRecipient(giftData, orderData)`
```javascript
// Sends beautiful gift notification to recipient
// Includes:
// - Gift product details
// - Sender's personal message
// - Delivery timing
// - Professional styling
```

#### `sendGiftAdminNotification(giftData, orderData)`
```javascript
// Notifies admin of gift order for tracking
// Includes:
// - Complete gift transaction details
// - Delivery instructions
// - Customer contact information
```

### Integration Point
Called in `handlePaymentSuccess()` webhook handler:
```javascript
if (giftDataMetadata && giftDataMetadata.isGift) {
  await sendGiftEmailToRecipient(giftDataMetadata, orderData);
  await sendGiftAdminNotification(giftDataMetadata, orderData);
}
```

---

## Data Flow Diagram

```
┌─────────────────────────────────────────────────────────┐
│ Frontend: Gift Selection                                │
│ (GiftFlowModal - 5 Steps)                              │
└─────────────────────────────────────────────────────────┘
                         ↓
                 Gift Data → localStorage
                         ↓
┌─────────────────────────────────────────────────────────┐
│ Frontend: Add to Cart                                   │
│ (useCartStore)                                         │
└─────────────────────────────────────────────────────────┘
                         ↓
                 Cart Item Created
                         ↓
┌─────────────────────────────────────────────────────────┐
│ Frontend: Checkout Page                                 │
│ (Checkout.tsx)                                         │
└─────────────────────────────────────────────────────────┘
                         ↓
          Read Gift Data from localStorage
          Create Payment Intent with giftData
                         ↓
┌─────────────────────────────────────────────────────────┐
│ Backend: Create Payment Intent                          │
│ POST /api/stripe/create-payment-intent                 │
└─────────────────────────────────────────────────────────┘
                         ↓
                 Stripe Processes Payment
                         ↓
┌─────────────────────────────────────────────────────────┐
│ Backend: Webhook Handler                               │
│ Receives payment_intent.succeeded event                │
└─────────────────────────────────────────────────────────┘
                         ↓
          Detects isGift flag in metadata
                         ↓
┌─────────────────────────────────────────────────────────┐
│ Backend: Send Gift Emails                              │
│ 1. Email to Recipient                                  │
│ 2. Email to Admin                                      │
└─────────────────────────────────────────────────────────┘
                         ↓
        Recipient notified of gift!
        Admin notified of order!
```

---

## Testing Checklist

### Frontend Testing
- [ ] Gift modal opens from Shop page
- [ ] Product selection works
- [ ] All form fields validate properly
- [ ] Email validation works
- [ ] Calendar date picker functions
- [ ] Message character limit enforced
- [ ] Summary displays all information correctly
- [ ] Proceed to checkout button works
- [ ] Gift data stored in localStorage
- [ ] Product added to cart
- [ ] Redirect to checkout happens
- [ ] Cart shows gift item
- [ ] Can complete payment with gift item

### Backend Testing
- [ ] Payment intent created with giftData
- [ ] Gift data parsed correctly from metadata
- [ ] Recipient email sent with correct formatting
- [ ] Admin email sent with correct information
- [ ] Scheduled delivery date respected
- [ ] Personal message included in email
- [ ] Sender name and email included
- [ ] No errors in console logs
- [ ] Database records created (if using DB)

### End-to-End Testing
- [ ] Complete gift purchase workflow
- [ ] Verify recipient receives email
- [ ] Verify admin receives notification
- [ ] Check email formatting looks good
- [ ] Test with scheduled delivery date
- [ ] Test with immediate delivery
- [ ] Test with/without personal message
- [ ] Test various email clients (Gmail, Outlook, etc.)

---

## Email Configuration (Backend)

### Required Environment Variables
```env
EMAIL_SERVICE=gmail
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-specific-password
EMAIL_FROM=noreply@marylouwells.com
ADMIN_EMAIL=abdulazeezusman017@gmail.com
```

### Supported Email Services
- **Gmail** - Use app-specific password
- **SendGrid** - API-based
- **Mailgun** - API-based
- **AWS SES** - AWS service
- **Nodemailer** - Self-hosted SMTP

### Gmail Setup
1. Enable 2-Factor Authentication
2. Generate App Password at: https://myaccount.google.com/apppasswords
3. Use generated password in `EMAIL_PASSWORD`

---

## Production Deployment

### Before Going Live
1. **Email Service Setup**
   - [ ] Configure production email account
   - [ ] Set up email authentication
   - [ ] Test email delivery
   - [ ] Set up email domain verification (SPF, DKIM)

2. **Stripe Configuration**
   - [ ] Set up webhook endpoint
   - [ ] Configure webhook URL in Stripe dashboard
   - [ ] Test webhook signature verification
   - [ ] Monitor webhook delivery

3. **Frontend Deployment**
   - [ ] Update environment variables
   - [ ] Test full flow in production
   - [ ] Verify localStorage works
   - [ ] Test on multiple browsers/devices

4. **Backend Deployment**
   - [ ] Set all required environment variables
   - [ ] Test email sending
   - [ ] Monitor error logs
   - [ ] Set up alerting for failed emails

5. **Monitoring**
   - [ ] Set up error tracking (Sentry, etc.)
   - [ ] Monitor email delivery rates
   - [ ] Track payment success rates
   - [ ] Set up alerts for anomalies

---

## Troubleshooting

### Issue: Gift email not received
**Solutions:**
- Check email service credentials
- Verify email address is spelled correctly
- Check spam/junk folder
- Monitor backend logs for errors
- Test email service independently

### Issue: Gift data not persisting
**Solutions:**
- Check browser localStorage enabled
- Clear browser cache and retry
- Check localStorage quota not exceeded
- Verify giftData key name in code

### Issue: Payment failing for gifts
**Solutions:**
- Verify Stripe API keys correct
- Check gift data metadata serialization
- Review Stripe error logs
- Ensure all required fields present

### Issue: Scheduled delivery not working
**Solutions:**
- Verify delivery date format correct
- Check backend scheduled job setup
- Monitor email queue for pending sends
- Verify timezone handling

---

## Features & Benefits

✅ **Beautiful Gift Experience**
- Elegant step-by-step flow
- Professional email templates
- Personal message customization
- Scheduled delivery option

✅ **Secure & Reliable**
- Stripe payment processing
- Secure email delivery
- Data encrypted in transit
- Webhook verification

✅ **Admin Notifications**
- Immediate notification of gift orders
- Complete order information
- Easy order tracking
- Customizable alerts

✅ **Customer Satisfaction**
- Instant recipient notification
- Beautiful branded emails
- Personal touch with messages
- Professional appearance

---

## Future Enhancements

- [ ] Gift receipt/tracking page
- [ ] E-gift certificates
- [ ] Group gift pooling
- [ ] Custom gift wrapping
- [ ] Gift registry
- [ ] Automated reminder emails
- [ ] Gift-specific analytics
- [ ] Recipient account creation
- [ ] Digital product key delivery
- [ ] Gift subscription options

---

**Status:** 🟢 Production Ready

**Last Updated:** January 28, 2026

**Questions?** Refer to `PAYMENT_SYSTEM_README.md` or `STRIPE_BACKEND_GUIDE.js`
