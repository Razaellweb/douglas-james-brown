# Quick Start Guide - Payment System

## 5-Minute Setup

### 1. Get Stripe Key
```
1. Visit https://dashboard.stripe.com/apikeys
2. Copy your "Publishable key" (starts with pk_test_)
3. Create .env.local in project root
4. Add: VITE_STRIPE_PUBLIC_KEY=pk_test_YOUR_KEY
```

### 2. Start Development
```bash
npm run dev
```

### 3. Test Payment Flow
```
1. Go to http://localhost:5173/shop
2. Add items to cart
3. Click cart icon or go to /cart
4. Click "Proceed to Checkout"
5. Fill form with test data
6. Use card: 4242 4242 4242 4242
7. Expiry: 12/25, CVC: 123
8. Click "Complete Purchase"
```

## File Changes Made

### New Files Created
- `src/store/cartStore.ts` - Cart management
- `src/components/Cart.tsx` - Cart component
- `src/pages/Cart.tsx` - Cart page
- `src/pages/Checkout.tsx` - Checkout page
- `src/pages/OrderConfirmation.tsx` - Success page
- `src/integrations/stripe/config.ts` - Stripe config
- `STRIPE_BACKEND_GUIDE.js` - Backend guide
- `PAYMENT_SYSTEM_README.md` - Full documentation

### Modified Files
- `src/App.tsx` - Added routes
- `src/pages/Shop.tsx` - Updated to use cart
- `src/components/Navbar.tsx` - Added cart icon
- `src/data/products.ts` - Added productType field
- `package.json` - Added Stripe dependencies

## Architecture

```
User adds product → Cart (Zustand) → Cart Page → Checkout → Stripe → Success Page
                       ↓
                  Persisted in localStorage
```

## Product Types

### Digital (eBooks, Audiobooks)
```javascript
{
  productType: "digital",
  // Gets immediate download link on checkout page
}
```

### Physical (Books, Merchandise)
```javascript
{
  productType: "physical",
  // Email sent to admin with shipping details
}
```

## Backend Requirements

You need to implement:

1. **POST /api/stripe/create-payment-intent**
   - Input: amount, items, customer info
   - Output: clientSecret for Stripe
   - See `STRIPE_BACKEND_GUIDE.js` for details

2. **Email Notifications**
   - When physical items are purchased
   - Send to: abdulazeezusman017@gmail.com
   - Include: Customer info, items, address

## Environment Variables

```env
# Required for frontend
VITE_STRIPE_PUBLIC_KEY=pk_test_...

# Required for backend (if using)
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
EMAIL_SERVICE=gmail
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=app-password
ADMIN_EMAIL=abdulazeezusman017@gmail.com
```

## Testing Cards

| Use Case | Card Number | Result |
|----------|------------|--------|
| Success | 4242 4242 4242 4242 | Payment succeeds |
| Decline | 4000 0000 0000 0002 | Card declined |
| 3D Secure | 4000 0025 0000 3155 | Requires authentication |

Expiry: Any future date (e.g., 12/25)
CVC: Any 3 digits (e.g., 123)

## Troubleshooting

### "Stripe key not found"
→ Check `.env.local` exists and `VITE_STRIPE_PUBLIC_KEY` is set
→ Restart dev server: `npm run dev`

### Cart not saving
→ Check browser localStorage is enabled
→ Open DevTools > Application > Local Storage > check "cart-storage"

### Checkout page blank
→ Verify Stripe public key is valid
→ Check console for JavaScript errors
→ Verify Elements component is loading

### Payment fails
→ Use correct test card numbers from table above
→ Ensure backend is running
→ Check network tab in DevTools for errors

## Next Steps

1. **Implement Backend** (see STRIPE_BACKEND_GUIDE.js)
2. **Set Up Emails** (configure email service)
3. **Test Thoroughly** (use Stripe test mode)
4. **Deploy Frontend** (Vercel, Netlify, etc.)
5. **Deploy Backend** (Heroku, AWS, etc.)
6. **Switch to Live Keys** (after production setup)

## Key Contact
Admin Email: abdulazeezusman017@gmail.com

---

**Ready to start?** Follow the 5-minute setup above!
