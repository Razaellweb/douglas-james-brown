import { ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import authorImg from "../assets/douglas.jpg";
// import doug2 from "../assets/doug/doug5.jpg";
import doug3 from "../assets/doug/doug3.jpg";
import doug2 from "../assets/doug/doug2.jpg";
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
              <h2 className="font-cormorant text-5xl md:text-6xl font-bold text-primary">
                About
              </h2>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Main content */}
            <div className="space-y-8 font-cormorant text-lg md:text-xl text-foreground/90 leading-relaxed">


              {/* Amazon and Twitter Links */}
              <div className="pt-4 flex flex-wrap gap-4 mb-8">
                <a
                  href="http://amazon.com/author/doug.brown.fiction"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button className="font-cormorant text-lg bg-primary hover:bg-accent hover:text-primary-foreground transition-all duration-300 text-primary-foreground border-0 gap-2">
                    <ExternalLink className="w-4 h-4" />
                    Amazon Author Page
                  </Button>
                </a>
                <a
                  href="https://x.com/dougbrownfables"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="outline" className="font-cormorant text-lg border-primary/50 text-foreground hover:bg-primary/10 transition-all duration-300 gap-2">
                    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 fill-current"><g><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 22.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path></g></svg>
                    Follow on X
                  </Button>
                </a>
              </div>

              <p className="text-xl leading-relaxed mb-8">
                Doug Brown is not your typical fiction writer. After writing a slew of stories and winning the prestigious <span className="text-accent font-bold">Katie Lehman Award for Fiction</span> in a previous century, he fell asleep under a tree and awoke 30 years later ready to write some more. His work has been described as "New England gothic," weaving the threads of the workaday into absurd, incisive tapestries revealing the marvelous and the grotesque. His short fiction was published in BarBar, Half and One, The Pink Hydra, and Solid Food Press. His first short story collection, <span className="italic">My Bohemian Baptism and Then Some</span>, was released by Serif Press in October, 2023. His second collection, <span className="italic">Gladfind and Other Monsters: A Short Story Collection</span> followed two years later and was released by Serif Press in February, 2026. Doug's stories earned shortlist mention for the Khasi Hills Creative Prize 2023 and Globe Soup Best Short Stories 2022. "Cats" was anthologized in <span className="italic">Half and One Magazine Issue 3</span> in March, 2026. His non-fiction ghost story, "The Stalking of Old Moses Wharton" appeared in the anthology <span className="italic">24 Tales: More Appalachian Ghost Stories, Legends & Mysteries</span>, by Howling Hills Publishing. Doug holds degrees from Carnegie Mellon and Penn State.
              </p>
              
              {/* Gallery CTA */}
              <div className="w-full mt-8 pt-4">
                <a href="/gallery">
                  <Button className="w-auto px-8 font-cormorant text-xl py-6 bg-secondary hover:bg-secondary/80 transition-all duration-300 text-primary-foreground border-0 gap-2 shadow-md">
                    More Photos <span>→</span>
                  </Button>
                </a>
              </div>
            </div>

            {/* Descending Photos Sidebar */}
            <div className="space-y-8 flex flex-col items-center lg:items-end mt-8 lg:mt-0 lg:pl-12">
              <div className="relative group w-full max-w-sm">
                <div className="absolute -inset-2 bg-gradient-gothic blur-lg opacity-20 group-hover:opacity-40 transition-opacity duration-500 rounded-xl" />
                <div className="relative overflow-hidden rounded-xl border border-primary/20 shadow-lg transform rotate-[-2deg] hover:rotate-0 hover:z-10 transition-all duration-500 aspect-square">
                  <img src={doug2} alt="Doug Brown reading" className="w-full h-full object-cover scale-105 group-hover:scale-100 transition-transform duration-700 grayscale hover:grayscale-0" />
                </div>
              </div>
              
              {/* <div className="relative group w-full max-w-[85%]">
                <div className="absolute -inset-2 bg-gradient-gothic blur-lg opacity-20 group-hover:opacity-40 transition-opacity duration-500 rounded-xl" />
                <div className="relative overflow-hidden rounded-xl border border-secondary/20 shadow-lg transform rotate-[3deg] hover:rotate-0 hover:z-10 transition-all duration-500 aspect-[4/3] mr-4 lg:-mr-8">
                  <img src={doug2} alt="Author Doug Brown" className="w-full h-full object-cover scale-105 group-hover:scale-100 transition-transform duration-700 grayscale hover:grayscale-0" />
                </div>
              </div> */}

              <div className="relative group w-full max-w-[70%] lg:mr-12">
                <div className="absolute -inset-2 bg-gradient-gothic blur-lg opacity-20 group-hover:opacity-40 transition-opacity duration-500 rounded-xl" />
                <div className="relative overflow-hidden rounded-xl border border-accent/20 shadow-lg transform rotate-[-4deg] hover:rotate-0 hover:z-10 transition-all duration-500 aspect-[3/4]">
                  <img src={doug3} alt="Doug Brown portrait" className="w-full h-full object-cover scale-105 group-hover:scale-100 transition-transform duration-700 grayscale hover:grayscale-0" />
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
