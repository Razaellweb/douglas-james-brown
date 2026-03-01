import { useState } from "react";
import { Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import NewsletterModal from "./NewsletterModal";

// Amazon icon component
const AmazonIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    className={className}
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M.045 18.02c.072-.116.187-.124.348-.064 2.729 1.353 5.706 2.03 8.926 2.03 2.314 0 4.543-.423 6.685-1.27a18.6 18.6 0 0 0 1.742-.832c.164-.089.302-.104.414-.042.112.062.155.188.126.378-.03.19-.154.42-.372.693-.218.274-.57.635-1.057 1.082a11.836 11.836 0 0 1-3.407 2.118c-1.32.583-2.646.877-3.978.877-1.682 0-3.283-.397-4.8-1.19A11.8 11.8 0 0 1 .96 18.82c-.262-.278-.36-.467-.295-.578l-.62-.222zM6.023 14.078c0-.953.238-1.76.713-2.423.476-.664 1.123-1.167 1.94-1.513.88-.375 1.963-.655 3.253-.84.489-.063 1.235-.138 2.24-.225v-.46c0-.862-.095-1.438-.284-1.726-.343-.5-.898-.748-1.664-.748h-.152c-.46.032-.85.173-1.175.42-.325.248-.555.618-.69 1.108-.074.243-.197.378-.368.408l-2.13-.284c-.188-.038-.283-.142-.283-.312 0-.039.007-.084.02-.134.288-1.413.963-2.425 2.025-3.036.508-.29 1.092-.502 1.752-.634.66-.132 1.274-.198 1.84-.198h.44c1.36.074 2.447.51 3.26 1.308.306.306.545.64.715 1 .17.36.274.66.31.896.037.236.056.755.056 1.558v4.488c0 .3.05.6.15.9.1.3.2.52.28.66.08.14.2.32.33.52.06.1.09.19.09.27 0 .1-.06.19-.17.27l-1.42 1.21c-.1.07-.22.07-.36.02a5.26 5.26 0 0 1-.57-.53l-.27-.32-.32-.42c-.98.98-2.04 1.47-3.16 1.47-.94 0-1.7-.27-2.28-.82-.58-.54-.87-1.3-.87-2.28zm3.7-.47c0 .47.12.85.37 1.13.25.29.58.43 1 .43.04 0 .1-.01.2-.03.09-.02.15-.03.18-.03.53-.14.97-.46 1.32-.97.18-.26.31-.54.38-.85.07-.3.1-.72.1-1.24v-.65c-.74.06-1.34.14-1.82.24-1.15.26-1.73.87-1.73 1.82v.1z" />
    <path d="M21.5 18.3c.28-.41.54-.44.78-.08.69.94.82 1.14 1.5 1.99.18.2.27.37.27.53 0 .18-.1.33-.3.44l-.96.63c-.18.11-.35.15-.48.15-.2 0-.38-.07-.58-.22-.67-.53-1.08-.88-1.26-1.04-.18-.27-.3-.37-.36-.33-.05.05.17.45-.4 1.25-.57.8-1.34 1.22-2.3 1.22-.66 0-1.22-.23-1.67-.68-.45-.45-.67-1.07-.67-1.85 0-1.05.4-1.87 1.2-2.46.8-.59 1.87-.88 3.22-.88h.78v-.4c0-.44-.07-.79-.22-1.06-.14-.27-.43-.41-.86-.41-.4 0-.7.1-.9.32-.2.2-.33.52-.37.93-.03.15-.12.24-.26.26l-1.37-.18c-.12-.03-.19-.09-.19-.2 0-.02 0-.05.02-.1.18-.91.58-1.55 1.2-1.94.62-.39 1.38-.58 2.27-.58.97 0 1.74.27 2.3.82s.84 1.38.84 2.5v2.9c0 .23.04.44.13.62.09.18.19.33.3.44z" />
  </svg>
);

const Footer = () => {
  const [newsletterOpen, setNewsletterOpen] = useState(false);

  return (
    <footer id="contact" className="relative bg-gradient-to-b from-background to-muted/20 border-t border-border/50">
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand section */}
          <div className="space-y-4">
            <h3 className="font-cinzel text-2xl font-bold bg-gradient-gothic bg-clip-text text-transparent">
              Doug Brown
            </h3>
            <p className="font-cormorant text-muted-foreground leading-relaxed">
              New England Gothic fiction writer. Katie Lehman Award winner. 
              Weaving the ordinary into incisive tapestries of the marvelous and the grotesque.
            </p>
          </div>

          {/* Quick links */}
          <div className="space-y-4">
            <h4 className="font-cinzel text-lg font-semibold text-foreground">Quick Links</h4>
            <ul className="space-y-2 font-cormorant">
              <li>
                <a href="#about" className="text-muted-foreground hover:text-primary transition-colors">
                  About
                </a>
              </li>
              <li>
                <a href="#bookstore" className="text-muted-foreground hover:text-primary transition-colors">
                  Bookstore
                </a>
              </li>
              <li>
                <a href="#acclaim" className="text-muted-foreground hover:text-primary transition-colors">
                  Acclaim
                </a>
              </li>
              <li>
                <a href="#liner-notes" className="text-muted-foreground hover:text-primary transition-colors">
                  Liner Notes
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h4 className="font-cinzel text-lg font-semibold text-foreground">Stay Connected</h4>
            <p className="font-cormorant text-muted-foreground text-sm">
              Subscribe for updates on new releases, behind-the-scenes insights, and exclusive content from the world of Doug Brown's fiction.
            </p>
            <Button 
              onClick={() => setNewsletterOpen(true)}
              className="w-full bg-gradient-gothic hover:shadow-glow transition-all duration-300 text-primary-foreground border-0"
            >
              <Mail className="w-4 h-4 mr-2" />
              Subscribe to Newsletter
            </Button>
          </div>
        </div>

        {/* Social media and copyright */}
        <div className="pt-8 border-t border-border/50 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-4">
            <a 
              href="http://amazon.com/author/doug.brown.fiction"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-muted/30 flex items-center justify-center hover:bg-primary/20 hover:text-primary transition-all duration-300"
              aria-label="Amazon Author Page"
            >
              <AmazonIcon className="w-5 h-5" />
            </a>
            <a 
              href="mailto:doug.brown.fiction@gmail.com"
              className="w-10 h-10 rounded-full bg-muted/30 flex items-center justify-center hover:bg-primary/20 hover:text-primary transition-all duration-300"
              aria-label="Email"
            >
              <Mail className="w-5 h-5" />
            </a>
          </div>

          <p className="font-cormorant text-muted-foreground text-sm">
            © {new Date().getFullYear()} Douglas James Brown. All rights reserved. Published by Serif Press.
          </p>
        </div>
      </div>

      {/* Decorative top border */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-gothic" />

      {/* Newsletter Modal */}
      <NewsletterModal open={newsletterOpen} onOpenChange={setNewsletterOpen} />
    </footer>
  );
};

export default Footer;
