import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sparkles, BookOpen, Scroll, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface NewsletterModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const NewsletterModal = ({ open, onOpenChange }: NewsletterModalProps) => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !name) {
      toast({
        title: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setIsSubscribed(true);
    
    toast({
      title: "Welcome to the Circle!",
      description: "You've joined Mary Lou Wells' exclusive reader community.",
    });
  };

  const handleClose = () => {
    onOpenChange(false);
    // Reset state after animation
    setTimeout(() => {
      setIsSubscribed(false);
      setEmail("");
      setName("");
    }, 300);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-lg bg-gradient-to-br from-background via-background to-muted/30 border-primary/20 overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-peacock" />
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-accent/5 rounded-full blur-3xl" />
        
        {!isSubscribed ? (
          <>
            <DialogHeader className="text-center space-y-4 relative z-10">
              <div className="mx-auto w-16 h-16 rounded-full bg-gradient-peacock flex items-center justify-center mb-2 shadow-glow">
                <Scroll className="w-8 h-8 text-primary-foreground" />
              </div>
              <DialogTitle className="font-cinzel text-2xl md:text-3xl bg-gradient-peacock bg-clip-text text-transparent">
                Join the Sacred Circle
              </DialogTitle>
              <DialogDescription className="font-cormorant text-base md:text-lg text-muted-foreground leading-relaxed">
                Enter the realm of ancient legends. Receive exclusive chapter previews, behind-the-scenes insights, 
                and be the first to know when new tales are unveiled.
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-6 mt-6 relative z-10">
              <div className="space-y-4">
                <div className="relative group">
                  <Input
                    type="text"
                    placeholder="Your name, traveler..."
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="bg-muted/30 border-border/50 focus:border-primary/50 font-cormorant text-lg h-12 pl-4 transition-all duration-300 group-hover:border-primary/30"
                  />
                </div>
                <div className="relative group">
                  <Input
                    type="email"
                    placeholder="Your sacred scroll address..."
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-muted/30 border-border/50 focus:border-primary/50 font-cormorant text-lg h-12 pl-4 transition-all duration-300 group-hover:border-primary/30"
                  />
                </div>
              </div>

              <Button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full h-12 bg-gradient-peacock hover:shadow-glow transition-all duration-500 text-primary-foreground font-cinzel text-base border-0 relative overflow-hidden group"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  {isSubmitting ? (
                    <>
                      <Sparkles className="w-5 h-5 animate-pulse" />
                      Inscribing your name...
                    </>
                  ) : (
                    <>
                      <BookOpen className="w-5 h-5" />
                      Begin the Journey
                    </>
                  )}
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              </Button>

              <p className="text-center text-xs text-muted-foreground font-cormorant">
                By joining, you accept our sacred oath of privacy. Unsubscribe anytime.
              </p>
            </form>

            {/* Benefits */}
            <div className="mt-6 pt-6 border-t border-border/30 relative z-10">
              <p className="font-cinzel text-sm text-center text-foreground/80 mb-4">What awaits you:</p>
              <div className="grid grid-cols-2 gap-3">
                {[
                  "Exclusive previews",
                  "Author insights",
                  "Early access",
                  "Special offers"
                ].map((benefit) => (
                  <div key={benefit} className="flex items-center gap-2 text-sm font-cormorant text-muted-foreground">
                    <Sparkles className="w-3 h-3 text-primary" />
                    {benefit}
                  </div>
                ))}
              </div>
            </div>
          </>
        ) : (
          /* Success State */
          <div className="text-center py-8 relative z-10">
            <div className="mx-auto w-20 h-20 rounded-full bg-gradient-peacock flex items-center justify-center mb-6 shadow-glow animate-pulse">
              <Check className="w-10 h-10 text-primary-foreground" />
            </div>
            <h3 className="font-cinzel text-2xl md:text-3xl bg-gradient-peacock bg-clip-text text-transparent mb-4">
              Welcome, {name}!
            </h3>
            <p className="font-cormorant text-lg text-muted-foreground leading-relaxed mb-6">
              You have joined the sacred circle of readers. Ancient tales and exclusive 
              secrets shall find their way to your scroll.
            </p>
            <Button 
              onClick={handleClose}
              variant="outline"
              className="font-cinzel border-primary/30 hover:bg-primary/10"
            >
              Return to the Realm
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default NewsletterModal;
