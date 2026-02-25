import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Cart from "@/components/Cart";

const CartPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <section className="relative pt-32 pb-16 px-4 sm:px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-secondary/20 via-background to-background" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
        
        <div className="container relative z-10 mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h1 className="font-cinzel text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-peacock bg-clip-text text-transparent">
                Your Cart
              </span>
            </h1>
            <p className="font-cormorant text-xl text-muted-foreground italic">
              Review your items before checkout
            </p>
          </div>

          <Cart />
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CartPage;
