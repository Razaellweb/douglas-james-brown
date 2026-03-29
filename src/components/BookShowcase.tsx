import { Link } from "react-router-dom";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Headphones, ExternalLink, BookOpen } from "lucide-react";
import { books } from "@/data/books";
import talesCover from "../assets/24tales.jpeg";
import halfAndOneCover from "../assets/halfandone.jpg";

interface ShowcaseItem {
  id: string;
  title: string;
  subtitle?: string;
  description: string;
  type: 'book' | 'magazine' | 'audio';
  coverUrl?: string;
  link?: string;
  externalLink?: string;
  externalLinkText?: string;
  author: string;
  copyright?: string;
  amazonLink?: string;
  serifPressLink?: string;
  comingSoon?: boolean;
}

const showcaseItems: ShowcaseItem[] = [
  {
    id: "halfandone-3",
    title: "Half and One Magazine",
    subtitle: "Vol 1, Issue 3",
    description: "Featuring the acclaimed short story \"Cats\".",
    type: "magazine",
    comingSoon: true,
    author: "© Doug Brown",
  },
  {
    id: "gladfind",
    title: "Gladfind and Other Monsters",
    subtitle: "A Short Story Collection",
    description: "A second collection proving his debut was no accident.",
    type: "book",
    coverUrl: books[1].image,
    link: "/book/gladfind-and-other-monsters",
    author: "© Doug Brown",
    copyright: "© 2026 Doug Brown",
    amazonLink: "https://www.amazon.com/Gladfind-Other-Monsters-Short-Collection-ebook/dp/B0GQP39DQL",
    serifPressLink: "https://serifpress.com/2026/03/12/gladfind-and-other-monsters-by-doug-brown/"
  },
  {
    id: "mbb",
    title: "My Bohemian Baptism and Then Some",
    description: "A stunning debut that establishes Brown as a voice of New England Gothic.",
    type: "book",
    coverUrl: books[0].image,
    link: "/book/my-bohemian-baptism",
    author: "© Doug Brown",
    copyright: "© 2023 Doug Brown",
    amazonLink: "https://www.amazon.com/My-Bohemian-Baptism-Then-Some-ebook/dp/B0CVFSDDP4",
    serifPressLink: "https://serifpress.com/2023/11/14/my-bohemian-baptism-and-then-some-by-doug-brown/"
  },
  {
    id: "24tales",
    title: "24 Tales: More Appalachian Ghost Stories, Legends & Mysteries",
    subtitle: "From Howling Hills Publishing",
    description: "",
    type: "magazine",
    coverUrl: talesCover,
    externalLink: "https://www.howlinghillspublishing.com/product/24-tales-more-appalachian-ghost-stories-legends-mysteries/12?cs=true&cst=custom",
    externalLinkText: "On Howling Hills Publishing",
    amazonLink: "https://www.amazon.com/24-Tales-Appalachian-Stories-Mysteries/dp/B0DHT4L7MM/",
    author: "© 2024 Howling Hills Publishing"
  },
  {
    id: "dan-baker",
    title: "Dan Baker Reads \"Dammit\"",
    description: "Baker, Dan. \"Dammit.\" Dan Baker, December 8, 2024. Voice credit to Dan Baker.",
    type: "audio",
    externalLink: "https://jumpshare.com/share/kPCaL0YH2c7oAfgNGKNH",
    externalLinkText: "Listen",
    author: "© Doug Brown"
  },
  {
    id: "short-story-today",
    title: "Short Story Today: Episode 83",
    description: "Brown, Doug. \"My Bohemian Baptism.\" Short Story Today, February 7, 2024. Featuring a reading of the title story.",
    type: "audio",
    externalLink: "https://shortstorytoday.com/search?s=83",
    externalLinkText: "Listen",
    author: "© 2026 Short Story Today"
  }
];

