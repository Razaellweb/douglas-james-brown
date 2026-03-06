import { Star } from "lucide-react";
import { Card } from "@/components/ui/card";

interface Blurb {
  id: string;
  author: string;
  title: React.ReactNode;
  quote: React.ReactNode;
  source?: string;
}

const editorialBlurbs: Blurb[] = [
  // --- Gladfind and Other Monsters (Feb 2026) ---
  {
    id: "gladfind-1",
    author: "Jon DiSavino",
    title: "Host, Short Story Today",
    quote: (
      <>
        <span className="text-secondary font-bold">While the title hints at horror,</span> these stories are more likely to make readers smile than shiver. Brown reminds us that where there's light, there will always be shadow — and that both can be beautiful.
      </>
    ),
  },
  {
    id: "gladfind-2",
    author: "Terry Shaw",
    title: "Author & Publisher",
    quote: (
      <>
        <span className="text-secondary font-bold">Quirky, original, and most of all — fun.</span> The lyrical writing is almost tactile in its intensity. Doug Brown has created something genuinely unique in the landscape of contemporary short fiction.
      </>
    ),
  },
  {
    id: "gladfind-3",
    author: "Thomas Tracy",
    title: "Author",
    quote: (
      <>
        From contemplative peaks to baleful troughs, Brown's range is extraordinary. <span className="text-secondary font-bold">His prose is tactile yet surreal, angelic and absurd — a writer working at the very top of his craft.</span>
      </>
    ),
  },

  // --- My Bohemian Baptism (Oct 2023) ---
  {
    id: "mbb-3",
    author: "Jane Greer",
    title: <span className="italic">author, Love like a Conflagration and The World as We Know It Is Falling Away</span>,
    quote: (
      <>
        <span className="text-secondary text-2xl md:text-3xl font-bold">Doug Brown's stories are weird.</span> He sees the world through some sort of custom microscope that reveals the weirdness of normal people and situations, and conveys that revelation in bracing, inventive language. This is his first collection; I can't wait for his second.
      </>
    ),
  },
  {
    id: "mbb-2",
    author: "Kenneth Garcia, PhD",
    title: <>Award winning author of <span className="italic">Pilgrim River: A Spiritual Memoir</span></>,
    quote: (
      <>
        <span className="text-secondary text-2xl md:text-3xl font-bold">Vivid characters and vibrant prose.</span> Doug Brown is an engaging writer and a keen observer of people and the circumstances in which they find themselves: whether the encounters of missionaries, donning white shirts and black ties, in an unfriendly neighborhood; a young boy who spends a summer with his quirky and aging hippie aunt and uncle; a tale about the discovery of grisly murders and their perpetrators; and a hilarious—but portentous—interaction between an ordinary, middle-aged citizen and a census agent of the all-seeing and intrusive Nanny State. The stories are alternately humorous, serious, and deeply moving. The endings surprise, and even startle. Brown knows how to spin a good yarn... I highly recommend this book.
      </>
    ),
  },
  {
    id: "mbb-1",
    author: "Mike Aquilina",
    title: <>author, <span className="italic">Rhymes' Reasons</span></>,
    quote: (
      <>
        Doug Brown's stories speak the Greek tragedies in a language we cannot help but understand. They turn the tools of Roman satire against the times we inhabit. In these qualities—as in his horrors and grotesqueries—he follows Flannery O'Connor, whom I had till now thought inimitable.<br/>
        <span className="text-secondary text-2xl md:text-3xl font-bold mt-2 inline-block">These are works of genius.</span>
      </>
    ),
  },
];

const EditorialPraise = () => {
  return (
    <section id="acclaim" className="relative py-24 px-6 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card/30 to-background" />
      <div className="absolute inset-0">
        <div className="absolute top-1/3 left-1/4 w-[350px] h-[350px] bg-primary/5 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/3 w-[300px] h-[300px] bg-accent/5 rounded-full blur-3xl animate-float" style={{ animationDelay: "3s" }} />
      </div>

      <div className="container relative z-10 mx-auto max-w-6xl">
        {/* Section header */}
        <div className="text-center mb-16 space-y-4 animate-fade-in">
          <div className="flex items-center justify-center gap-3">
            <div className="h-px w-16 bg-gradient-to-r from-transparent via-primary to-transparent" />
            <Star className="w-6 h-6 text-accent" />
            <div className="h-px w-16 bg-gradient-to-r from-transparent via-primary to-transparent" />
          </div>
          <h2 className="font-cinzel text-4xl md:text-6xl font-bold text-foreground">
            <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">Acclaim</span>
          </h2>
          <p className="font-cormorant text-2xl text-foreground/90 max-w-2xl mx-auto italic font-medium">
            What people are saying...
          </p>
        </div>

        {/* Blurbs grid */}
        <div className="flex flex-col gap-12 max-w-4xl mx-auto">
          {editorialBlurbs.map((blurb, index) => (
            <div
              key={blurb.id}
              className="relative px-2 md:px-6 animate-fade-in"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className="relative z-10 space-y-6">
                <p className="font-cormorant text-xl text-foreground/90 leading-relaxed max-w-3xl">
                  {blurb.quote}
                </p>

                <div className="flex justify-end pr-0 md:pr-4">
                  <div className="text-right">
                    <p className="font-cormorant text-lg text-foreground">
                      {blurb.author}, {blurb.title}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Awards */}
        <div className="mt-24 max-w-4xl mx-auto animate-fade-in" style={{ animationDelay: "450ms" }}>
          <div className="flex items-center gap-4 mb-10">
            <h3 className="font-cinzel text-3xl font-bold text-foreground">Awards & Honors</h3>
            <div className="h-px flex-1 bg-gradient-to-r from-border to-transparent" />
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            <Card className="p-6 bg-card/40 border-border/50 backdrop-blur-sm group hover:border-primary/40 transition-colors flex items-start gap-4">
              <div className="mt-1">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Star className="w-5 h-5 text-primary group-hover:fill-primary/20 transition-all" />
                </div>
              </div>
              <div>
                <p className="font-cormorant text-lg text-foreground/90 mb-1">
                  2023, <span className="italic">"Cats"</span>
                </p>
                <p className="font-cinzel text-accent font-bold">
                  Half and One Khasi Hills Award for Fiction Shortlist
                </p>
              </div>
            </Card>

            <Card className="p-6 bg-card/40 border-border/50 backdrop-blur-sm group hover:border-primary/40 transition-colors flex items-start gap-4">
              <div className="mt-1">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Star className="w-5 h-5 text-primary group-hover:fill-primary/20 transition-all" />
                </div>
              </div>
              <div>
                <p className="font-cormorant text-lg text-foreground/90 mb-1">
                  1984
                </p>
                <p className="font-cinzel text-accent font-bold">
                  Katie Lehman Award for Overall Excellence
                </p>
              </div>
            </Card>
          </div>
        </div>

        {/* Amazon link */}
        <div className="text-center mt-16 animate-fade-in" style={{ animationDelay: "500ms" }}>
          <a
            href="http://amazon.com/author/doug.brown.fiction"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-cormorant text-lg text-muted-foreground hover:text-primary transition-colors duration-300"
          >
            Read more on Amazon
            <span className="text-sm">→</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default EditorialPraise;
