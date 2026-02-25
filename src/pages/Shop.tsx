import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GiftFlowModal from "@/components/GiftFlowModal";
import { products, Product } from "@/data/products";
import { books } from "@/data/books";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { useCartStore } from "@/store/cartStore";
import { 
  ShoppingBag, 
  Headphones, 
  BookOpen, 
  Pen, 
  Gift, 
  Sparkles, 
  ArrowRight,
  Check, 
  Package,
  Filter,
  X,
  ChevronDown
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu";

const categoryIcons = {
  ebook: BookOpen,
  audiobook: Headphones,
  signed: Pen,
  merchandise: Gift,
};

const categoryLabels = {
  ebook: "E-Books",
  audiobook: "Audiobooks",
  signed: "Signed Editions",
  merchandise: "Merchandise",
};

const Shop = () => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedBooks, setSelectedBooks] = useState<string[]>([]);
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null);
  const [giftModalOpen, setGiftModalOpen] = useState(false);
  const { toast } = useToast();
  const { addItem } = useCartStore();

  const categories = ["ebook", "audiobook", "signed", "merchandise"] as const;
  
  // Filter products based on selections
  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      const categoryMatch = selectedCategories.length === 0 || selectedCategories.includes(p.category);
      const bookMatch = selectedBooks.length === 0 || selectedBooks.includes(p.bookSlug);
      return categoryMatch && bookMatch;
    });
  }, [selectedCategories, selectedBooks]);

  // Get featured product (best value or first)
  const featuredProduct = filteredProducts.find(p => p.badge === "Best Value") || filteredProducts[0];
  const otherProducts = featuredProduct 
    ? filteredProducts.filter(p => p.id !== featuredProduct.id)
    : filteredProducts;

  const toggleCategory = (category: string) => {
    setSelectedCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const toggleBook = (bookSlug: string) => {
    setSelectedBooks(prev => 
      prev.includes(bookSlug) 
        ? prev.filter(b => b !== bookSlug)
        : [...prev, bookSlug]
    );
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setSelectedBooks([]);
  };

  const handleAddToCart = (product: Product) => {
    addItem(product, 1);
    toast({
      title: "Added to Cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  const hasActiveFilters = selectedCategories.length > 0 || selectedBooks.length > 0;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-16 px-4 sm:px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-secondary/20 via-background to-background" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
        
        <div className="container relative z-10 mx-auto max-w-7xl text-center">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-accent" />
            <ShoppingBag className="w-10 h-10 text-accent" />
            <div className="h-px w-16 bg-gradient-to-r from-accent to-transparent" />
          </div>
          
          <h1 className="font-cinzel text-4xl md:text-6xl lg:text-7xl font-bold mb-4">
            <span className="bg-gradient-peacock bg-clip-text text-transparent">
              The Author's Collection
            </span>
          </h1>
          <p className="font-cormorant text-xl md:text-2xl text-muted-foreground italic max-w-3xl mx-auto mb-8">
            Exclusive products, signed editions, and immersive experiences curated by Mary Lou Wells
          </p>

          {/* Quick Stats */}
          <div className="flex flex-wrap justify-center gap-8 mb-8">
            <div className="text-center">
              <p className="font-cinzel text-3xl font-bold text-accent">{products.length}</p>
              <p className="font-cormorant text-muted-foreground">Products</p>
            </div>
            <div className="text-center">
              <p className="font-cinzel text-3xl font-bold text-accent">{books.length}</p>
              <p className="font-cormorant text-muted-foreground">Books</p>
            </div>
            <div className="text-center">
              <p className="font-cinzel text-3xl font-bold text-accent">4</p>
              <p className="font-cormorant text-muted-foreground">Categories</p>
            </div>
          </div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="sticky top-20 z-30 py-4 px-4 sm:px-6 bg-background/95 backdrop-blur-xl border-b border-border/30">
        <div className="container mx-auto max-w-7xl">
          <div className="flex flex-wrap items-center justify-between gap-4">
            {/* Category Filters */}
            <div className="flex flex-wrap items-center gap-3">
              <span className="font-cormorant text-muted-foreground flex items-center gap-2">
                <Filter className="w-4 h-4" />
                Filter:
              </span>
              
              {/* Category Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="font-cinzel text-sm border-border/50 hover:border-accent/50">
                    <Sparkles className="w-4 h-4 mr-2" />
                    Category
                    {selectedCategories.length > 0 && (
                      <Badge className="ml-2 bg-accent text-accent-foreground text-xs px-1.5">
                        {selectedCategories.length}
                      </Badge>
                    )}
                    <ChevronDown className="w-4 h-4 ml-2" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-48 bg-card border-border/50">
                  {categories.map((cat) => {
                    const Icon = categoryIcons[cat];
                    return (
                      <DropdownMenuCheckboxItem
                        key={cat}
                        checked={selectedCategories.includes(cat)}
                        onCheckedChange={() => toggleCategory(cat)}
                        className="font-cormorant"
                      >
                        <Icon className="w-4 h-4 mr-2" />
                        {categoryLabels[cat]}
                      </DropdownMenuCheckboxItem>
                    );
                  })}
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Book Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="font-cinzel text-sm border-border/50 hover:border-accent/50">
                    <BookOpen className="w-4 h-4 mr-2" />
                    Book
                    {selectedBooks.length > 0 && (
                      <Badge className="ml-2 bg-accent text-accent-foreground text-xs px-1.5">
                        {selectedBooks.length}
                      </Badge>
                    )}
                    <ChevronDown className="w-4 h-4 ml-2" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-56 bg-card border-border/50">
                  {books.map((book) => (
                    <DropdownMenuCheckboxItem
                      key={book.slug}
                      checked={selectedBooks.includes(book.slug)}
                      onCheckedChange={() => toggleBook(book.slug)}
                      className="font-cormorant"
                    >
                      {book.title}
                      {book.comingSoon && (
                        <Badge variant="outline" className="ml-2 text-xs border-accent/50 text-accent">
                          Soon
                        </Badge>
                      )}
                    </DropdownMenuCheckboxItem>
                  ))}
                  <DropdownMenuSeparator />
                  <DropdownMenuCheckboxItem
                    checked={selectedBooks.includes("spear-of-chaos") && selectedBooks.length === 1}
                    onCheckedChange={() => {
                      setSelectedBooks(["spear-of-chaos"]);
                    }}
                    className="font-cormorant text-accent"
                  >
                    Complete Series Bundles
                  </DropdownMenuCheckboxItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Clear Filters */}
              {hasActiveFilters && (
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={clearFilters}
                  className="font-cormorant text-muted-foreground hover:text-foreground"
                >
                  <X className="w-4 h-4 mr-1" />
                  Clear
                </Button>
              )}
            </div>

            {/* Results Count */}
            <p className="font-cormorant text-muted-foreground">
              Showing <span className="text-foreground font-semibold">{filteredProducts.length}</span> products
            </p>
          </div>

          {/* Active Filter Pills */}
          {hasActiveFilters && (
            <div className="flex flex-wrap gap-2 mt-4">
              {selectedCategories.map(cat => (
                <Badge 
                  key={cat}
                  variant="secondary"
                  className="font-cormorant cursor-pointer hover:bg-destructive/20"
                  onClick={() => toggleCategory(cat)}
                >
                  {categoryLabels[cat as keyof typeof categoryLabels]}
                  <X className="w-3 h-3 ml-1" />
                </Badge>
              ))}
              {selectedBooks.map(bookSlug => {
                const book = books.find(b => b.slug === bookSlug);
                return (
                  <Badge 
                    key={bookSlug}
                    variant="secondary"
                    className="font-cormorant cursor-pointer hover:bg-destructive/20"
                    onClick={() => toggleBook(bookSlug)}
                  >
                    {book?.title || bookSlug}
                    <X className="w-3 h-3 ml-1" />
                  </Badge>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Products Section */}
      <section className="py-12 md:py-16 px-4 sm:px-6">
        <div className="container mx-auto max-w-7xl">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-20">
              <ShoppingBag className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="font-cinzel text-2xl text-foreground mb-2">No products found</h3>
              <p className="font-cormorant text-muted-foreground mb-6">
                Try adjusting your filters to find what you're looking for.
              </p>
              <Button onClick={clearFilters} className="font-cinzel bg-gradient-peacock text-primary-foreground">
                Clear All Filters
              </Button>
            </div>
          ) : (
            <>
              {/* Featured Product */}
              {featuredProduct && !hasActiveFilters && (
                <Card className="mb-12 p-0 overflow-hidden bg-gradient-to-r from-card via-card to-secondary/10 border-accent/30 shadow-deep">
                  <div className="grid md:grid-cols-2">
                    <div className="relative h-64 md:h-auto bg-gradient-to-br from-secondary/20 to-primary/20 flex items-center justify-center p-8">
                      <div className="relative">
                        <div className="absolute -inset-4 bg-gradient-peacock rounded-xl blur-xl opacity-30" />
                        {featuredProduct.image && (
                          <img 
                            src={featuredProduct.image} 
                            alt={featuredProduct.name}
                            className="relative w-48 h-auto rounded-lg shadow-deep transform -rotate-3 hover:rotate-0 transition-transform duration-500"
                          />
                        )}
                      </div>
                      <Badge className="absolute top-6 left-6 bg-accent text-accent-foreground font-cinzel">
                        <Sparkles className="w-3 h-3 mr-1" />
                        Featured
                      </Badge>
                    </div>
                    
                    <div className="p-8 md:p-12 space-y-6">
                      <div>
                        {featuredProduct.badge && (
                          <Badge variant="outline" className="mb-4 border-accent/50 text-accent font-cormorant">
                            {featuredProduct.badge}
                          </Badge>
                        )}
                        <h3 className="font-cinzel text-2xl md:text-3xl font-bold text-foreground mb-3">
                          {featuredProduct.name}
                        </h3>
                        <p className="font-cormorant text-lg text-muted-foreground leading-relaxed">
                          {featuredProduct.description}
                        </p>
                      </div>
                      
                      {featuredProduct.features && (
                        <ul className="space-y-2">
                          {featuredProduct.features.map((feature, i) => (
                            <li key={i} className="flex items-center gap-2 font-cormorant text-foreground/80">
                              <Check className="w-4 h-4 text-primary" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                      )}
                      
                      <div className="flex flex-wrap items-center gap-6">
                        <div className="flex items-baseline gap-2">
                          <span className="font-cinzel text-4xl font-bold text-accent">
                            ${featuredProduct.price}
                          </span>
                          {featuredProduct.originalPrice && (
                            <span className="font-cormorant text-lg text-muted-foreground line-through">
                              ${featuredProduct.originalPrice}
                            </span>
                          )}
                        </div>
                        <Button 
                          size="lg"
                          onClick={() => handleAddToCart(featuredProduct)}
                          className="bg-gradient-peacock hover:shadow-glow text-primary-foreground font-cinzel group"
                        >
                          Add to Cart
                          <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              )}

              {/* Product Grid */}
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {(hasActiveFilters ? filteredProducts : otherProducts).map((product) => {
                  const CategoryIcon = categoryIcons[product.category];
                  
                  return (
                    <Card 
                      key={product.id}
                      className={`relative p-6 bg-card/50 border-border/30 transition-all duration-300 group ${
                        hoveredProduct === product.id ? "shadow-glow border-accent/50 scale-[1.02]" : "hover:border-accent/30"
                      }`}
                      onMouseEnter={() => setHoveredProduct(product.id)}
                      onMouseLeave={() => setHoveredProduct(null)}
                    >
                      {product.badge && (
                        <Badge className="absolute top-4 right-4 bg-accent/90 text-accent-foreground font-cormorant text-xs">
                          {product.badge}
                        </Badge>
                      )}
                      
                      <div className="space-y-4">
                        {/* Product Image or Category Icon */}
                        {product.image ? (
                          <div className="relative w-full h-32 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-lg overflow-hidden flex items-center justify-center">
                            <img 
                              src={product.image}
                              alt={product.name}
                              className="h-full w-auto object-contain"
                            />
                          </div>
                        ) : (
                          <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                            <CategoryIcon className="w-7 h-7 text-accent" />
                          </div>
                        )}
                        
                        {/* Product Info */}
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <CategoryIcon className="w-3 h-3 text-accent" />
                            <p className="font-cormorant text-xs text-accent uppercase tracking-wider">
                              {categoryLabels[product.category]}
                            </p>
                          </div>
                          <h4 className="font-cinzel text-lg font-bold text-foreground mb-1 group-hover:text-primary transition-colors">
                            {product.name}
                          </h4>
                          <p className="font-cormorant text-xs text-muted-foreground mb-2">
                            {product.bookTitle}
                          </p>
                          <p className="font-cormorant text-sm text-muted-foreground line-clamp-2">
                            {product.description}
                          </p>
                        </div>
                        
                        {/* Features Preview */}
                        {product.features && (
                          <ul className="space-y-1">
                            {product.features.slice(0, 2).map((feature, i) => (
                              <li key={i} className="flex items-center gap-2 font-cormorant text-sm text-foreground/70">
                                <Check className="w-3 h-3 text-primary" />
                                {feature}
                              </li>
                            ))}
                            {product.features.length > 2 && (
                              <li className="font-cormorant text-xs text-muted-foreground">
                                +{product.features.length - 2} more
                              </li>
                            )}
                          </ul>
                        )}
                        
                        {/* Price and Action */}
                        <div className="flex items-center justify-between pt-4 border-t border-border/30">
                          <div className="flex items-baseline gap-2">
                            <span className="font-cinzel text-2xl font-bold text-accent">
                              ${product.price}
                            </span>
                            {product.originalPrice && (
                              <span className="font-cormorant text-sm text-muted-foreground line-through">
                                ${product.originalPrice}
                              </span>
                            )}
                          </div>
                          <Button 
                            size="sm"
                            variant="outline"
                            onClick={() => handleAddToCart(product)}
                            className="border-accent/50 hover:bg-accent hover:text-accent-foreground font-cinzel text-xs group"
                          >
                            <Package className="w-3 h-3 mr-1" />
                            Add
                          </Button>
                        </div>
                      </div>
                    </Card>
                  );
                })}
              </div>
            </>
          )}

          {/* Bottom CTA - Gift Section */}
          <div className="mt-16 text-center">
            <Card className="inline-block p-8 bg-gradient-to-r from-primary/10 via-accent/10 to-secondary/10 border-accent/30">
              <div className="space-y-4">
                <Gift className="w-10 h-10 text-accent mx-auto" />
                <h3 className="font-cinzel text-xl font-bold text-foreground">
                  Looking for a Gift?
                </h3>
                <p className="font-cormorant text-muted-foreground max-w-md">
                  Send the gift of epic storytelling to someone special. Personalized messages and scheduled delivery available.
                </p>
                <Button 
                  onClick={() => setGiftModalOpen(true)}
                  className="font-cinzel bg-gradient-peacock text-primary-foreground hover:shadow-glow"
                >
                  <Gift className="w-4 h-4 mr-2" />
                  Start Gift Experience
                  <Sparkles className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </section>

      <Footer />

      {/* Gift Flow Modal */}
      <GiftFlowModal open={giftModalOpen} onOpenChange={setGiftModalOpen} />
    </div>
  );
};

export default Shop;
