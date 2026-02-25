import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { useCartStore } from "@/store/cartStore";
import { 
  Gift, 
  Sparkles, 
  ArrowRight, 
  ArrowLeft,
  Check, 
  Heart,
  Mail,
  Calendar,
  Scroll,
  Package,
  Star,
  Loader2
} from "lucide-react";
import { products, Product } from "@/data/products";

interface GiftFlowModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

type GiftStep = "select" | "personalize" | "schedule" | "confirm" | "checkout";

interface GiftSelection {
  product: Product | null;
  recipientName: string;
  recipientEmail: string;
  senderName: string;
  senderEmail: string;
  personalMessage: string;
  deliveryDate: string;
  giftWrap: boolean;
}

const popularGifts = products.filter(p => 
  p.badge === "Best Value" || p.category === "signed" || p.badge === "Award Winner"
).slice(0, 4);

const GiftFlowModal = ({ open, onOpenChange }: GiftFlowModalProps) => {
  const navigate = useNavigate();
  const [step, setStep] = useState<GiftStep>("select");
  const [isProcessing, setIsProcessing] = useState(false);
  const [selection, setSelection] = useState<GiftSelection>({
    product: null,
    recipientName: "",
    recipientEmail: "",
    senderName: "",
    senderEmail: "",
    personalMessage: "",
    deliveryDate: "",
    giftWrap: true,
  });
  const { toast } = useToast();
  const { addItem } = useCartStore();

  const handleClose = () => {
    setStep("select");
    setSelection({
      product: null,
      recipientName: "",
      recipientEmail: "",
      senderName: "",
      senderEmail: "",
      personalMessage: "",
      deliveryDate: "",
      giftWrap: true,
    });
    onOpenChange(false);
  };

  const handleSelectProduct = (product: Product) => {
    setSelection(prev => ({ ...prev, product }));
    setStep("personalize");
  };

  const handlePersonalizeNext = () => {
    if (!selection.recipientName || !selection.recipientEmail || !selection.senderName || !selection.senderEmail) {
      toast({
        title: "Please fill in required fields",
        description: "Recipient name, email, sender name, and email are required.",
        variant: "destructive",
      });
      return;
    }
    
    // Validate emails
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(selection.recipientEmail) || !emailRegex.test(selection.senderEmail)) {
      toast({
        title: "Invalid email address",
        description: "Please enter valid email addresses.",
        variant: "destructive",
      });
      return;
    }
    
    setStep("schedule");
  };

  const handleScheduleNext = () => {
    setStep("confirm");
  };

  const handleProcessGift = async () => {
    if (!selection.product) return;
    
    setIsProcessing(true);
    try {
      // Add product to cart with gift metadata
      addItem(selection.product, 1);

      // Store gift information in localStorage for checkout page
      const giftData = {
        recipientName: selection.recipientName,
        recipientEmail: selection.recipientEmail,
        senderName: selection.senderName,
        senderEmail: selection.senderEmail,
        personalMessage: selection.personalMessage,
        deliveryDate: selection.deliveryDate,
        isGift: true,
      };
      localStorage.setItem("giftData", JSON.stringify(giftData));

      toast({
        title: "🎁 Added to Cart",
        description: "Your gift has been added to cart. Proceeding to checkout...",
      });

      // Close modal and redirect to checkout
      setTimeout(() => {
        handleClose();
        navigate("/checkout");
      }, 1000);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to process gift. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const goBack = () => {
    switch (step) {
      case "personalize":
        setStep("select");
        break;
      case "schedule":
        setStep("personalize");
        break;
      case "confirm":
        setStep("schedule");
        break;
    }
  };

  const stepNumber = step === "select" ? 1 : step === "personalize" ? 2 : step === "schedule" ? 3 : step === "confirm" ? 4 : 5;

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto bg-gradient-to-b from-card via-card to-background border-accent/30">
        <DialogHeader className="text-center pb-4">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Gift className="w-6 h-6 text-accent" />
            <DialogTitle className="font-cinzel text-2xl bg-gradient-peacock bg-clip-text text-transparent">
              Gift an Unforgettable Story
            </DialogTitle>
          </div>
          <DialogDescription className="font-cormorant text-lg text-muted-foreground">
            Share the magic of Mary Lou Wells' epic tales with someone special
          </DialogDescription>
          
          {/* Progress Steps */}
          <div className="flex items-center justify-center gap-2 mt-6">
            {[1, 2, 3, 4, 5].map((num) => (
              <div key={num} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-cinzel text-sm transition-all ${
                  stepNumber >= num 
                    ? "bg-gradient-peacock text-primary-foreground" 
                    : "bg-muted text-muted-foreground"
                }`}>
                  {stepNumber > num ? <Check className="w-4 h-4" /> : num}
                </div>
                {num < 5 && (
                  <div className={`w-8 h-0.5 ${stepNumber > num ? "bg-accent" : "bg-border"}`} />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-center gap-4 mt-2 font-cormorant text-xs text-muted-foreground">
            <span className={stepNumber >= 1 ? "text-accent" : ""}>Select</span>
            <span className={stepNumber >= 2 ? "text-accent" : ""}>Details</span>
            <span className={stepNumber >= 3 ? "text-accent" : ""}>Schedule</span>
            <span className={stepNumber >= 4 ? "text-accent" : ""}>Review</span>
            <span className={stepNumber >= 5 ? "text-accent" : ""}>Pay</span>
          </div>
        </DialogHeader>

        {/* Step 1: Select Product */}
        {step === "select" && (
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="font-cinzel text-lg text-foreground mb-2">Choose a Gift</h3>
              <p className="font-cormorant text-muted-foreground">
                Popular choices curated for gifting
              </p>
            </div>
            
            <div className="grid sm:grid-cols-2 gap-4">
              {popularGifts.map((product) => (
                <Card 
                  key={product.id}
                  className="relative p-4 cursor-pointer transition-all hover:border-accent/50 hover:shadow-glow bg-card/50 border-border/30 group"
                  onClick={() => handleSelectProduct(product)}
                >
                  {product.badge && (
                    <Badge className="absolute top-3 right-3 bg-accent/90 text-accent-foreground font-cormorant text-xs">
                      {product.badge}
                    </Badge>
                  )}
                  
                  <div className="flex gap-4">
                    {product.image && (
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className="w-16 h-24 object-cover rounded-lg shadow-md"
                      />
                    )}
                    <div className="flex-1 min-w-0">
                      <h4 className="font-cinzel text-sm font-bold text-foreground truncate group-hover:text-primary transition-colors">
                        {product.name}
                      </h4>
                      <p className="font-cormorant text-xs text-muted-foreground line-clamp-2 mt-1">
                        {product.description}
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        <span className="font-cinzel text-lg font-bold text-accent">
                          ${product.price}
                        </span>
                        {product.originalPrice && (
                          <span className="font-cormorant text-sm text-muted-foreground line-through">
                            ${product.originalPrice}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="absolute inset-0 border-2 border-transparent group-hover:border-accent/30 rounded-lg transition-colors pointer-events-none" />
                </Card>
              ))}
            </div>

            <div className="text-center pt-4">
              <p className="font-cormorant text-sm text-muted-foreground">
                Looking for something else? Browse our <span className="text-accent cursor-pointer hover:underline" onClick={handleClose}>full collection</span>
              </p>
            </div>
          </div>
        )}

        {/* Step 2: Personalize */}
        {step === "personalize" && (
          <div className="space-y-6">
            <div className="flex items-center gap-4 p-4 rounded-xl bg-muted/20 border border-border/30">
              {selection.product?.image && (
                <img 
                  src={selection.product.image} 
                  alt={selection.product.name}
                  className="w-12 h-16 object-cover rounded-lg shadow-md"
                />
              )}
              <div>
                <p className="font-cinzel text-sm font-bold text-foreground">{selection.product?.name}</p>
                <p className="font-cormorant text-accent">${selection.product?.price}</p>
              </div>
            </div>

            <Separator className="bg-border/30" />

            <div className="space-y-4">
              <div className="flex items-center gap-2 text-foreground">
                <Heart className="w-5 h-5 text-accent" />
                <h3 className="font-cinzel text-lg">Recipient Details</h3>
              </div>
              
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="recipientName" className="font-cormorant">
                    Recipient's Name <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="recipientName"
                    placeholder="Who is this gift for?"
                    value={selection.recipientName}
                    onChange={(e) => setSelection(prev => ({ ...prev, recipientName: e.target.value }))}
                    className="bg-muted/30 border-border/50 font-cormorant"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="recipientEmail" className="font-cormorant">
                    Recipient's Email <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="recipientEmail"
                    type="email"
                    placeholder="Where should we send the gift?"
                    value={selection.recipientEmail}
                    onChange={(e) => setSelection(prev => ({ ...prev, recipientEmail: e.target.value }))}
                    className="bg-muted/30 border-border/50 font-cormorant"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="senderName" className="font-cormorant">
                  Your Name <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="senderName"
                  placeholder="Who is this gift from?"
                  value={selection.senderName}
                  onChange={(e) => setSelection(prev => ({ ...prev, senderName: e.target.value }))}
                  className="bg-muted/30 border-border/50 font-cormorant"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="senderEmail" className="font-cormorant">
                  Your Email <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="senderEmail"
                  type="email"
                  placeholder="For gift confirmation"
                  value={selection.senderEmail}
                  onChange={(e) => setSelection(prev => ({ ...prev, senderEmail: e.target.value }))}
                  className="bg-muted/30 border-border/50 font-cormorant"
                />
              </div>
            </div>

            <Separator className="bg-border/30" />

            <div className="space-y-4">
              <div className="flex items-center gap-2 text-foreground">
                <Scroll className="w-5 h-5 text-accent" />
                <h3 className="font-cinzel text-lg">Personal Message (Optional)</h3>
              </div>
              
              <Textarea
                placeholder="Write a heartfelt message for the recipient... &#10;&#10;e.g., 'May this epic tale transport you to worlds beyond imagination. Enjoy the adventure!'"
                value={selection.personalMessage}
                onChange={(e) => setSelection(prev => ({ ...prev, personalMessage: e.target.value }))}
                className="bg-muted/30 border-border/50 font-cormorant min-h-[100px]"
              />
            </div>

            <div className="flex gap-4">
              <Button variant="outline" onClick={goBack} className="font-cinzel border-border/50">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              <Button 
                onClick={handlePersonalizeNext} 
                className="flex-1 bg-gradient-peacock text-primary-foreground font-cinzel"
              >
                Continue
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        )}

        {/* Step 3: Schedule */}
        {step === "schedule" && (
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-foreground">
                <Calendar className="w-5 h-5 text-accent" />
                <h3 className="font-cinzel text-lg">When Should We Deliver?</h3>
              </div>
              
              <div className="grid sm:grid-cols-2 gap-4">
                <Card 
                  className={`p-4 cursor-pointer transition-all ${
                    !selection.deliveryDate 
                      ? "border-accent/50 bg-accent/10" 
                      : "border-border/30 hover:border-accent/30"
                  }`}
                  onClick={() => setSelection(prev => ({ ...prev, deliveryDate: "" }))}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      !selection.deliveryDate ? "bg-accent text-accent-foreground" : "bg-muted"
                    }`}>
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-cinzel text-sm font-bold text-foreground">Send Immediately</p>
                      <p className="font-cormorant text-xs text-muted-foreground">
                        Gift notification sent right after purchase
                      </p>
                    </div>
                  </div>
                </Card>

                <Card 
                  className={`p-4 cursor-pointer transition-all ${
                    selection.deliveryDate 
                      ? "border-accent/50 bg-accent/10" 
                      : "border-border/30 hover:border-accent/30"
                  }`}
                  onClick={() => setSelection(prev => ({ ...prev, deliveryDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0] }))}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      selection.deliveryDate ? "bg-accent text-accent-foreground" : "bg-muted"
                    }`}>
                      <Calendar className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-cinzel text-sm font-bold text-foreground">Schedule for Later</p>
                      <p className="font-cormorant text-xs text-muted-foreground">
                        Perfect for birthdays and special occasions
                      </p>
                    </div>
                  </div>
                </Card>
              </div>

              {selection.deliveryDate && (
                <div className="space-y-2 animate-fade-in">
                  <Label htmlFor="deliveryDate" className="font-cormorant">Select Date</Label>
                  <Input
                    id="deliveryDate"
                    type="date"
                    value={selection.deliveryDate}
                    min={new Date().toISOString().split('T')[0]}
                    onChange={(e) => setSelection(prev => ({ ...prev, deliveryDate: e.target.value }))}
                    className="bg-muted/30 border-border/50 font-cormorant"
                  />
                </div>
              )}
            </div>

            <Separator className="bg-border/30" />

            <div className="space-y-4">
              <div className="flex items-center gap-2 text-foreground">
                <Package className="w-5 h-5 text-accent" />
                <h3 className="font-cinzel text-lg">Gift Presentation</h3>
              </div>

              <Card 
                className={`p-4 cursor-pointer transition-all ${
                  selection.giftWrap 
                    ? "border-accent/50 bg-accent/10" 
                    : "border-border/30 hover:border-accent/30"
                }`}
                onClick={() => setSelection(prev => ({ ...prev, giftWrap: !prev.giftWrap }))}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      selection.giftWrap ? "bg-accent text-accent-foreground" : "bg-muted"
                    }`}>
                      <Sparkles className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-cinzel text-sm font-bold text-foreground">Premium Gift Presentation</p>
                      <p className="font-cormorant text-xs text-muted-foreground">
                        Beautiful email with animated reveal and your message
                      </p>
                    </div>
                  </div>
                  <Badge className="bg-primary/20 text-primary font-cormorant border-0">
                    Free
                  </Badge>
                </div>
              </Card>
            </div>

            <div className="flex gap-4">
              <Button variant="outline" onClick={goBack} className="font-cinzel border-border/50">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              <Button 
                onClick={handleScheduleNext} 
                className="flex-1 bg-gradient-peacock text-primary-foreground font-cinzel"
              >
                Review Gift
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        )}

        {/* Step 4: Confirm */}
        {step === "confirm" && (
          <div className="space-y-6">
            <Card className="p-6 bg-gradient-to-br from-accent/10 via-card to-primary/10 border-accent/30">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-peacock flex items-center justify-center flex-shrink-0">
                  <Gift className="w-6 h-6 text-primary-foreground" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-cinzel text-lg font-bold text-foreground">Gift Summary</h3>
                  <p className="font-cormorant text-muted-foreground">
                    Review your gift before completing the purchase
                  </p>
                </div>
              </div>
            </Card>

            <div className="space-y-4">
              {/* Product */}
              <div className="flex items-center gap-4 p-4 rounded-xl bg-muted/10 border border-border/30">
                {selection.product?.image && (
                  <img 
                    src={selection.product.image} 
                    alt={selection.product.name}
                    className="w-16 h-24 object-cover rounded-lg shadow-md"
                  />
                )}
                <div className="flex-1">
                  <p className="font-cinzel font-bold text-foreground">{selection.product?.name}</p>
                  <p className="font-cormorant text-sm text-muted-foreground">{selection.product?.description}</p>
                </div>
                <p className="font-cinzel text-xl font-bold text-accent">${selection.product?.price}</p>
              </div>

              {/* Details Grid */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-muted/10 border border-border/30 space-y-2">
                  <p className="font-cormorant text-xs text-muted-foreground uppercase tracking-wider">Recipient</p>
                  <p className="font-cinzel text-foreground">{selection.recipientName}</p>
                  <p className="font-cormorant text-sm text-muted-foreground">{selection.recipientEmail}</p>
                </div>
                <div className="p-4 rounded-xl bg-muted/10 border border-border/30 space-y-2">
                  <p className="font-cormorant text-xs text-muted-foreground uppercase tracking-wider">From</p>
                  <p className="font-cinzel text-foreground">{selection.senderName}</p>
                  <p className="font-cormorant text-sm text-muted-foreground">
                    {selection.deliveryDate ? `Delivery: ${selection.deliveryDate}` : "Sending immediately"}
                  </p>
                </div>
              </div>

              {selection.personalMessage && (
                <div className="p-4 rounded-xl bg-muted/10 border border-border/30 space-y-2">
                  <p className="font-cormorant text-xs text-muted-foreground uppercase tracking-wider">Your Message</p>
                  <p className="font-cormorant text-foreground italic">"{selection.personalMessage}"</p>
                </div>
              )}
            </div>

            <Separator className="bg-border/30" />

            <div className="flex items-center justify-between p-4 rounded-xl bg-accent/10 border border-accent/30">
              <div>
                <p className="font-cormorant text-sm text-muted-foreground">Total</p>
                <p className="font-cinzel text-2xl font-bold text-accent">${selection.product?.price}</p>
              </div>
              <div className="flex items-center gap-2 text-primary">
                <Star className="w-4 h-4" />
                <span className="font-cormorant text-sm">Premium gift presentation included</span>
              </div>
            </div>

            <div className="flex gap-4">
              <Button variant="outline" onClick={goBack} className="font-cinzel border-border/50">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              <Button 
                onClick={handleProcessGift}
                disabled={isProcessing}
                className="flex-1 bg-gradient-peacock hover:shadow-glow text-primary-foreground font-cinzel group"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <Gift className="w-4 h-4 mr-2" />
                    Proceed to Checkout
                    <Sparkles className="w-4 h-4 ml-2 group-hover:animate-pulse" />
                  </>
                )}
              </Button>
            </div>

            <p className="text-center font-cormorant text-xs text-muted-foreground">
              Secure checkout powered by Stripe. Your gift is protected by our satisfaction guarantee.
            </p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default GiftFlowModal;
