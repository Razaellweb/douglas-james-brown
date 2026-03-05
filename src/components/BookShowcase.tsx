import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sparkles, Award, Headphones, BookOpen, ExternalLink } from "lucide-react";
import { books } from "@/data/books";
import talesCover from "../assets/24tales.jpeg";
import halfAndOneCover from "../assets/halfandone.jpg";

const BookShowcase = () => {
  return (
    <section id="bookstore" className="relative py-32 px-6 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-secondary/10 via-background to-background" />
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23ffffff' fill-opacity='1' fill-rule='evenodd'/%3E%3C/svg%3E")`
      }} />

      <div className="container relative z-10 mx-auto max-w-7xl">
        <div className="text-center mb-20 space-y-6 animate-fade-in">
          {/* Ornate header decoration */}
          <div className="flex items-center justify-center mb-8">
            <div className="h-px w-20 bg-gradient-to-r from-transparent via-accent to-transparent" />
            <div className="mx-6 relative">
              <div className="absolute inset-0 bg-accent blur-lg opacity-50" />
              <Sparkles className="relative w-6 h-6 text-accent" />
            </div>
            <div className="h-px w-20 bg-gradient-to-r from-transparent via-accent to-transparent" />
          </div>
          
          <h2 className="font-cinzel text-5xl md:text-7xl font-bold">
            <span className="bg-gradient-to-r from-accent via-primary to-accent bg-clip-text text-transparent">
              The Collections
            </span>
          </h2>
          <p className="font-cormorant text-2xl md:text-3xl text-muted-foreground italic max-w-3xl mx-auto leading-relaxed">
            Stories that expose the strangeness beneath the quaint ordinary — where every page turns shadow into light
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl mx-auto">
          {books.map((book, index) => (
            <Card 
              key={book.id}
              className="group relative overflow-hidden border-border/50 bg-card/50 backdrop-blur-sm hover:border-primary/50 transition-all duration-700 hover:shadow-deep hover:-translate-y-2 animate-fade-in"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              {/* Badge — floats above the card, not the cover */}
              {book.badge === "New Release" ? (
                <div className="absolute -top-3 -right-3 z-30">
                  <div className="relative">
                    <div className="absolute inset-0 bg-accent blur-md opacity-60 rounded-lg" />
                    <div className="relative bg-accent text-primary-foreground font-cinzel text-xs font-bold px-3 py-1.5 rounded-lg shadow-gold border border-accent/50 tracking-widest uppercase">
                      ✦ New Release ✦
                    </div>
                  </div>
                </div>
              ) : (
                <div className="absolute top-4 left-4 z-20 flex items-center gap-1.5 bg-primary/90 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-deep">
                  <Award className="w-3.5 h-3.5 text-primary-foreground" />
                  <span className="font-cinzel text-xs font-bold text-primary-foreground">
                    {book.badge}
                  </span>
                </div>
              )}

              <div className="relative aspect-[2/3] overflow-hidden bg-muted/20">
                <img 
                  src={book.image} 
                  alt={`${book.title} book cover`}
                  className="w-full h-full object-contain p-4 transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-60" />
                
                {/* Hover overlay (disabled for now) */}
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
                  <Button disabled className="w-full bg-gradient-gothic text-primary-foreground border-0 font-cinzel opacity-60 cursor-not-allowed">
                    Coming Soon
                  </Button>
                </div>
              </div>

              <div className="p-6 space-y-4">
                <div className="space-y-2">
                  <p className="font-cormorant text-sm text-accent font-semibold tracking-wider uppercase">
                    {book.collection}
                  </p>
                  <h3 className="font-cinzel text-xl md:text-2xl font-bold text-foreground group-hover:bg-gradient-gothic group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
                    {book.title}
                  </h3>
                  <p className="font-cormorant text-lg italic text-muted-foreground">
                    {book.subtitle}
                  </p>
                </div>

                <p className="font-cormorant text-sm text-foreground/80 leading-relaxed line-clamp-3">
                  {book.description}
                </p>

                <div className="pt-4 flex items-center justify-between border-t border-border/30">
                  <span className="text-sm font-cormorant text-muted-foreground">
                    {book.category}
                  </span>
                  <span 
                    className="font-cinzel text-sm text-muted-foreground/90 font-semibold flex items-center gap-1 cursor-default"
                  >
                    Explore <span className="text-xs">→</span>
                  </span>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Anthologies */}
        <div className="mt-32 max-w-5xl mx-auto animate-fade-in" style={{ animationDelay: '300ms' }}>
          <div className="flex items-center gap-4 mb-10">
            <h3 className="font-cinzel text-3xl font-bold text-foreground">Anthology Contributions</h3>
            <div className="h-px flex-1 bg-gradient-to-r from-border to-transparent" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="flex flex-col sm:flex-row p-6 bg-card/40 border-border/50 backdrop-blur-sm hover:border-primary/40 transition-colors">
              <div className="w-full sm:w-1/3 shrink-0 mb-6 sm:mb-0 sm:mr-6">
                <div className="relative aspect-[3/4] overflow-hidden rounded-md bg-muted/20 border border-border/50 shadow-sm">
                  <img 
                    src={talesCover} 
                    alt="24 Tales Anthology Cover"
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                  />
                </div>
              </div>
              <div className="flex-1 flex flex-col space-y-3 justify-center">
                <div className="inline-flex max-w-fit items-center gap-1.5 px-2.5 py-1 rounded-md bg-muted text-muted-foreground text-xs font-cinzel font-bold uppercase tracking-wider mb-2">
                  <BookOpen className="w-3 h-3" /> Anthology
                </div>
                <h4 className="font-cinzel text-xl font-bold">24 Tales: More Appalachian Ghost Stories, Legends & Mysteries</h4>
                <p className="font-cormorant text-foreground/80">
                  Featuring the story <span className="italic">"The Stalking of Old Moses Wharton"</span>
                </p>
                <div className="pt-4 mt-auto">
                  <a href="https://www.howlinghillspublishing.com/product/24-tales-more-appalachian-ghost-stories-legends-mysteries/12?cs=true&cst=custom" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 font-cormorant text-primary hover:text-accent transition-colors font-semibold">
                    View on Howling Hills <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </Card>

            <Card className="flex flex-col sm:flex-row p-6 bg-card/40 border-border/50 backdrop-blur-sm hover:border-accent/40 transition-colors">
              <div className="w-full sm:w-1/3 shrink-0 mb-6 sm:mb-0 sm:mr-6">
                <div className="relative aspect-[3/4] overflow-hidden rounded-md bg-muted/20 border border-border/50 shadow-sm">
                  <img 
                    src={halfAndOneCover} 
                    alt="Half And One Magazine Cover"
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                  />
                </div>
              </div>
              <div className="flex-1 flex flex-col space-y-3 justify-center">
                <div className="inline-flex max-w-fit items-center gap-1.5 px-2.5 py-1 rounded-md bg-muted text-muted-foreground text-xs font-cinzel font-bold uppercase tracking-wider mb-2">
                  <BookOpen className="w-3 h-3" /> Literary Magazine
                </div>
                <h4 className="font-cinzel text-xl font-bold">Half And One Magazine</h4>
                <p className="font-cormorant text-foreground/80">
                  Vol 1, Issue 3
                </p>
                <div className="pt-4 mt-auto">
                  <a href="https://halfandone.com/wp-content/uploads/2025/10/Half-And-One-Magazine-Vol1-Iss3.pdf" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 font-cormorant text-primary hover:text-accent transition-colors font-semibold">
                    Read Issue PDF <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Audio Recordings */}
        <div className="mt-24 max-w-5xl mx-auto animate-fade-in" style={{ animationDelay: '450ms' }}>
          <div className="flex items-center gap-4 mb-10">
            <h3 className="font-cinzel text-3xl font-bold text-foreground">Audio Recordings</h3>
            <div className="h-px flex-1 bg-gradient-to-r from-border to-transparent" />
          </div>

          <div className="space-y-6">
            <Card className="p-6 bg-gradient-to-r from-muted/30 to-transparent border-l-4 border-l-primary/60 border-y-0 border-r-0 rounded-r-xl rounded-l-none">
              <div className="flex items-start gap-4">
                <div className="mt-1 p-2 bg-primary/10 rounded-full">
                  <Headphones className="w-5 h-5 text-primary" />
                </div>
                <div className="space-y-2 font-cormorant text-lg">
                  <p className="text-foreground/90 leading-relaxed">
                    Brown, Doug. "My Bohemian Baptism." <span className="italic">Short Story Today</span>, February 7, 2024, Podcast audio, 
                    <a href="https://shortstorytoday.com/search?s=83" target="_blank" rel="noopener noreferrer" className="mx-1 text-accent hover:underline">https://shortstorytoday.com/search?s=83</a>.
                  </p>
                  <p className="text-sm text-foreground/80 font-sans">
                    Episode 83 — featuring a reading of the title story from the debut collection.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-gradient-to-r from-muted/30 to-transparent border-l-4 border-l-accent/60 border-y-0 border-r-0 rounded-r-xl rounded-l-none">
              <div className="flex items-start gap-4">
                <div className="mt-1 p-2 bg-accent/10 rounded-full">
                  <Headphones className="w-5 h-5 text-accent" />
                </div>
                <div className="space-y-2 font-cormorant text-lg">
                  <p className="text-foreground/90 leading-relaxed">
                    Baker, Dan. "Dammit." Dan Baker, December 8, 2024. Audio recording, 
                    <a href="https://jumpshare.com/share/kPCaL0YH2c7oAfgNGKNH" target="_blank" rel="noopener noreferrer" className="mx-1 text-primary hover:underline">https://jumpshare.com/share/kPCaL0YH2c7oAfgNGKNH</a>.
                  </p>
                  <p className="text-sm text-foreground/80 font-sans">
                    Voice credit to Dan Baker.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Author description */}
        <div className="mt-20 text-center animate-fade-in" style={{ animationDelay: '600ms' }}>
          <div className="relative inline-block px-12 py-6 rounded-2xl bg-gradient-to-br from-muted/40 to-muted/20 border border-accent/20 backdrop-blur-sm">
            <div className="absolute inset-0 bg-gradient-to-r from-accent/5 via-transparent to-secondary/5 rounded-2xl" />
            <div className="relative space-y-2">
              <p className="font-cinzel text-xl md:text-2xl font-bold text-accent">
                New England Gothic Fiction
              </p>
              <p className="font-cormorant text-lg md:text-xl text-foreground/90 max-w-3xl">
                From contemplative peaks to baleful troughs — bracing, tactile prose that weaves 
                the workaday world into something marvelous, grotesque, and unmistakably alive.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookShowcase;
