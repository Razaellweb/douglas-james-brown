const allCredits = [
  { title: "Cats", publication: "Half And One", url: "https://halfandone.com/cats/", year: "2023" },
  { title: "Dammit", publication: "BarBar", url: "https://www.bebarbar.com/blog/dammit", year: "2023" },
  { title: "Three Birds On A Wire", publication: "Half And One", url: "https://halfandone.com/three-birds-on-a-wire/", year: "2023" },
  { title: "McCutcheon Crazy", publication: "Half And One", url: "https://halfandone.com/mccutcheon-crazy/", year: "2023" },
  { title: "Rain Drops", publication: "Half And One", url: "https://halfandone.com/rain-drops/", year: "2023" },
  { title: "Ruskin's Mulch", publication: "BarBar", url: "https://www.bebarbar.com/blog/ruskins-mulch", year: "2023" },
  { title: "Stalking Old Moses Wharton", publication: "24 Tales: More Appalachian Ghost Stories, Legends & Mysteries", publisher: "Howling Hills Publishing", url: "https://www.howlinghillspublishing.com/product/24-tales-more-appalachian-ghost-stories-legends-mysteries/12", date: "6/17/2024" },
  { title: "GladFind", publication: "The Pink Hydra", url: "https://www.thepinkhydra.com/issues/0101202407/gladfind/", date: "1/1/2024" },
  { title: "Pawns", publication: "Half and One", url: "https://halfandone.com/pawns/", year: "2025" },
  { title: "Siobhan's Gathering", publication: "Solid Food Press Literary Journal", url: "https://www.solidfoodpress.com/post/siobhan-s-gathering", year: "2025" },
  { title: "Spitfire", publication: "Half and One", url: "https://halfandone.com/spitfire/", year: "2025" },
  { title: "Strange", publication: "Half and One", url: "https://halfandone.com/strange/", year: "2025" },
];

interface CreditEntry {
  title: string;
  publication: string;
  publisher?: string;
  url: string;
  date?: string;
  year?: string;
}

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
            Chronological publication credits
          </p>
        </div>

        <div className="animate-fade-in p-8 md:p-12 rounded-3xl bg-gradient-to-br from-muted/40 to-muted/10 border border-primary/20 backdrop-blur-sm" style={{ animationDelay: "200ms" }}>
          <ul className="space-y-6">
            {allCredits.map((entry, idx) => (
              <li key={idx} className="font-cormorant text-lg md:text-xl text-foreground/90 leading-relaxed pl-4 border-l-2 border-primary/40 hover:border-accent transition-colors">
                <span className="italic">"{entry.title}"</span>
                <span className="mx-2 text-foreground/80">—</span>
                <a
                  href={entry.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline underline-offset-4 decoration-muted-foreground/30 hover:decoration-primary transition-colors text-foreground"
                >
                  <span className="underline">{entry.publication}</span>
                </a>
                {entry.publisher && <span>, {entry.publisher}</span>}
                <span className="text-foreground/70">, {entry.date || entry.year}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default FirstAppearances;
