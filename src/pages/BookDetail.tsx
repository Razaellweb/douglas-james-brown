import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getBookBySlug, books } from "@/data/books";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BookReviews from "@/components/BookReviews";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, BookOpen, ShoppingCart, ExternalLink, Sparkles, ChevronLeft, ChevronRight, CreditCard, Shield, Truck, Star, FileText, User, Loader2 } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { useToast } from "@/hooks/use-toast";

const BookDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const addItem = useCartStore((state) => state.addItem);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const book = getBookBySlug(slug || "");

  // Scroll to top on navigation
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  // Handle add to cart and checkout
  const handlePurchaseBook = async () => {
    if (!book) return;

    setIsAddingToCart(true);
    try {
      // Create a product object from the book
      const bookProduct = {
        id: `book-${book.slug}`,
        name: book.title,
        description: book.subtitle,
        price: book.formats.paperback,
        image: book.image,
        category: "signed" as const,
        bookSlug: book.slug,
        bookTitle: book.title,
        available: true,
        productType: "physical" as const,
      };

      // Add to cart
      addItem(bookProduct, 1);

      toast({
        title: "Added to cart",
        description: `"${book.title}" has been added to your cart.`,
      });

      // Redirect to checkout
      setTimeout(() => {
        navigate("/checkout");
      }, 500);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add book to cart. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsAddingToCart(false);
    }
  };

  if (!book) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <h1 className="font-cinzel text-4xl text-foreground">Book Not Found</h1>
          <Link to="/#books">
            <Button variant="outline" className="font-cinzel">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Books
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const currentIndex = books.findIndex(b => b.slug === slug);
  const prevBook = currentIndex > 0 ? books[currentIndex - 1] : null;
  const nextBook = currentIndex < books.length - 1 ? books[currentIndex + 1] : null;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-secondary/20 via-background to-background" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
        
        <div className="container relative z-10 mx-auto max-w-7xl px-0 sm:px-4">
          {/* Back link */}
          <Link 
            to="/#books" 
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8 font-cormorant text-lg"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to All Books
          </Link>

          <div className="grid lg:grid-cols-2 gap-8 md:gap-12 lg:gap-20 items-start">
            {/* Book Cover */}
            <div className="relative group">
              <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 via-accent/20 to-secondary/20 rounded-2xl blur-xl opacity-60 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative bg-card/50 backdrop-blur-sm rounded-xl p-6 border border-border/50">
                <img 
                  src={book.image} 
                  alt={`${book.title} book cover`}
                  className="w-full h-auto max-h-[700px] object-contain rounded-lg shadow-deep"
                />
              </div>
              
              {/* Badge */}
              <div className="absolute top-10 left-10 flex items-center gap-2 bg-accent/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-gold">
                <Sparkles className="w-4 h-4 text-primary-foreground" />
                <span className="font-cinzel text-sm font-bold text-primary-foreground">
                  {book.badge}
                </span>
              </div>
            </div>

            {/* Book Details */}
            <div className="space-y-6 md:space-y-8">
              <div className="space-y-4">
                <p className="font-cormorant text-lg text-accent font-semibold tracking-wider uppercase">
                  {book.collection}
                </p>
                <h1 className="font-cinzel text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold">
                  <span className="bg-gradient-peacock bg-clip-text text-transparent">
                    {book.title}
                  </span>
                </h1>
                <p className="font-cormorant text-xl sm:text-2xl md:text-3xl italic text-muted-foreground">
                  {book.subtitle}
                </p>
              </div>

              {/* Author and Meta Info */}
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-accent" />
                  <span className="font-cormorant text-foreground">{book.author}</span>
                </div>
                <span className="text-border">•</span>
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-accent" />
                  <span className="font-cormorant text-muted-foreground">{book.pageCount} pages</span>
                </div>
                {book.rating > 0 && (
                  <>
                    <span className="text-border">•</span>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                      <span className="font-cormorant text-foreground">{book.rating}</span>
                      <span className="font-cormorant text-muted-foreground">({book.reviewCount} reviews)</span>
                    </div>
                  </>
                )}
              </div>
              
              <div className="flex flex-wrap items-center gap-2">
                {book.category.split(' • ').map((cat, index) => (
                  <span key={index} className="px-4 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary font-cormorant text-sm">
                    {cat}
                  </span>
                ))}
              </div>

              <Separator className="bg-border/50" />

              {/* Full Description */}
              <div className="space-y-4">
                {book.fullDescription.split('\n\n').map((paragraph, index) => (
                  <p key={index} className="font-cormorant text-lg text-foreground/90 leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>

              {/* Purchase Section */}
              <Card className="p-8 bg-gradient-to-br from-card via-card to-muted/30 border-accent/30 shadow-deep">
                <div className="space-y-6">
                  {/* Primary Purchase - On Platform */}
                  <div className="space-y-4">
                    <h3 className="font-cinzel text-2xl font-bold text-foreground flex items-center gap-3">
                      <ShoppingCart className="w-6 h-6 text-accent" />
                      Get Your Copy
                    </h3>
                    
                    {/* Format Options */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                      <div className="p-4 rounded-xl bg-muted/30 border border-border/50 text-center">
                        <p className="font-cormorant text-sm text-muted-foreground mb-1">Kindle</p>
                        <p className="font-cinzel text-xl font-bold text-accent">${book.formats.kindle.toFixed(2)}</p>
                      </div>
                      <div className="p-4 rounded-xl bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 border border-accent/30 text-center ring-2 ring-accent/50">
                        <p className="font-cormorant text-sm text-foreground mb-1">Paperback</p>
                        <p className="font-cinzel text-xl font-bold text-accent">${book.formats.paperback.toFixed(2)}</p>
                        <p className="font-cormorant text-xs text-muted-foreground">Most Popular</p>
                      </div>
                    </div>
                    
                    <div className="p-6 rounded-xl bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 border border-accent/30">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
                        <div>
                          <p className="font-cinzel text-lg text-foreground font-semibold">Paperback Edition</p>
                          <p className="font-cormorant text-muted-foreground">Ships worldwide • Signed copies available</p>
                        </div>
                        <p className="font-cinzel text-3xl font-bold text-accent">${book.formats.paperback.toFixed(2)}</p>
                      </div>
                      
                      <Button 
                        size="lg" 
                        onClick={handlePurchaseBook}
                        disabled={isAddingToCart}
                        className="w-full bg-gradient-peacock hover:shadow-glow text-primary-foreground font-cinzel text-lg py-6 group"
                      >
                        {isAddingToCart ? (
                          <>
                            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                            Processing...
                          </>
                        ) : (
                          <>
                            <CreditCard className="w-5 h-5 mr-2" />
                            Purchase Now
                            <ShoppingCart className="w-5 h-5 ml-2 group-hover:scale-110 transition-transform" />
                          </>
                        )}
                      </Button>
                      
                      {/* Trust Badges */}
                      <div className="flex flex-wrap items-center justify-center gap-6 mt-4 pt-4 border-t border-border/30">
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Shield className="w-4 h-4 text-accent" />
                          <span className="font-cormorant text-sm">Secure Checkout</span>
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Truck className="w-4 h-4 text-accent" />
                          <span className="font-cormorant text-sm">Free Shipping $50+</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <Separator className="bg-border/30" />

                  {/* Secondary Option - Amazon */}
                  <div className="space-y-3">
                    <p className="font-cormorant text-sm text-muted-foreground text-center">
                      Also available on
                    </p>
                    {book.purchaseLinks.amazon && (
                      <a href={book.purchaseLinks.amazon} target="_blank" rel="noopener noreferrer" className="block">
                        <Button 
                          variant="outline" 
                          className="w-full border-border/50 hover:bg-muted/30 font-cormorant text-muted-foreground hover:text-foreground group"
                        >
                          Amazon
                          <ExternalLink className="w-4 h-4 ml-2 opacity-50 group-hover:opacity-100 transition-opacity" />
                        </Button>
                      </a>
                    )}
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Sample Chapter Section */}
      <section className="py-16 md:py-20 px-4 sm:px-6 bg-gradient-to-b from-background via-muted/10 to-background">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12 space-y-4">
            <div className="flex items-center justify-center gap-4">
              <div className="h-px w-16 bg-gradient-to-r from-transparent to-accent" />
              <BookOpen className="w-8 h-8 text-accent" />
              <div className="h-px w-16 bg-gradient-to-r from-accent to-transparent" />
            </div>
            <h2 className="font-cinzel text-4xl md:text-5xl font-bold text-foreground">
              Sample Chapter
            </h2>
            <p className="font-cormorant text-xl text-muted-foreground italic">
              Begin your journey into {book.title}
            </p>
          </div>

          <Card className="p-8 md:p-12 bg-card/80 backdrop-blur-sm border-border/50 shadow-deep">
            <div className="prose prose-lg prose-invert max-w-none">
              {book.sampleChapter.split('\n\n').map((paragraph, index) => {
                if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
                  return (
                    <h3 key={index} className="font-cinzel text-2xl md:text-3xl font-bold text-accent mt-0 mb-6">
                      {paragraph.replace(/\*\*/g, '')}
                    </h3>
                  );
                }
                if (paragraph.startsWith('---')) {
                  return <Separator key={index} className="my-8 bg-border/50" />;
                }
                if (paragraph.startsWith('*') && paragraph.endsWith('*')) {
                  return (
                    <p key={index} className="font-cormorant text-lg italic text-muted-foreground text-center">
                      {paragraph.replace(/\*/g, '')}
                    </p>
                  );
                }
                return (
                  <p key={index} className="font-cormorant text-lg md:text-xl text-foreground/90 leading-relaxed mb-6 first-letter:text-4xl first-letter:font-cinzel first-letter:text-accent first-letter:float-left first-letter:mr-2">
                    {paragraph}
                  </p>
                );
              })}
            </div>
          </Card>
        </div>
      </section>

      {/* Reviews & Testimonials Section */}
      <BookReviews bookTitle={book.title} />

      {/* Navigation to Other Books */}
      <section className="py-12 md:py-16 px-4 sm:px-6 border-t border-border/30">
        <div className="container mx-auto max-w-4xl">
          <div className="flex justify-between items-center gap-4">
            {prevBook && !prevBook.comingSoon ? (
              <Link to={`/book/${prevBook.slug}`} className="group flex-1">
                <div className="flex items-center gap-2 sm:gap-4 p-3 sm:p-4 rounded-xl hover:bg-muted/20 transition-colors">
                  <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0" />
                  <div className="text-left min-w-0">
                    <p className="text-xs sm:text-sm text-muted-foreground font-cormorant">Previous Book</p>
                    <p className="font-cinzel text-sm sm:text-lg text-foreground group-hover:text-primary transition-colors truncate">
                      {prevBook.title}
                    </p>
                  </div>
                </div>
              </Link>
            ) : prevBook?.comingSoon ? (
              <div className="flex-1 opacity-50 cursor-not-allowed">
                <div className="flex items-center gap-2 sm:gap-4 p-3 sm:p-4 rounded-xl">
                  <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-muted-foreground flex-shrink-0" />
                  <div className="text-left min-w-0">
                    <p className="text-xs sm:text-sm text-muted-foreground font-cormorant">Previous Book</p>
                    <p className="font-cinzel text-sm sm:text-lg text-muted-foreground truncate">
                      {prevBook.title}
                    </p>
                    <p className="text-xs text-accent font-cormorant">Coming Soon</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex-1" />
            )}

            {nextBook && !nextBook.comingSoon ? (
              <Link to={`/book/${nextBook.slug}`} className="group flex-1">
                <div className="flex items-center gap-2 sm:gap-4 p-3 sm:p-4 rounded-xl hover:bg-muted/20 transition-colors justify-end">
                  <div className="text-right min-w-0">
                    <p className="text-xs sm:text-sm text-muted-foreground font-cormorant">Next Book</p>
                    <p className="font-cinzel text-sm sm:text-lg text-foreground group-hover:text-primary transition-colors truncate">
                      {nextBook.title}
                    </p>
                  </div>
                  <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0" />
                </div>
              </Link>
            ) : nextBook?.comingSoon ? (
              <div className="flex-1 opacity-50 cursor-not-allowed">
                <div className="flex items-center gap-2 sm:gap-4 p-3 sm:p-4 rounded-xl justify-end">
                  <div className="text-right min-w-0">
                    <p className="text-xs sm:text-sm text-muted-foreground font-cormorant">Next Book</p>
                    <p className="font-cinzel text-sm sm:text-lg text-muted-foreground truncate">
                      {nextBook.title}
                    </p>
                    <p className="text-xs text-accent font-cormorant">Coming Soon</p>
                  </div>
                  <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-muted-foreground flex-shrink-0" />
                </div>
              </div>
            ) : (
              <div className="flex-1" />
            )}
          </div>
        </div>
      </section>


      <Footer />
    </div>
  );
};

export default BookDetail;
