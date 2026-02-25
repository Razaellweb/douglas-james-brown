import { ShoppingBag, Headphones, BookOpen, GraduationCap, Pen, Gift, Sparkles, ArrowRight, Check, Package } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  image?: string;
  category: "ebook" | "audiobook" | "course" | "signed" | "merchandise";
  badge?: string;
  features?: string[];
  available: boolean;
}

interface BookShopProps {
  bookTitle: string;
  bookImage: string;
}

const categoryIcons = {
  ebook: BookOpen,
  audiobook: Headphones,
  course: GraduationCap,
  signed: Pen,
  merchandise: Gift,
};

const categoryLabels = {
  ebook: "E-Books",
  audiobook: "Audiobooks",
  course: "Courses",
  signed: "Signed Editions",
  merchandise: "Merchandise",
};

// Demo products data
const demoProducts: Product[] = [
  {
    id: "1",
    name: "Complete E-Book Bundle",
    description: "Get all four books in the series in digital format. Perfect for reading on any device.",
    price: 29.99,
    originalPrice: 49.99,
    category: "ebook",
    badge: "Best Value",
    features: ["Instant download", "All 4 books", "PDF, EPUB, MOBI formats", "Lifetime access"],
    available: true,
  },
  {
    id: "2",
    name: "Audiobook - Narrated by Author",
    description: "Experience the story as Mary Lou Wells intended, narrated in her own voice with ambient African soundscapes.",
    price: 24.99,
    category: "audiobook",
    badge: "Fan Favorite",
    features: ["12+ hours of audio", "Author narration", "Original soundtrack", "Offline listening"],
    available: true,
  },
  {
    id: "3",
    name: "Masterclass: African Mythology in Fiction",
    description: "A comprehensive 8-week online course exploring the rich traditions of African mythology and how to weave them into modern storytelling.",
    price: 199.99,
    originalPrice: 299.99,
    category: "course",
    badge: "Limited Enrollment",
    features: ["8 video modules", "Live Q&A sessions", "Writing exercises", "Certificate of completion"],
    available: true,
  },
  {
    id: "4",
    name: "Collector's Signed Hardcover",
    description: "A premium hardcover edition personally signed by Mary Lou Wells. Includes exclusive artwork and a personalized dedication.",
    price: 89.99,
    category: "signed",
    badge: "Exclusive",
    features: ["Hand-signed", "Numbered edition", "Premium binding", "Exclusive artwork insert"],
    available: true,
  },
  {
    id: "5",
    name: "Spear of Destiny T-Shirt",
    description: "Premium cotton t-shirt featuring the iconic Spear of Destiny artwork. Available in multiple sizes.",
    price: 34.99,
    category: "merchandise",
    features: ["100% organic cotton", "Unisex fit", "S-3XL sizes", "Machine washable"],
    available: true,
  },
  {
    id: "6",
    name: "Peacock Feather Bookmark Set",
    description: "Elegant metal bookmarks inspired by the peacock motifs from the series. Set of 3 with different designs.",
    price: 19.99,
    category: "merchandise",
    features: ["Set of 3", "Metal with enamel", "Gift boxed", "Peacock designs"],
    available: true,
  },
];

