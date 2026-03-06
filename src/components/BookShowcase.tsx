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
        <div className="text-center mb-16 space-y-4 animate-fade-in">
          <div className="flex items-center justify-center gap-3">
            <div className="h-px w-20 bg-gradient-to-r from-transparent via-primary to-transparent" />
            <div className="relative mx-4">
              <div className="absolute inset-0 bg-primary blur-lg opacity-30" />
              <Sparkles className="relative w-6 h-6 text-primary" />
            </div>
            <div className="h-px w-20 bg-gradient-to-r from-transparent via-primary to-transparent" />
          </div>
          
          <h2 className="font-cormorant text-4xl md:text-6xl font-bold text-primary">
            Bookshelf
          </h2>
          <p className="font-cormorant text-xl text-foreground/80 max-w-2xl mx-auto italic">
            Stories that expose the strangeness beneath the quaint ordinary
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Gladfind */}
          <Link to="/book/gladfind-and-other-monsters" className="group">
          <Card className="group flex flex-col relative overflow-hidden border-border/50 bg-card/50 backdrop-blur-sm hover:border-primary/50 transition-all duration-700 hover:-translate-y-2 cursor-pointer h-full">
            <div className="relative aspect-[2/3] overflow-hidden bg-muted/20">
              <img src={books[1].image} alt="Gladfind" className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-700" />
            </div>
            <div className="p-6 flex flex-col flex-1">
              <h3 className="font-cormorant text-2xl font-bold text-foreground mb-4">Gladfind and Other Monsters</h3>
              <p className="font-cormorant text-base text-foreground/80 leading-relaxed mb-6 flex-1">
                A second collection proving his debut was no accident. Brown's fiction ranges from whimsical to wistful, from absurd to unsettling.
              </p>
              <div className="mt-auto pt-4 border-t border-border/50">
                <p className="font-cormorant text-sm text-muted-foreground">© Doug Brown</p>
              </div>
            </div>
          </Card>
          </Link>

          {/* MBB */}
          <Link to="/book/my-bohemian-baptism" className="group">
          <Card className="group flex flex-col relative overflow-hidden border-border/50 bg-card/50 backdrop-blur-sm hover:border-primary/50 transition-all duration-700 hover:-translate-y-2 cursor-pointer h-full">
            <div className="relative aspect-[2/3] overflow-hidden bg-muted/20">
              <img src={books[0].image} alt="My Bohemian Baptism" className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-700" />
            </div>
            <div className="p-6 flex flex-col flex-1">
              <h3 className="font-cormorant text-2xl font-bold text-foreground mb-4">My Bohemian Baptism and Then Some</h3>
              <p className="font-cormorant text-base text-foreground/80 leading-relaxed mb-6 flex-1">
                Winner of the Katie Lehman Award. A stunning debut that establishes Brown as a voice of New England Gothic.
              </p>
              <div className="mt-auto pt-4 border-t border-border/50">
                <p className="font-cormorant text-sm text-muted-foreground">© Doug Brown</p>
              </div>
            </div>
          </Card>
          </Link>

          {/* Half And One Magazine */}
          <Card className="group flex flex-col relative overflow-hidden border-border/50 bg-card/50 backdrop-blur-sm hover:border-primary/50 transition-all duration-700 hover:-translate-y-2">
            <div className="relative aspect-[2/3] overflow-hidden bg-muted/20">
              <img src={halfAndOneCover} alt="Half And One" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
            </div>
            <div className="p-6 flex flex-col flex-1">
              <h3 className="font-cormorant text-2xl font-bold text-foreground mb-4">Half And One Magazine</h3>
              <p className="font-cormorant text-base text-foreground/80 leading-relaxed mb-6 flex-1">
                Vol 1, Issue 3. Featuring the acclaimed short story "Cats".
              </p>
              <div className="mt-auto space-y-4">
                <a href="https://halfandone.com/wp-content/uploads/2025/10/Half-And-One-Magazine-Vol1-Iss3.pdf" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 font-cormorant text-primary hover:text-accent transition-colors font-semibold">
                  Read Issue PDF <ExternalLink className="w-4 h-4" />
                </a>
                <div className="pt-4 border-t border-border/50">
                  <p className="font-cormorant text-sm text-muted-foreground">© Doug Brown</p>
                </div>
              </div>
            </div>
          </Card>

          {/* 24 Tales */}
          <Card className="group flex flex-col relative overflow-hidden border-border/50 bg-card/50 backdrop-blur-sm hover:border-primary/50 transition-all duration-700 hover:-translate-y-2">
            <div className="relative aspect-[2/3] overflow-hidden bg-muted/20">
              <img src={talesCover} alt="24 Tales" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
            </div>
            <div className="p-6 flex flex-col flex-1">
              <h3 className="font-cormorant text-2xl font-bold text-foreground mb-4">24 Tales: More Appalachian Ghost Stories</h3>
              <p className="font-cormorant text-base text-foreground/80 leading-relaxed mb-6 flex-1">
                Featuring the non-fiction ghost story "The Stalking of Old Moses Wharton". Published by Howling Hills.
              </p>
              <div className="mt-auto space-y-4">
                <a href="https://www.howlinghillspublishing.com/product/24-tales-more-appalachian-ghost-stories-legends-mysteries/12?cs=true&cst=custom" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 font-cormorant text-primary hover:text-accent transition-colors font-semibold">
                  View on Howling Hills <ExternalLink className="w-4 h-4" />
                </a>
                <div className="pt-4 border-t border-border/50">
                  <p className="font-cormorant text-sm text-muted-foreground">© Doug Brown</p>
                </div>
              </div>
            </div>
          </Card>

          {/* Dan Baker Audio */}
          <Card className="group flex flex-col relative overflow-hidden border-border/50 bg-card/50 backdrop-blur-sm hover:border-primary/50 transition-all duration-700 hover:-translate-y-2 p-6">
            <div className="flex items-start gap-4 mb-4">
              <div className="p-3 bg-primary/10 rounded-full">
                <Headphones className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-cormorant text-xl font-bold text-foreground">Dan Baker Reads "Dammit"</h3>
              </div>
            </div>
            <p className="font-cormorant text-base text-foreground/80 leading-relaxed mb-6 flex-1">
              Baker, Dan. "Dammit." Dan Baker, December 8, 2024. Voice credit to Dan Baker.
            </p>
            <div className="mt-auto space-y-4">
              <a href="https://jumpshare.com/share/kPCaL0YH2c7oAfgNGKNH" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 font-cormorant text-primary hover:text-accent transition-colors font-semibold">
                Listen to Recording <ExternalLink className="w-4 h-4" />
              </a>
              <div className="pt-4 border-t border-border/50">
                <p className="font-cormorant text-sm text-muted-foreground">© Doug Brown</p>
              </div>
            </div>
          </Card>

          {/* Short Story Today Audio */}
          <Card className="group flex flex-col relative overflow-hidden border-border/50 bg-card/50 backdrop-blur-sm hover:border-primary/50 transition-all duration-700 hover:-translate-y-2 p-6">
            <div className="flex items-start gap-4 mb-4">
              <div className="p-3 bg-primary/10 rounded-full">
                <Headphones className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-cormorant text-xl font-bold text-foreground">Short Story Today: Episode 83</h3>
              </div>
            </div>
            <p className="font-cormorant text-base text-foreground/80 leading-relaxed mb-6 flex-1">
              Brown, Doug. "My Bohemian Baptism." Short Story Today, February 7, 2024. Featuring a reading of the title story.
            </p>
            <div className="mt-auto space-y-4">
              <a href="https://shortstorytoday.com/search?s=83" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 font-cormorant text-primary hover:text-accent transition-colors font-semibold">
                Listen to Episode <ExternalLink className="w-4 h-4" />
              </a>
              <div className="pt-4 border-t border-border/50">
                <p className="font-cormorant text-sm text-muted-foreground">© Doug Brown</p>
              </div>
            </div>
          </Card>
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
