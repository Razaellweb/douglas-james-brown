import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";

const Hero = () => {
  const scrollToBooks = () => {
    document.getElementById('books')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Deep dark gradient background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-secondary/20 via-background to-background" />
      
      {/* Subtle texture overlay */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
      }} />
      
      {/* Moody amber orbs */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-secondary/15 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-accent/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '4s' }} />
      </div>



      <div className="container relative z-10 px-6 py-32 mx-auto">
        <div className="max-w-5xl mx-auto text-center space-y-10 animate-fade-in">
          {/* Ornate decorative element */}
          <div className="flex items-center justify-center mb-8">
            <div className="h-px w-24 bg-gradient-to-r from-transparent via-primary to-transparent" />
            <div className="mx-6 relative">
              <div className="absolute inset-0 bg-accent blur-xl opacity-50" />
              <div className="relative w-3 h-3 bg-accent rounded-full shadow-gold" />
            </div>
            <div className="h-px w-24 bg-gradient-to-r from-transparent via-primary to-transparent" />
          </div>

          <div className="space-y-6">
            <h1 className="font-cinzel text-5xl md:text-7xl lg:text-8xl font-bold tracking-wider leading-none">
              <span className="inline-block bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-shimmer bg-[length:200%_auto]">
                DOUG BROWN
              </span>
            </h1>
            
            <div className="relative inline-block">
              <div className="absolute inset-0 bg-accent/10 blur-2xl" />
              <p className="relative font-cormorant text-2xl md:text-3xl text-foreground/90 italic font-light tracking-wide px-8">
                Where the Ordinary Meets the Grotesque
              </p>
            </div>
          </div>

          <div className="max-w-3xl mx-auto pt-6">
            <p className="font-cormorant text-xl md:text-2xl text-foreground/70 leading-relaxed">
              A Yankee Flannery O'Connor — weaving the mundane into incisive tapestries 
              that reveal the marvelous and the monstrous lurking just beneath the surface of everyday life.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 justify-center pt-12">
            <Button 
              onClick={scrollToBooks}
              size="lg"
              className="group relative font-cinzel text-lg px-10 py-7 bg-gradient-gothic hover:shadow-glow transition-all duration-500 text-primary-foreground border-0 overflow-hidden"
            >
              <span className="relative z-10">Explore the Books</span>
              <div className="absolute inset-0 bg-gradient-to-r from-accent/0 via-accent/30 to-accent/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
            </Button>
          <Button 
            onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
            size="lg"
            className="font-cinzel text-lg px-10 py-7 border-2 border-primary/40 bg-background/20 hover:bg-primary/10 hover:border-primary text-foreground transition-all duration-300 backdrop-blur-md"
          >
            About the Author
          </Button>
          </div>

          {/* Scroll indicator */}
          <div className="pt-16 animate-bounce">
            <ChevronDown className="w-10 h-10 mx-auto text-primary/50" />
          </div>
        </div>
      </div>

      {/* Dramatic bottom gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-gothic shadow-glow" />
    </section>
  );
};

export default Hero;
