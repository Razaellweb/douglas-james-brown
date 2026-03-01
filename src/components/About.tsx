import { BookMarked, GraduationCap, Award, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import authorImg from "../assets/douglas.jpg";


const About = () => {
  return (
    <section id="about" className="relative py-32 px-6 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/10 to-background" />
      
      {/* Decorative orbs */}
      <div className="absolute top-20 right-20 w-64 h-64 bg-secondary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-20 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />

      <div className="container relative z-10 mx-auto max-w-6xl">
        <div className="space-y-16 animate-fade-in">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Author Image */}
            <div className="relative group mx-auto lg:mx-0">
              <div className="absolute -inset-4 bg-gradient-gothic blur-2xl opacity-20 group-hover:opacity-40 transition-opacity duration-500" />
              <div className="relative aspect-[4/5] w-full max-w-md overflow-hidden rounded-2xl border border-primary/20 shadow-deep">
                <img 
                  src={authorImg} 
                  alt="Douglas James Brown" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-60" />
              </div>
            </div>

            <div className="text-center lg:text-left space-y-6">
              <div className="flex items-center justify-center lg:justify-start mb-8">
                <div className="h-px w-20 bg-gradient-to-r from-transparent via-primary to-transparent lg:hidden" />
                <div className="mx-6 relative">
                  <div className="absolute inset-0 bg-primary blur-lg opacity-30" />
                  <BookMarked className="relative w-6 h-6 text-primary" />
                </div>
                <div className="h-px w-20 bg-gradient-to-r from-transparent via-primary to-transparent" />
              </div>
              
              <h2 className="font-cinzel text-5xl md:text-7xl font-bold">
                About <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">the Author</span>
              </h2>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Main content */}
            <div className="space-y-8 font-cormorant text-lg md:text-xl text-foreground/90 leading-relaxed">
              <p className="text-2xl first-letter:text-7xl first-letter:font-cinzel first-letter:text-accent first-letter:float-left first-letter:mr-4 first-letter:leading-none first-letter:mt-2">
                Doug Brown is not your typical fiction writer. Early in his career, 
                he won the prestigious <span className="text-accent font-bold">Katie Lehman Award for Fiction</span> — then, 
                as he tells it, fell asleep under a tree for forty years. Now awake and writing with 
                renewed purpose, he has returned with a voice that critics call bracing, tactile, 
                and utterly distinctive.
              </p>

              {/* Amazon Author Page Link */}
              <div className="pt-4">
                <a
                  href="http://amazon.com/author/doug.brown.fiction"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button className="font-cinzel bg-gradient-gothic hover:shadow-glow transition-all duration-300 text-primary-foreground border-0 gap-2">
                    <ExternalLink className="w-4 h-4" />
                    Amazon Author Page
                  </Button>
                </a>
              </div>

              <p className="text-xl">
                Educated at <span className="text-accent font-semibold">Carnegie Mellon</span> and{" "}
                <span className="text-accent font-semibold">Penn State</span>, Brown now lives in New England, 
                where the landscape feeds his particular brand of American Gothic — fiction that reveals 
                the strangeness lurking beneath the quaint ordinary and exposes hidden fault lines in everyday lives.
              </p>

              <p className="text-xl">
                His prose — described as a blend of the whimsical and the unsettling, the absurd and the emotionally fearless — 
                has earned him the moniker of{" "}
                <span className="text-accent font-bold italic">"a Yankee Flannery O'Connor."</span>{" "}
                His stories range from detective fiction to magical realism, from slice of life to dystopian fantasy, 
                but they are always united by a heartbroken, marvelous view of the world and the people who stumble through it.
              </p>
            </div>

            {/* Sidebar highlights */}
            <div className="space-y-6">
              <div className="p-8 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 backdrop-blur-sm">
                <div className="flex items-start gap-4 mb-4">
                  <div className="p-3 rounded-full bg-primary/20">
                    <BookMarked className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-cinzel text-2xl font-bold text-foreground mb-2">New England Gothic</h3>
                    <p className="font-cormorant text-lg text-foreground/80">
                      Fiction that reveals the strangeness beneath the ordinary — lyrical, tactile, and bracing
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-8 rounded-2xl bg-gradient-to-br from-secondary/10 to-secondary/5 border border-secondary/20 backdrop-blur-sm">
                <div className="flex items-start gap-4 mb-4">
                  <div className="p-3 rounded-full bg-secondary/20">
                    <Award className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-cinzel text-2xl font-bold text-foreground mb-2">Award-Winning</h3>
                    <p className="font-cormorant text-lg text-foreground/80">
                      Winner of the Katie Lehman Award for Fiction — recognized for literary excellence
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-8 rounded-2xl bg-gradient-to-br from-accent/10 to-accent/5 border border-accent/20 backdrop-blur-sm">
                <div className="flex items-start gap-4 mb-4">
                  <div className="p-3 rounded-full bg-accent/20">
                    <GraduationCap className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-cinzel text-2xl font-bold text-foreground mb-2">Literary Craftsman</h3>
                    <p className="font-cormorant text-lg text-foreground/80">
                      Educated at Carnegie Mellon and Penn State — intellectual depth meets visceral storytelling
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Featured quote */}
          <div className="relative mt-16 max-w-4xl mx-auto">
            <div className="relative p-10 md:p-12 rounded-3xl bg-gradient-to-br from-muted/60 to-muted/30 border border-accent/30 backdrop-blur-sm overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-40 h-40 bg-primary/10 rounded-full blur-3xl" />
              
              <div className="relative">
                <div className="absolute -top-6 -left-2 text-8xl text-accent/20 font-cinzel leading-none">"</div>
                <blockquote className="font-cormorant text-2xl md:text-3xl italic text-foreground/90 text-center relative z-10 leading-relaxed">
                  The monsters in our stories are often the ones we carry inside — 
                  anxieties, compromises, appetites that distort vision and warp desire. 
                  But sometimes they live in the closet, and a good story knows the difference.
                </blockquote>
                <div className="mt-6 font-cinzel text-xl text-accent font-bold text-center">
                  — Doug Brown
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
