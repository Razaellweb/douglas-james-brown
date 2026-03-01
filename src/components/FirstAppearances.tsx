const book1Credits = [
  { title: "Cats", publication: "Half And One", url: "https://halfandone.com/cats/" },
  { title: "Dammit", publication: "BarBar", url: "https://www.bebarbar.com/blog/dammit" },
  { title: "Three Birds On A Wire", publication: "Half And One", url: "https://halfandone.com/three-birds-on-a-wire/" },
  { title: "McCutcheon Crazy", publication: "Half And One", url: "https://halfandone.com/mccutcheon-crazy/" },
  { title: "Rain Drops", publication: "Half And One", url: "https://halfandone.com/rain-drops/" },
  { title: "Ruskin's Mulch", publication: "BarBar", url: "https://www.bebarbar.com/blog/ruskins-mulch" },
];

const book2Credits = [
  { title: "GladFind", publication: "The Pink Hydra", url: "https://www.thepinkhydra.com/issues/0101202407/gladfind/" },
  { title: "Pawns", publication: "Half and One", url: "https://halfandone.com/pawns/" },
  { title: "Siobhan's Gathering", publication: "Solid Food Press Literary Journal", url: "https://www.solidfoodpress.com/post/siobhan-s-gathering" },
  { title: "Spitfire", publication: "Half and One", url: "https://halfandone.com/spitfire/" },
  { title: "Strange", publication: "Half and One", url: "https://halfandone.com/strange/" },
];

interface CreditEntry {
  title: string;
  publication: string;
  url: string;
}

const CreditList = ({ credits }: { credits: CreditEntry[] }) => (
  <ul className="space-y-4">
    {credits.map((entry) => (
      <li key={entry.title} className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-3 font-cormorant text-lg">
        <span className="text-foreground/90 font-semibold">"{entry.title}"</span>
        <span className="text-foreground/50 hidden sm:inline">—</span>
        <span className="text-foreground/70">first appeared in{" "}
          <a
            href={entry.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent hover:text-primary underline underline-offset-4 decoration-accent/40 hover:decoration-primary transition-colors duration-200 italic"
          >
            {entry.publication}
          </a>
        </span>
      </li>
    ))}
  </ul>
);

const FirstAppearances = () => {
  return (
    <section id="first-appearances" className="relative py-32 px-6 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/5 to-background" />
      <div className="absolute top-1/3 left-1/4 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-accent/5 rounded-full blur-3xl" />

      <div className="container relative z-10 mx-auto max-w-4xl">
        {/* Header */}
        <div className="text-center mb-16 space-y-4 animate-fade-in">
          <div className="flex items-center justify-center gap-3">
            <div className="h-px w-20 bg-gradient-to-r from-transparent via-primary to-transparent" />
            <div className="relative mx-4">
              <div className="absolute inset-0 bg-primary blur-lg opacity-30" />
              <span className="relative text-primary text-2xl">✦</span>
            </div>
            <div className="h-px w-20 bg-gradient-to-r from-transparent via-primary to-transparent" />
          </div>
          <h2 className="font-cinzel text-4xl md:text-6xl font-bold">
            First{" "}
            <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              Appearances
            </span>
          </h2>
          <p className="font-cormorant text-xl text-foreground/80 max-w-2xl mx-auto italic">
            Where these stories first saw the light
          </p>
        </div>

        {/* Two books */}
        <div className="space-y-12 animate-fade-in" style={{ animationDelay: "200ms" }}>
          {/* Book 1 */}
          <div className="p-8 md:p-10 rounded-2xl bg-gradient-to-br from-muted/50 to-muted/20 border border-primary/15 backdrop-blur-sm">
            <div className="mb-6 pb-4 border-b border-primary/20">
              <p className="font-cormorant text-sm text-accent font-semibold tracking-widest uppercase mb-1">
                First Collection
              </p>
              <h3 className="font-cinzel text-2xl font-bold text-foreground">My Bohemian Baptism</h3>
              <p className="font-cormorant text-base text-foreground/60 italic mt-0.5">
                © 2023 by Doug Brown
              </p>
            </div>
            <CreditList credits={book1Credits} />
          </div>

          {/* Book 2 */}
          <div className="p-8 md:p-10 rounded-2xl bg-gradient-to-br from-muted/50 to-muted/20 border border-accent/15 backdrop-blur-sm">
            <div className="mb-6 pb-4 border-b border-accent/20">
              <p className="font-cormorant text-sm text-accent font-semibold tracking-widest uppercase mb-1">
                Second Collection
              </p>
              <h3 className="font-cinzel text-2xl font-bold text-foreground">Gladfind and Other Monsters</h3>
              <p className="font-cormorant text-base text-foreground/60 italic mt-0.5">
                © 2026 by Doug Brown
              </p>
            </div>
            <CreditList credits={book2Credits} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default FirstAppearances;
