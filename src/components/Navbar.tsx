import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, BookOpen, User, Mail, ShoppingBag, MessageSquareQuote } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { Badge } from "@/components/ui/badge";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { getItemCount } = useCartStore();
  const itemCount = getItemCount();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const location = useLocation();
  const isHomePage = location.pathname === "/";

  const navLinks = [
    { name: "About", href: "#about", icon: User, isAnchor: true },
    { name: "Bookstore", href: "#bookstore", icon: BookOpen, isAnchor: true },
    { name: "First Appearances", href: "#first-appearances", icon: BookOpen, isAnchor: true },
    { name: "Acclaim", href: "#acclaim", icon: MessageSquareQuote, isAnchor: true },
    { name: "Liner Notes", href: "#liner-notes", icon: ShoppingBag, isAnchor: true },
    { name: "Contact", href: "#contact", icon: Mail, isAnchor: true },
  ];

  const scrollToSection = (href: string) => {
    if (isHomePage) {
      const element = document.querySelector(href);
      element?.scrollIntoView({ behavior: "smooth" });
    } else {
      window.location.href = "/" + href;
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "bg-background/95 backdrop-blur-xl shadow-deep border-b border-border/50"
            : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link
              to="/"
              className="group flex items-center space-x-3 transition-transform hover:scale-105"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-gothic blur-xl opacity-50 group-hover:opacity-100 transition-opacity" />
                <div className="relative w-12 h-12 rounded-full bg-gradient-gothic flex items-center justify-center shadow-glow">
                  <span className="font-cinzel font-bold text-2xl text-primary-foreground">
                    DB
                  </span>
                </div>
              </div>
              <div className="hidden md:block">
                <div className="font-cinzel text-xl font-bold bg-gradient-gothic bg-clip-text text-transparent">
                  DOUG BROWN
                </div>
                <div className="font-cormorant text-xs text-muted-foreground italic">
                  Writer of Rarified Fiction
                </div>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              {navLinks.map((link) =>
                link.isAnchor ? (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(link.href);
                    }}
                    className="group relative font-cormorant text-lg text-foreground/80 hover:text-foreground transition-colors"
                  >
                    <span className="relative z-10">{link.name}</span>
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-gothic group-hover:w-full transition-all duration-300" />
                  </a>
                ) : (
                  <Link
                    key={link.name}
                    to={link.href}
                    className="group relative font-cormorant text-lg text-foreground/80 hover:text-foreground transition-colors"
                  >
                    <span className="relative z-10">{link.name}</span>
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-gothic group-hover:w-full transition-all duration-300" />
                  </Link>
                )
              )}
            </div>

            {/* CTA Button */}
            <div className="hidden lg:flex items-center gap-4">
              <Link
                to="/cart"
                className="relative p-2 text-foreground/80 hover:text-foreground transition-colors group"
                aria-label="Shopping cart"
              >
                {/* <ShoppingBag className="w-6 h-6" /> */}
                {itemCount > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center text-xs bg-accent text-accent-foreground">
                    {itemCount}
                  </Badge>
                )}
              </Link>
              <Button
                onClick={() => scrollToSection("#books")}
                className="font-cinzel bg-gradient-gothic hover:shadow-glow transition-all duration-300 text-primary-foreground border-0"
              >
                Explore Books
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-foreground hover:text-primary transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-40 lg:hidden transition-all duration-500 ${
          isMobileMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <div
          className="absolute inset-0 bg-background/98 backdrop-blur-2xl"
          onClick={() => setIsMobileMenuOpen(false)}
        />
        <div className="relative h-full flex flex-col items-center justify-center space-y-8 animate-fade-in">
          {navLinks.map((link, index) =>
            link.isAnchor ? (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(link.href);
                }}
                className="group flex items-center space-x-3 font-cinzel text-3xl text-foreground hover:text-primary transition-all duration-300 animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <link.icon className="w-8 h-8" />
                <span>{link.name}</span>
              </a>
            ) : (
              <Link
                key={link.name}
                to={link.href}
                className="group flex items-center space-x-3 font-cinzel text-3xl text-foreground hover:text-primary transition-all duration-300 animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <link.icon className="w-8 h-8" />
                <span>{link.name}</span>
              </Link>
            )
          )}
          <Button
            onClick={() => scrollToSection("#books")}
            size="lg"
            className="font-cinzel bg-gradient-gothic hover:shadow-glow transition-all duration-300 text-primary-foreground border-0 animate-fade-in"
            style={{ animationDelay: "400ms" }}
          >
            Explore Books
          </Button>
        </div>
      </div>
    </>
  );
};

export default Navbar;
