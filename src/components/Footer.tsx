const navLinks = [
  { name: "Bookshelf", href: "#bookstore" },
  { name: "First Appearances", href: "#first-appearances" },
  { name: "Acclaim", href: "#acclaim" },
  { name: "Fandom", href: "#fandom" },
  { name: "Author", href: "#about" },
];

const Footer = () => {
  const scrollToSection = (href: string) => {
    const isHomePage = window.location.pathname === "/";
    if (isHomePage) {
      const element = document.querySelector(href);
      element?.scrollIntoView({ behavior: "smooth" });
    } else {
      window.location.href = "/" + href;
    }
  };

  return (
    <footer id="contact" className="relative bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-6 py-16 flex flex-col items-center justify-center space-y-12">
        {/* Navigation Buttons mirroring Top Nav */}
        {/* <div className="flex flex-wrap justify-center gap-4">
          {navLinks.map((link) => (
            <button
              key={link.name}
              onClick={() => scrollToSection(link.href)}
              className="font-cormorant text-base xl:text-lg font-bold px-4 py-2 border border-primary/50 bg-primary/10 hover:bg-primary text-primary hover:text-primary-foreground rounded transition-all shadow-[0_0_10px_rgba(212,175,55,0.15)] hover:shadow-[0_0_15px_rgba(212,175,55,0.4)] whitespace-nowrap"
            >
              {link.name}
            </button>
          ))}
        </div> */}

        {/* Copyright */}
        <p className="font-cormorant text-muted-foreground text-sm">
          © Doug Brown
        </p>
      </div>
    </footer>
  );
};

export default Footer;
