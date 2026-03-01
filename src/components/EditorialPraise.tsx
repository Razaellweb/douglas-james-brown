import { Star } from "lucide-react";
import { Card } from "@/components/ui/card";

interface Blurb {
  id: string;
  author: string;
  title: string;
  quote: string;
  source?: string;
}

const editorialBlurbs: Blurb[] = [
  {
    id: "1",
    author: "Terry Shaw",
    title: "Author & Publisher",
    quote:
      "Quirky, original, and most of all — fun. The lyrical writing is almost tactile in its intensity. Doug Brown has created something genuinely unique in the landscape of contemporary short fiction.",
  },
  {
    id: "2",
    author: "Thomas Tracy",
    title: "Author",
    quote:
      "From contemplative peaks to baleful troughs, Brown's range is extraordinary. His prose is tactile yet surreal, angelic and absurd — a writer working at the very top of his craft.",
  },
  {
    id: "3",
    author: "Jon DiSavino",
    title: "Host, Short Story Today",
    quote:
      "While the title hints at horror, these stories are more likely to make readers smile than shiver. Brown reminds us that where there's light, there will always be shadow — and that both can be beautiful.",
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
          <p className="font-cormorant text-xl text-muted-foreground max-w-2xl mx-auto italic">
            What literary voices are saying about Doug Brown's fiction
          </p>
        </div>

        {/* Blurbs grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {editorialBlurbs.map((blurb, index) => (
            <Card
              key={blurb.id}
              className="relative p-8 bg-gradient-to-br from-card via-card to-secondary/5 border-accent/15 shadow-deep group hover:shadow-glow hover:border-primary/30 transition-all duration-500 animate-fade-in"
              style={{ animationDelay: `${index * 150}ms` }}
            >


              <div className="relative z-10 space-y-6">
                <p className="font-cormorant text-lg text-foreground/90 leading-relaxed italic">
                  "{blurb.quote}"
                </p>

                <div className="flex items-center gap-4">
                  <div className="relative">
                    <div className="absolute -inset-1 bg-gradient-gothic rounded-full blur-sm opacity-40" />
                    <div className="relative w-12 h-12 rounded-full bg-gradient-gothic flex items-center justify-center">
                      <span className="font-cinzel font-bold text-lg text-primary-foreground">
                        {blurb.author.charAt(0)}
                      </span>
                    </div>
                  </div>
                  <div>
                    <p className="font-cinzel font-bold text-foreground">
                      {blurb.author}
                    </p>
                    <p className="font-cormorant text-sm text-accent">
                      {blurb.title}
                    </p>
                  </div>
                </div>
              </div>

              {/* Decorative corner */}
              <div className="absolute bottom-0 left-0 w-16 h-16 border-l-2 border-b-2 border-accent/15 rounded-bl-xl" />
            </Card>
          ))}
        </div>

        {/* Amazon link */}
        <div className="text-center mt-12 animate-fade-in" style={{ animationDelay: "500ms" }}>
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
