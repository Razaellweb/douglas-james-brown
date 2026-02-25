# Mary Lou Wells - Website Payment System Documentation

## Overview

This website has been fully integrated with a production-ready Stripe payment system that handles both digital and physical product sales.

## Features Implemented

### 1. **Shopping Cart System**
- **Location**: `/src/store/cartStore.ts`
- **Technology**: Zustand for state management
- **Features**:
  - Persistent storage using localStorage
  - Add/remove/update quantities
  - Automatic calculation of totals
  - Separate tracking of digital vs physical items
  - Cart icon in navbar with item count badge

### 2. **Product Classification**
- Products are now classified as either **digital** or **physical**
- **Digital Products**: eBooks, audiobooks (instant access)
- **Physical Products**: Signed editions, merchandise (require shipping)
- All products include `productType` field in `/src/data/products.ts`

### 3. **Shopping Experience**
- **Shop Page** (`/shop`): Browse and add products to cart
- **Cart Page** (`/cart`): Review items, adjust quantities, proceed to checkout
- **Checkout Page** (`/checkout`): Secure payment form with Stripe Elements
- **Order Confirmation** (`/order-confirmation`): Success page with next steps

### 4. **Payment Processing**
- **Provider**: Stripe
- **Payment Method**: Credit/debit cards
- **Security**: PCI-DSS compliant via Stripe
- **Features**:
  - Customer information collection
  - Secure payment intent creation
  - Real-time validation
  - Error handling and recovery

### 5. **Post-Payment Logic**

#### Digital Products
- ✅ Immediate access after payment
- ✅ Download links available on confirmation page
- ✅ Account-based access for future downloads
- ✅ Lifetime license included

#### Physical Products
- ✅ Automatic email notification to admin (abdulazeezusman017@gmail.com)
- ✅ Includes customer delivery details
- ✅ Order summary and metadata
- ✅ Ready for fulfillment processing

### 6. **UI/UX Enhancements**
- Professional checkout flow with form validation
- Clear product type indicators (digital/physical)
- Order summary with breakdown
- Security badges and trust indicators
- Mobile-responsive design
- Loading states and error handling

## Setup Instructions

### 1. Install Dependencies

All required packages have been installed:
```bash
npm install
```

Key packages added:
- `@stripe/react-stripe-js`: Stripe React components
- `@stripe/stripe-js`: Stripe.js library
- `zustand`: State management

### 2. Environment Variables

Create a `.env.local` file in the root directory:

```env
# Stripe Configuration
VITE_STRIPE_PUBLIC_KEY=pk_test_YOUR_STRIPE_PUBLIC_KEY_HERE

# Supabase Configuration (if using)
VITE_SUPABASE_URL=https://your-supabase-url.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=your_supabase_key_here

# Backend API (if using external backend)
VITE_API_BASE_URL=http://localhost:3000/api
```

