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
    { name: "Bookshelf", href: "#bookstore", icon: BookOpen, isAnchor: true },
    { name: "First Appearances", href: "#first-appearances", icon: BookOpen, isAnchor: true },
    { name: "Acclaim", href: "#acclaim", icon: MessageSquareQuote, isAnchor: true },
    { name: "Fandom", href: "#fandom", icon: ShoppingBag, isAnchor: true },
    { name: "Author", href: "#about", icon: User, isAnchor: true },
    // { name: "Contact", href: "#about", icon: Mail, isAnchor: true },
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
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b-2 border-primary/20 bg-background/95 backdrop-blur-xl shadow-md`}
      >
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo - Styled like a book spine */}
            <Link
              to="/"
              className="flex items-center transition-opacity hover:opacity-80 py-2 w-1/2 md:w-1/3 justify-start shrink-0"
            >
              <div className="font-cormorant text-[7vw] sm:text-4xl md:text-[3.5vw] lg:text-[4vw] tracking-widest text-primary font-bold relative whitespace-nowrap">
                Doug Brown
              </div>
            </Link>

            <div className="flex items-center gap-4">
              {/* Desktop Menu */}
              <div className="hidden lg:flex items-center gap-2 xl:gap-4 mr-2">
                {navLinks.map((link) => (
                  <button
                    key={link.name}
                    onClick={() => scrollToSection(link.href)}
                    className="font-cormorant text-base xl:text-lg font-bold px-3 py-1.5 xl:px-4 xl:py-2 border border-primary/50 bg-primary/10 hover:bg-primary text-primary hover:text-primary-foreground rounded transition-all shadow-[0_0_10px_rgba(212,175,55,0.15)] hover:shadow-[0_0_15px_rgba(212,175,55,0.4)] whitespace-nowrap"
                  >
                    {link.name}
                  </button>
                ))}
              </div>

              {/* CTA Button */}
              <Link
                to="/cart"
                className="relative p-2 text-foreground/80 hover:text-foreground transition-colors group hidden sm:block"
                aria-label="Shopping cart"
              >
                {itemCount > 0 && (
                  <Badge className="absolute top-1 right-1 h-4 w-4 p-0 flex items-center justify-center text-[10px] bg-accent text-accent-foreground">
                    {itemCount}
                  </Badge>
                )}
              </Link>
              
              {/* Menu Button (Mobile only) */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 text-foreground hover:text-primary transition-colors pr-2"
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? (
                  <X className="w-7 h-7" />
                ) : (
                  <Menu className="w-7 h-7" />
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-40 transition-all duration-500 ${
          isMobileMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <div
          className="absolute inset-0 bg-background/98 backdrop-blur-2xl"
          onClick={() => setIsMobileMenuOpen(false)}
        />
        <div className="relative h-full flex flex-col items-center justify-center space-y-6 animate-fade-in px-6">
          {navLinks.map((link, index) =>
            link.isAnchor ? (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(link.href);
                }}
                className="group flex items-center justify-center space-x-3 w-full max-w-sm font-cormorant text-2xl font-bold px-6 py-4 border-2 border-primary/50 bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground rounded-lg transition-all duration-300 shadow-[0_0_15px_rgba(212,175,55,0.2)] animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <link.icon className="w-6 h-6" />
                <span>{link.name}</span>
              </a>
            ) : (
              <Link
                key={link.name}
                to={link.href}
                className="group flex items-center justify-center space-x-3 w-full max-w-sm font-cormorant text-2xl font-bold px-6 py-4 border-2 border-primary/50 bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground rounded-lg transition-all duration-300 shadow-[0_0_15px_rgba(212,175,55,0.2)] animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <link.icon className="w-6 h-6" />
                <span>{link.name}</span>
              </Link>
            )
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
