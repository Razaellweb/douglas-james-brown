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
    { name: "About", href: "#about", icon: User, isAnchor: true },
    { name: "Contact", href: "#about", icon: Mail, isAnchor: true },
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
              className="flex items-center transition-opacity hover:opacity-80 py-2 w-1/2 justify-start"
            >
              <div className="font-cormorant text-2xl tracking-widest text-primary font-semibold relative after:content-[''] after:absolute after:left-0 after:-bottom-1 after:w-[150%] after:h-[1px] after:bg-primary/50">
                Doug Brown
              </div>
            </Link>

            <div className="flex items-center gap-4">
              {/* Desktop Menu */}
              <div className="hidden md:flex items-center gap-6 mr-4">
                {navLinks.map((link) => (
                  <button
                    key={link.name}
                    onClick={() => scrollToSection(link.href)}
                    className="font-cormorant text-[17px] font-medium text-foreground hover:text-primary transition-colors"
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
                className="group flex items-center space-x-3 font-cormorant text-3xl font-bold text-foreground hover:text-primary transition-all duration-300 animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <link.icon className="w-6 h-6" />
                <span>{link.name}</span>
              </a>
            ) : (
              <Link
                key={link.name}
                to={link.href}
                className="group flex items-center space-x-3 font-cormorant text-3xl font-bold text-foreground hover:text-primary transition-all duration-300 animate-fade-in"
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