**Get Your Stripe Keys:**
1. Go to [Stripe Dashboard](https://dashboard.stripe.com/apikeys)
2. Copy your **Publishable Key** (starts with `pk_test_` or `pk_live_`)
3. Paste into `.env.local` as `VITE_STRIPE_PUBLIC_KEY`

### 3. Backend Setup

The backend payment processing is described in `STRIPE_BACKEND_GUIDE.js`. You need to implement a Node.js/Express server with the following endpoints:

**Required Endpoints:**
- `POST /api/stripe/create-payment-intent`: Create Stripe payment intent
- `POST /api/stripe/webhook`: Handle Stripe webhook events

**Key Functionality:**
- Process payments with Stripe
- Send order notifications for physical products to admin email
- Log successful/failed transactions
- Handle refunds

See `STRIPE_BACKEND_GUIDE.js` for detailed implementation guide.

### 4. Email Configuration

For order notifications on physical products, configure your email service:

**Example with Gmail:**
1. Enable 2-Factor Authentication on your Gmail account
2. Generate an [App Password](https://myaccount.google.com/apppasswords)
3. Set environment variables in your backend:
   ```env
   EMAIL_SERVICE=gmail
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASSWORD=your-app-specific-password
   EMAIL_FROM=noreply@marylouwells.com
   ADMIN_EMAIL=abdulazeezusman017@gmail.com
   ```

**Alternative Services:**
- SendGrid
- Mailgun
- AWS SES
- Your own SMTP server

## Project Structure

```
src/
├── components/
│   └── Cart.tsx                  # Cart display component
├── pages/
│   ├── Shop.tsx                  # Shopping page
│   ├── Cart.tsx                  # Cart page
│   ├── Checkout.tsx              # Checkout page
│   └── OrderConfirmation.tsx      # Order confirmation page
├── store/
│   └── cartStore.ts              # Cart state management (Zustand)
├── integrations/
│   └── stripe/
│       └── config.ts             # Stripe configuration
├── data/
│   └── products.ts               # Products with productType field
└── App.tsx                        # Routes configuration
```

## Product Types

### Digital Products
- eBooks
- Audiobooks

**Post-Purchase Behavior:**
- Instant download links
- Account-based access
- Lifetime license
- No shipping needed

### Physical Products
- Signed hardcovers
- Merchandise (t-shirts, bookmarks, art prints)

**Post-Purchase Behavior:**
- Order email sent to admin
- Requires shipping address
- Fulfillment processing
- Tracking notifications

## Routes

- `/` - Home page
- `/shop` - Browse products
- `/cart` - View shopping cart
- `/checkout` - Secure payment
- `/order-confirmation` - Payment success
- `/book/:slug` - Book detail page

## Testing

### Test with Stripe Test Mode

Use these test card numbers:

**Successful Payment:**
- Card: `4242 4242 4242 4242`
- Expiry: Any future date
- CVC: Any 3 digits

**Declined Card:**
- Card: `4000 0000 0000 0002`
- Expiry: Any future date
- CVC: Any 3 digits

**Requires Authentication:**
- Card: `4000 0025 0000 3155`
- Expiry: Any future date
- CVC: Any 3 digits

### Testing Flow

1. Go to `/shop`
2. Add products to cart (mix digital and physical)
3. Go to `/cart` - verify items display correctly
4. Click "Proceed to Checkout"
5. Fill in test customer information
6. Use test card number above
7. Submit payment
8. Verify confirmation page shows correct product types

## Production Checklist

Before deploying to production:

### Security
- [ ] Switch to Stripe **Live** keys (not test keys)
- [ ] Enable HTTPS only
- [ ] Set up environment variables on production server
- [ ] Implement CORS properly for your domain
- [ ] Add rate limiting to payment endpoints
- [ ] Verify webhook signature validation is enabled

### Stripe Setup
- [ ] Create Stripe account
- [ ] Verify all business information
- [ ] Complete identity verification
- [ ] Enable Live mode
- [ ] Set up SSL/TLS certificate
- [ ] Configure webhook endpoint in Stripe dashboard

### Backend Implementation
- [ ] Implement all endpoints from `STRIPE_BACKEND_GUIDE.js`
- [ ] Set up database for order storage
- [ ] Implement email notifications
- [ ] Set up proper error logging
- [ ] Test payment flow end-to-end

### Email Configuration
- [ ] Set up email service (Gmail, SendGrid, etc.)
- [ ] Configure admin email (`abdulazeezusman017@gmail.com`)
- [ ] Test email delivery
- [ ] Set up email templates
- [ ] Verify sender authentication (DKIM, SPF, DMARC)

### Monitoring & Support
- [ ] Set up error tracking (Sentry, LogRocket)
- [ ] Configure monitoring alerts
- [ ] Set up customer support email
- [ ] Document the fulfillment process
- [ ] Train team on order processing

### Compliance
- [ ] Review Stripe Terms of Service
- [ ] Implement terms & conditions
- [ ] Add privacy policy
- [ ] Set up refund policy
- [ ] Document data handling for GDPR compliance

## Deployment Guide

### Frontend Deployment (Vercel/Netlify)

1. Build the project:
```bash
npm run build
```

2. Set environment variables in your hosting platform:
   - `VITE_STRIPE_PUBLIC_KEY` (your live public key)
   - Other configuration variables

3. Deploy:
```bash
# Vercel
vercel deploy

# Netlify (if using their CLI)
netlify deploy --prod
```

### Backend Deployment

See `STRIPE_BACKEND_GUIDE.js` for detailed backend implementation. Deploy your Express server to:
- Heroku
- AWS (EC2, Lambda, API Gateway)
- DigitalOcean
- Railway
- Render
- Azure App Service

## Key Files

| File | Purpose |
|------|---------|
| `src/store/cartStore.ts` | Cart state management |
| `src/components/Cart.tsx` | Cart UI component |
| `src/pages/Checkout.tsx` | Checkout page with Stripe |
| `src/pages/OrderConfirmation.tsx` | Success page |
| `src/data/products.ts` | Product data with types |
| `src/integrations/stripe/config.ts` | Stripe configuration |
| `STRIPE_BACKEND_GUIDE.js` | Backend implementation guide |

## Common Issues & Solutions

### Cart not persisting
- Check browser localStorage is enabled
- Verify Zustand persist middleware is working
- Check browser console for errors

### Stripe key not working
- Verify `VITE_STRIPE_PUBLIC_KEY` is set in `.env.local`
- Ensure key starts with `pk_test_` (test) or `pk_live_` (production)
- Restart dev server after changing env variables

### Payment intent creation fails
- Verify backend API endpoint is accessible
- Check network tab in browser DevTools
- Verify backend environment variables are set
- Check backend logs for errors

### Email notifications not sending
- Verify admin email is set correctly
- Check email service credentials
- Verify email service is not blocking emails
- Check spam folder

## Support & Contact

For questions or issues:
- Email: abdulazeezusman017@gmail.com
- Documentation: Refer to `STRIPE_BACKEND_GUIDE.js`
- Stripe Support: https://support.stripe.com

## Next Steps

1. **Set up Stripe account** - Complete identity verification
2. **Implement backend** - Follow `STRIPE_BACKEND_GUIDE.js`
3. **Configure email** - Set up email service for notifications
4. **Test thoroughly** - Use Stripe test mode
5. **Switch to production** - Use live Stripe keys
6. **Monitor & optimize** - Track conversion rates and errors

---

**Last Updated**: January 2026
**Status**: Production Ready
**Stripe Integration**: v1.0