const BookShop = ({ bookTitle, bookImage }: BookShopProps) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null);
  const { toast } = useToast();

  const categories = ["all", "ebook", "audiobook", "course", "signed", "merchandise"];
  
  const filteredProducts = selectedCategory === "all" 
    ? demoProducts 
    : demoProducts.filter(p => p.category === selectedCategory);

  const handleAddToCart = (product: Product) => {
    toast({
      title: "Added to Cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  return (
    <section className="py-16 md:py-24 px-4 sm:px-6 bg-gradient-to-b from-muted/10 via-background to-background relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      
      <div className="container mx-auto max-w-7xl relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 space-y-4">
          <div className="flex items-center justify-center gap-4">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-accent" />
            <ShoppingBag className="w-8 h-8 text-accent" />
            <div className="h-px w-16 bg-gradient-to-r from-accent to-transparent" />
          </div>
          <h2 className="font-cinzel text-4xl md:text-5xl font-bold text-foreground">
            The Author's Collection
          </h2>
          <p className="font-cormorant text-xl text-muted-foreground italic max-w-2xl mx-auto">
            Exclusive products, signed editions, and immersive experiences curated by Mary Lou Wells
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((cat) => {
            const Icon = cat !== "all" ? categoryIcons[cat as keyof typeof categoryIcons] : Sparkles;
            const label = cat === "all" ? "All Products" : categoryLabels[cat as keyof typeof categoryLabels];
            
            return (
              <Button
                key={cat}
                variant={selectedCategory === cat ? "default" : "outline"}
                onClick={() => setSelectedCategory(cat)}
                className={`font-cinzel text-sm ${
                  selectedCategory === cat 
                    ? "bg-gradient-peacock text-primary-foreground border-0" 
                    : "border-border/50 hover:border-accent/50 hover:bg-accent/10"
                }`}
              >
                <Icon className="w-4 h-4 mr-2" />
                {label}
              </Button>
            );
          })}
        </div>

        {/* Featured Product (first product) */}
        {selectedCategory === "all" && filteredProducts.length > 0 && (
          <Card className="mb-12 p-0 overflow-hidden bg-gradient-to-r from-card via-card to-secondary/10 border-accent/30 shadow-deep">
            <div className="grid md:grid-cols-2">
              <div className="relative h-64 md:h-auto bg-gradient-to-br from-secondary/20 to-primary/20 flex items-center justify-center p-8">
                <div className="relative">
                  <div className="absolute -inset-4 bg-gradient-peacock rounded-xl blur-xl opacity-30" />
                  <img 
                    src={bookImage} 
                    alt={bookTitle}
                    className="relative w-48 h-auto rounded-lg shadow-deep transform -rotate-3 hover:rotate-0 transition-transform duration-500"
                  />
                </div>
                <Badge className="absolute top-6 left-6 bg-accent text-accent-foreground font-cinzel">
                  <Sparkles className="w-3 h-3 mr-1" />
                  Featured
                </Badge>
              </div>
              
              <div className="p-8 md:p-12 space-y-6">
                <div>
                  <Badge variant="outline" className="mb-4 border-accent/50 text-accent font-cormorant">
                    {filteredProducts[0].badge}
                  </Badge>
                  <h3 className="font-cinzel text-2xl md:text-3xl font-bold text-foreground mb-3">
                    {filteredProducts[0].name}
                  </h3>
                  <p className="font-cormorant text-lg text-muted-foreground leading-relaxed">
                    {filteredProducts[0].description}
                  </p>
                </div>
                
                <ul className="space-y-2">
                  {filteredProducts[0].features?.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2 font-cormorant text-foreground/80">
                      <Check className="w-4 h-4 text-primary" />
                      {feature}
                    </li>
                  ))}
                </ul>
                
                <div className="flex flex-wrap items-center gap-6">
                  <div className="flex items-baseline gap-2">
                    <span className="font-cinzel text-4xl font-bold text-accent">
                      ${filteredProducts[0].price}
                    </span>
                    {filteredProducts[0].originalPrice && (
                      <span className="font-cormorant text-lg text-muted-foreground line-through">
                        ${filteredProducts[0].originalPrice}
                      </span>
                    )}
                  </div>
                  <Button 
                    size="lg"
                    onClick={() => handleAddToCart(filteredProducts[0])}
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
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {(selectedCategory === "all" ? filteredProducts.slice(1) : filteredProducts).map((product) => {
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
                  {/* Category Icon */}
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                    <CategoryIcon className="w-7 h-7 text-accent" />
                  </div>
                  
                  {/* Product Info */}
                  <div>
                    <p className="font-cormorant text-xs text-accent uppercase tracking-wider mb-1">
                      {categoryLabels[product.category]}
                    </p>
                    <h4 className="font-cinzel text-lg font-bold text-foreground mb-2">
                      {product.name}
                    </h4>
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

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <Card className="inline-block p-8 bg-gradient-to-r from-primary/10 via-accent/10 to-secondary/10 border-accent/30">
            <div className="space-y-4">
              <Gift className="w-10 h-10 text-accent mx-auto" />
              <h3 className="font-cinzel text-xl font-bold text-foreground">
                Looking for a Gift?
              </h3>
              <p className="font-cormorant text-muted-foreground max-w-md">
                Gift cards and custom bundles available. Contact the author directly for personalized packages.
              </p>
              <Button variant="outline" className="font-cinzel border-accent/50 hover:bg-accent/10">
                Contact for Custom Orders
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default BookShop;