const FlipCard = ({ item }: { item: ShowcaseItem }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div 
      className="group relative h-[450px] w-full cursor-pointer"
      style={{ perspective: '1000px' }}
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <div 
        className="w-full h-full transition-all duration-700 relative"
        style={{ 
          transformStyle: 'preserve-3d', 
          WebkitTransformStyle: 'preserve-3d',
          transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)'
        }}
      >
        
        {/* Front of card */}
        <div 
          className={`absolute inset-0 rounded-xl overflow-hidden transition-all duration-500 flex flex-col items-center justify-center z-10 ${
            item.type === 'book' 
              ? "bg-primary/10 border border-primary/40 shadow-lg group-hover:shadow-primary/30 group-hover:border-primary/60" 
              : "bg-card/50 border border-border/50 shadow-lg group-hover:shadow-primary/20 group-hover:border-primary/50"
          }`}
          style={{ 
            backfaceVisibility: 'hidden', 
            WebkitBackfaceVisibility: 'hidden',
            transform: 'rotateY(0deg) translateZ(1px)' 
          }}
        >
          {item.coverUrl ? (
            <img 
              src={item.coverUrl} 
              alt={item.title} 
              className={`w-full h-full ${item.type === 'book' ? 'object-contain p-4' : 'object-cover'} group-hover:scale-105 transition-transform duration-700`} 
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 flex flex-col items-center justify-center p-8 text-center group-hover:from-primary/30 group-hover:to-secondary/30 transition-colors duration-500 rounded-xl">
              <div className="absolute inset-0 bg-gradient-gothic opacity-30 mix-blend-overlay rounded-xl" />
              <div className="relative z-10 w-24 h-24 rounded-full bg-background/50 backdrop-blur-sm border border-primary/30 flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(var(--primary),0.2)]">
                {item.type === 'audio' ? (
                  <Headphones className="w-12 h-12 text-primary" />
                ) : (
                  <BookOpen className="w-12 h-12 text-primary" />
                )}
              </div>
              <h3 className="relative z-10 font-cinzel text-2xl font-bold text-foreground max-w-[80%]">{item.title}</h3>
              {item.subtitle && (
                <p className="relative z-10 font-cormorant text-base text-foreground/70 italic mt-2 lowercase">{item.subtitle}</p>
              )}
              {item.comingSoon && (
                <div className="relative z-10 mt-6 px-4 py-1.5 rounded-full border border-primary/40 bg-primary/10 backdrop-blur-sm">
                  <span className="font-cinzel text-sm text-primary tracking-widest uppercase">Coming Soon</span>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Back of card */}
        <div 
          className={`absolute inset-0 rounded-xl border border-primary/30 shadow-xl p-8 flex flex-col justify-between overflow-hidden ${item.type === 'audio' ? 'bg-background/95' : 'bg-card'}`}
          style={{ 
            backfaceVisibility: 'hidden', 
            WebkitBackfaceVisibility: 'hidden', 
            transform: 'rotateY(180deg) translateZ(1px)' 
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent pointer-events-none" />
          
          <div className="relative z-10 space-y-4">
            <h3 className="font-cormorant text-2xl md:text-3xl font-bold text-primary leading-tight">{item.title}</h3>
            {item.subtitle && (
              <p className="font-cormorant text-lg italic text-foreground/70">{item.subtitle}</p>
            )}
            <div className="h-px w-12 bg-primary/30 my-4" />
            <p className="font-cormorant text-lg text-foreground/85 leading-relaxed">
              {item.description}
            </p>
          </div>

          <div className="relative z-10 mt-auto pt-6 space-y-3">
            {item.comingSoon ? (
              <>
                <Button disabled variant="outline" className="w-full border-primary/30 text-primary/70 font-cormorant text-lg h-12 bg-transparent opacity-80 cursor-not-allowed">
                  Coming Soon from Half and One
                </Button>
                <Button disabled variant="outline" className="w-full border-primary/30 text-primary/70 font-cormorant text-lg h-12 bg-transparent opacity-80 cursor-not-allowed">
                  Available Soon on Amazon
                </Button>
              </>
            ) : (
              <>
                {item.type === 'book' && (
                  item.serifPressLink ? (
                    <a href={item.serifPressLink} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} className="block w-full">
                      <Button className="w-full bg-primary hover:bg-accent text-primary-foreground font-cormorant text-lg h-12">
                        On Serif Press
                      </Button>
                    </a>
                  ) : (
                    <Button className="w-full bg-primary hover:bg-accent text-primary-foreground font-cormorant text-lg h-12">
                      On Serif Press
                    </Button>
                  )
                )}

                {item.amazonLink && (
                  <a href={item.amazonLink} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} className="block w-full">
                    <Button className="w-full bg-primary hover:bg-accent text-primary-foreground font-cormorant text-lg h-12">
                      On Amazon
                    </Button>
                  </a>
                )}

                {item.externalLink && (
                  <a href={item.externalLink} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} className="block w-full">
                    <Button className="w-full bg-primary hover:bg-accent text-primary-foreground font-cormorant text-lg h-12">
                      {item.externalLinkText || "Visit Link"}
                    </Button>
                  </a>
                )}

                {item.link && !item.amazonLink && !item.externalLink && (
                  <Link to={item.link} onClick={(e) => e.stopPropagation()} className="block w-full">
                    <Button className="w-full bg-primary hover:bg-accent text-primary-foreground font-cormorant text-lg h-12">
                      <BookOpen className="w-4 h-4 mr-2" />
                      View Details
                    </Button>
                  </Link>
                )}
              </>
            )}
            
            <p className="font-cormorant text-sm text-center text-muted-foreground pt-4 border-t border-border/50">
              {item.copyright || item.author}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

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
          
          <h2 className="font-cormorant text-4xl md:text-6xl font-bold text-primary">
            Bookshelf
          </h2>
          <p className="font-cormorant text-3xl md:text-4xl text-foreground/80 max-w-2xl mx-auto italic">
            Stories built on the secret you never tell.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {showcaseItems.map(item => (
            <FlipCard key={item.id} item={item} />
          ))}
        </div>

        {/* Author description */}
        {/* <div className="mt-20 text-center animate-fade-in" style={{ animationDelay: '600ms' }}>
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
        </div> */}
      </div>
    </section>
  );
};

export default BookShowcase;
