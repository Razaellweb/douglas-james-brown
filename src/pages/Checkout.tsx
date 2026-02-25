import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCartStore } from "@/store/cartStore";
import { useToast } from "@/hooks/use-toast";
import { Loader, ArrowRight, ShieldAlert, AlertCircle } from "lucide-react";
import { STRIPE_PUBLIC_KEY, formatPriceForStripe } from "@/integrations/stripe/config";

const stripePromise = loadStripe(STRIPE_PUBLIC_KEY);

interface CheckoutFormProps {
  onSuccess: (paymentIntentId: string) => void;
  isLoading: boolean;
}

const CheckoutForm = ({ onSuccess, isLoading }: CheckoutFormProps) => {
  const stripe = useStripe();
  const elements = useElements();
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [cardComplete, setCardComplete] = useState(false);
  
  const { items, getTotalPrice, clearCart } = useCartStore();
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    email: "",
    fullName: "",
    phone: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    zipCode: "",
    country: "US",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements || processing || isLoading) {
      return;
    }

    setProcessing(true);
    setError(null);

    try {
      // Get gift data if it exists
      const giftDataString = localStorage.getItem("giftData");
      const giftData = giftDataString ? JSON.parse(giftDataString) : null;

      // Create payment intent on the backend
      const response = await fetch("/api/stripe/create-payment-intent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: formatPriceForStripe(getTotalPrice()),
          currency: "USD",
          items: items.map(item => ({
            productId: item.product.id,
            quantity: item.quantity,
            price: item.product.price,
            name: item.product.name,
            productType: item.product.productType,
          })),
          customerInfo: {
            email: formData.email,
            name: formData.fullName,
            address: {
              line1: formData.addressLine1,
              line2: formData.addressLine2 || undefined,
              city: formData.city,
              state: formData.state,
              postal_code: formData.zipCode,
              country: formData.country,
            },
          },
          // Include gift data if this is a gift purchase
          ...(giftData && {
            giftData: {
              isGift: true,
              recipientName: giftData.recipientName,
              recipientEmail: giftData.recipientEmail,
              senderName: giftData.senderName,
              senderEmail: giftData.senderEmail,
              personalMessage: giftData.personalMessage,
              deliveryDate: giftData.deliveryDate,
            },
          }),
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create payment intent");
      }

      const { clientSecret } = await response.json();

      // Confirm payment with Stripe
      const cardElement = elements.getElement(CardElement);
      if (!cardElement) {
        throw new Error("Card element not found");
      }

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: {
            name: formData.fullName,
            email: formData.email,
            phone: formData.phone,
            address: {
              line1: formData.addressLine1,
              line2: formData.addressLine2,
              city: formData.city,
              state: formData.state,
              postal_code: formData.zipCode,
              country: formData.country,
            },
          },
        },
      });

      if (result.error) {
        setError(result.error.message || "Payment failed");
        toast({
          title: "Payment Failed",
          description: result.error.message,
          variant: "destructive",
        });
      } else if (result.paymentIntent?.status === "succeeded") {
        // Clear gift data from localStorage
        if (giftData) {
          localStorage.removeItem("giftData");
        }
        clearCart();
        onSuccess(result.paymentIntent.id);
        toast({
          title: "Payment Successful",
          description: giftData ? "Your gift has been processed successfully!" : "Your order has been placed successfully!",
        });
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "An error occurred";
      setError(errorMessage);
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setProcessing(false);
    }
  };

  const totalPrice = getTotalPrice();

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Contact Information */}
      <Card className="p-8 border-border/30 bg-card/50">
        <h3 className="font-cinzel text-xl font-bold text-foreground mb-6">Contact Information</h3>
        <div className="grid sm:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="email" className="font-cormorant">Email Address</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="you@example.com"
              required
              className="font-cormorant bg-muted/50 border-border/30"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="fullName" className="font-cormorant">Full Name</Label>
            <Input
              id="fullName"
              name="fullName"
              type="text"
              value={formData.fullName}
              onChange={handleInputChange}
              placeholder="John Doe"
              required
              className="font-cormorant bg-muted/50 border-border/30"
            />
          </div>
          <div className="space-y-2 sm:col-span-2">
            <Label htmlFor="phone" className="font-cormorant">Phone Number</Label>
            <Input
              id="phone"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleInputChange}
              placeholder="+1 (555) 123-4567"
              required
              className="font-cormorant bg-muted/50 border-border/30"
            />
          </div>
        </div>
      </Card>

      {/* Shipping Address */}
      <Card className="p-8 border-border/30 bg-card/50">
        <h3 className="font-cinzel text-xl font-bold text-foreground mb-6">Delivery Address</h3>
        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="addressLine1" className="font-cormorant">Street Address</Label>
            <Input
              id="addressLine1"
              name="addressLine1"
              type="text"
              value={formData.addressLine1}
              onChange={handleInputChange}
              placeholder="123 Main St"
              required
              className="font-cormorant bg-muted/50 border-border/30"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="addressLine2" className="font-cormorant">Apartment, suite, etc. (optional)</Label>
            <Input
              id="addressLine2"
              name="addressLine2"
              type="text"
              value={formData.addressLine2}
              onChange={handleInputChange}
              placeholder="Apt 4B"
              className="font-cormorant bg-muted/50 border-border/30"
            />
          </div>
          <div className="grid sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="city" className="font-cormorant">City</Label>
              <Input
                id="city"
                name="city"
                type="text"
                value={formData.city}
                onChange={handleInputChange}
                placeholder="New York"
                required
                className="font-cormorant bg-muted/50 border-border/30"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="state" className="font-cormorant">State/Province</Label>
              <Input
                id="state"
                name="state"
                type="text"
                value={formData.state}
                onChange={handleInputChange}
                placeholder="NY"
                required
                className="font-cormorant bg-muted/50 border-border/30"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="zipCode" className="font-cormorant">ZIP/Postal Code</Label>
              <Input
                id="zipCode"
                name="zipCode"
                type="text"
                value={formData.zipCode}
                onChange={handleInputChange}
                placeholder="10001"
                required
                className="font-cormorant bg-muted/50 border-border/30"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="country" className="font-cormorant">Country</Label>
              <Input
                id="country"
                name="country"
                type="text"
                value={formData.country}
                onChange={handleInputChange}
                placeholder="US"
                required
                className="font-cormorant bg-muted/50 border-border/30"
              />
            </div>
          </div>
        </div>
      </Card>

      {/* Payment Information */}
      <Card className="p-8 border-border/30 bg-card/50">
        <h3 className="font-cinzel text-xl font-bold text-foreground mb-6">Payment Method</h3>
        <div className="space-y-4">
          <div className="p-4 bg-muted/30 rounded-lg border border-border/30">
            <CardElement
              options={{
                style: {
                  base: {
                    fontSize: "16px",
                    color: "hsl(var(--foreground))",
                    "::placeholder": {
                      color: "hsl(var(--muted-foreground))",
                    },
                  },
                  invalid: {
                    color: "hsl(var(--destructive))",
                  },
                },
              }}
              onChange={(e) => setCardComplete(e.complete)}
            />
          </div>
          
          {error && (
            <div className="p-4 rounded-lg bg-destructive/10 border border-destructive/30 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
              <p className="font-cormorant text-sm text-destructive">{error}</p>
            </div>
          )}

          <div className="p-4 rounded-lg bg-accent/10 border border-accent/30 flex items-start gap-3">
            <ShieldAlert className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
            <p className="font-cormorant text-sm text-foreground">
              Your payment information is secure and encrypted. We never store your full credit card details.
            </p>
          </div>
        </div>
      </Card>

      {/* Order Summary */}
      <Card className="p-8 bg-gradient-to-br from-card via-card to-muted/30 border-accent/30">
        <h3 className="font-cinzel text-lg font-bold text-foreground mb-4">Order Summary</h3>
        <div className="space-y-3 mb-6">
          <div className="flex justify-between items-center">
            <span className="font-cormorant text-muted-foreground">Subtotal</span>
            <span className="font-cinzel font-bold text-foreground">${totalPrice.toFixed(2)}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="font-cormorant text-muted-foreground">Shipping</span>
            <span className="font-cinzel font-bold text-foreground">Calculated at checkout</span>
          </div>
          <div className="h-px bg-border/30" />
          <div className="flex justify-between items-center text-lg">
            <span className="font-cinzel font-bold text-foreground">Total</span>
            <span className="font-cinzel font-bold text-accent text-xl">${totalPrice.toFixed(2)}</span>
          </div>
        </div>

        <Button
          type="submit"
          disabled={processing || isLoading || !cardComplete || !stripe || !elements}
          className="w-full bg-gradient-peacock hover:shadow-glow text-primary-foreground font-cinzel text-lg py-6 disabled:opacity-50 disabled:cursor-not-allowed group"
        >
          {processing || isLoading ? (
            <>
              <Loader className="w-5 h-5 mr-2 animate-spin" />
              Processing Payment...
            </>
          ) : (
            <>
              Complete Purchase
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </>
          )}
        </Button>
      </Card>
    </form>
  );
};

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { items, getTotalPrice } = useCartStore();
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  // Redirect to shop if cart is empty
  useEffect(() => {
    if (items.length === 0) {
      navigate("/shop");
      toast({
        title: "Cart Empty",
        description: "Please add items to your cart before checking out.",
      });
    }
  }, [items.length, navigate, toast]);

  const handlePaymentSuccess = (paymentIntentId: string) => {
    // Navigate to success page with payment intent ID
    navigate("/order-confirmation", { state: { paymentIntentId } });
  };

  if (items.length === 0) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <section className="relative pt-32 pb-16 px-4 sm:px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-secondary/20 via-background to-background" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
        
        <div className="container relative z-10 mx-auto max-w-2xl">
          <div className="text-center mb-12">
            <h1 className="font-cinzel text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-peacock bg-clip-text text-transparent">
                Secure Checkout
              </span>
            </h1>
            <p className="font-cormorant text-xl text-muted-foreground italic">
              Complete your order securely
            </p>
          </div>

          {STRIPE_PUBLIC_KEY ? (
            <Elements stripe={stripePromise}>
              <CheckoutForm onSuccess={handlePaymentSuccess} isLoading={isLoading} />
            </Elements>
          ) : (
            <Card className="p-8 border-destructive/50 bg-destructive/10">
              <p className="font-cormorant text-foreground">
                Stripe configuration is missing. Please set VITE_STRIPE_PUBLIC_KEY in your environment variables.
              </p>
            </Card>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CheckoutPage;
