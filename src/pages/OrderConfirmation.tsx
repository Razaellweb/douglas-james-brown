import { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Download, Mail, Package, ArrowRight } from "lucide-react";
import { useCartStore } from "@/store/cartStore";

interface OrderConfirmationState {
  paymentIntentId: string;
}

const OrderConfirmation = () => {
  const location = useLocation();
  const { items } = useCartStore();
  const [orderData, setOrderData] = useState<OrderConfirmationState | null>(null);
  const [digitalItems, setDigitalItems] = useState<any[]>([]);
  const [physicalItems, setPhysicalItems] = useState<any[]>([]);

  useEffect(() => {
    const state = location.state as OrderConfirmationState;
    
    if (!state?.paymentIntentId) {
      // Redirect if no payment intent ID
      window.location.href = "/shop";
      return;
    }

    setOrderData(state);

    // Separate items by type
    const digital = items.filter(item => item.product.productType === "digital");
    const physical = items.filter(item => item.product.productType === "physical");

    setDigitalItems(digital);
    setPhysicalItems(physical);
  }, [location.state, items]);

  if (!orderData) {
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
          {/* Success Message */}
          <div className="text-center mb-12">
            <div className="flex justify-center mb-6">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-peacock blur-xl opacity-30 animate-pulse" />
                <div className="relative bg-gradient-peacock rounded-full p-4">
                  <CheckCircle className="w-12 h-12 text-primary-foreground" />
                </div>
              </div>
            </div>
            
            <h1 className="font-cinzel text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-peacock bg-clip-text text-transparent">
                Order Confirmed!
              </span>
            </h1>
            <p className="font-cormorant text-xl text-muted-foreground mb-2">
              Thank you for your purchase
            </p>
            <p className="font-cormorant text-sm text-muted-foreground">
              Order ID: <span className="font-bold text-foreground">{orderData.paymentIntentId.slice(-12)}</span>
            </p>
          </div>

          {/* Digital Items - Immediate Access */}
          {digitalItems.length > 0 && (
            <Card className="mb-8 p-8 border-accent/30 bg-gradient-to-br from-accent/10 via-card to-card">
              <div className="flex items-start gap-4 mb-6">
                <div className="p-3 bg-accent/20 rounded-lg">
                  <Download className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <h2 className="font-cinzel text-2xl font-bold text-foreground">Your Downloads Are Ready</h2>
                  <p className="font-cormorant text-muted-foreground mt-1">
                    Access your digital products immediately
                  </p>
                </div>
              </div>

              <div className="space-y-4 mb-6">
                {digitalItems.map((item) => (
                  <div key={item.product.id} className="p-4 bg-card/50 rounded-lg border border-border/30">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="font-cinzel font-bold text-foreground">{item.product.name}</h3>
                        <p className="font-cormorant text-sm text-muted-foreground mt-1">
                          {item.product.description}
                        </p>
                      </div>
                      <Badge className="bg-accent text-accent-foreground font-cormorant text-xs">
                        Digital
                      </Badge>
                    </div>
                    <div className="mt-4 flex gap-3">
                      <Button className="bg-accent hover:bg-accent/90 text-accent-foreground font-cinzel">
                        <Download className="w-4 h-4 mr-2" />
                        Download Now
                      </Button>
                      <Button variant="outline" className="font-cinzel">
                        View in Account
                      </Button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-4 bg-accent/10 rounded-lg border border-accent/30">
                <p className="font-cormorant text-sm text-foreground">
                  Your digital products have been added to your account. You can download them anytime from your dashboard, and you'll have lifetime access.
                </p>
              </div>
            </Card>
          )}

          {/* Physical Items - Shipping Info */}
          {physicalItems.length > 0 && (
            <Card className="mb-8 p-8 border-primary/30 bg-gradient-to-br from-primary/10 via-card to-card">
              <div className="flex items-start gap-4 mb-6">
                <div className="p-3 bg-primary/20 rounded-lg">
                  <Package className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h2 className="font-cinzel text-2xl font-bold text-foreground">Your Order is Being Prepared</h2>
                  <p className="font-cormorant text-muted-foreground mt-1">
                    We're getting your physical items ready for shipment
                  </p>
                </div>
              </div>

              <div className="space-y-4 mb-6">
                {physicalItems.map((item) => (
                  <div key={item.product.id} className="p-4 bg-card/50 rounded-lg border border-border/30">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="font-cinzel font-bold text-foreground">{item.product.name}</h3>
                        <p className="font-cormorant text-sm text-muted-foreground mt-1">
                          Qty: {item.quantity}
                        </p>
                      </div>
                      <Badge className="bg-primary text-primary-foreground font-cormorant text-xs">
                        Physical
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-3 p-4 bg-primary/10 rounded-lg border border-primary/30">
                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <p className="font-cormorant text-sm text-foreground">
                    We'll send you a shipping confirmation email with tracking information as soon as your order ships.
                  </p>
                </div>
                <div className="text-sm font-cormorant text-muted-foreground pl-8">
                  Estimated delivery: 5-7 business days (may vary by location)
                </div>
              </div>
            </Card>
          )}

          {/* What's Next */}
          <Card className="p-8 border-border/30 bg-card/50">
            <h2 className="font-cinzel text-2xl font-bold text-foreground mb-6">What's Next?</h2>
            
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-gradient-peacock flex items-center justify-center flex-shrink-0">
                  <span className="font-cinzel font-bold text-primary-foreground">1</span>
                </div>
                <div>
                  <h3 className="font-cinzel font-bold text-foreground">Check Your Email</h3>
                  <p className="font-cormorant text-sm text-muted-foreground mt-1">
                    We've sent a confirmation email with all the details about your order. Check your inbox (and spam folder) for the email from us.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-gradient-peacock flex items-center justify-center flex-shrink-0">
                  <span className="font-cinzel font-bold text-primary-foreground">2</span>
                </div>
                <div>
                  <h3 className="font-cinzel font-bold text-foreground">Access Your Account</h3>
                  <p className="font-cormorant text-sm text-muted-foreground mt-1">
                    {digitalItems.length > 0 && "Your digital products are ready to download immediately in your account. "}
                    You can track your order status anytime.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-gradient-peacock flex items-center justify-center flex-shrink-0">
                  <span className="font-cinzel font-bold text-primary-foreground">3</span>
                </div>
                <div>
                  <h3 className="font-cinzel font-bold text-foreground">Share Your Love</h3>
                  <p className="font-cormorant text-sm text-muted-foreground mt-1">
                    Loved what you bought? Please consider leaving a review. Your feedback helps other readers discover Mary Lou Wells' amazing works.
                  </p>
                </div>
              </div>
            </div>
          </Card>

          {/* CTA Buttons */}
          <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/shop" className="flex-1 sm:flex-none">
              <Button variant="outline" className="w-full font-cinzel">
                Continue Shopping
              </Button>
            </Link>
            <Link to="/" className="flex-1 sm:flex-none">
              <Button className="w-full bg-gradient-peacock text-primary-foreground font-cinzel hover:shadow-glow group">
                Return Home
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>

          {/* Trust Badges */}
          <div className="mt-12 text-center">
            <p className="font-cormorant text-xs text-muted-foreground">
              Your order is secure and guaranteed. Questions? Contact us at support@marylouwells.com
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default OrderConfirmation;
