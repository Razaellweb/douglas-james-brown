const LinerNotes = () => {
  return (
    <section id="liner-notes" className="relative py-32 px-6 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/10 to-background" />
      <div className="absolute top-20 right-20 w-72 h-72 bg-accent/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-20 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />

      <div className="container relative z-10 mx-auto max-w-4xl">
        {/* Header */}
        <div className="text-center mb-16 space-y-4 animate-fade-in">
          <div className="flex items-center justify-center gap-3">
            <div className="h-px w-20 bg-gradient-to-r from-transparent via-accent to-transparent" />
            <div className="relative mx-4">
              <div className="absolute inset-0 bg-accent blur-lg opacity-30" />
              <span className="relative text-accent text-2xl">✦</span>
            </div>
            <div className="h-px w-20 bg-gradient-to-r from-transparent via-accent to-transparent" />
          </div>
          <h2 className="font-cinzel text-4xl md:text-6xl font-bold">
            <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              Liner Notes
            </span>
          </h2>
          <p className="font-cormorant text-xl text-foreground/80 max-w-2xl mx-auto italic">
            For the fanaticos
          </p>
        </div>

        {/* Content */}
        <div className="relative p-10 md:p-14 rounded-3xl bg-gradient-to-br from-muted/50 to-muted/20 border border-accent/20 backdrop-blur-sm animate-fade-in space-y-7 font-cormorant text-lg md:text-xl text-foreground/90 leading-relaxed">
          <div className="absolute top-0 right-0 w-40 h-40 bg-accent/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-40 h-40 bg-primary/5 rounded-full blur-3xl" />

          <div className="relative space-y-7">
            <p>
              When word leaked that Doug Brown's second short story collection had landed on the publisher's desk, 
              the excitement was palpable in the halls of Serif Press. Knowing well the stories that had been already 
              published elsewhere, speculation was rampant as to which memorable character might grace the cover: 
              The fierce Willum Strange, the disruptive Claudzilla, or Giacco who disappeared people with a look. 
              But how do you choose among monsters, ghouls, and mobsters to represent the lot of them? And now we 
              know—Gladfind, a monster in form but not character, the one who rises from the laundry hamper to stand in the breach.
            </p>

            <p>
              The other topic fueling the whisper chain was which tell-tale tidbits—which weirdness, bizarrities, 
              and grotesquery in Doug Brown's story world—were autobiographical. The fanbase demands to know! 
              Here's a run-down of what's been fact-checked by the Doug Brown fanaticos:
            </p>

            <div className="space-y-5 pl-0 md:pl-4 border-l-2 border-accent/30">
              {[
                {
                  title: "The Ghost of Grandma Herbert",
                  text: "The old girl with tits did in fact live downstairs. Doug Brown would watch her walk from the house to her car every chance he got.",
                },
                {
                  title: "On Toppa The Heap",
                  text: "The felonious events were largely autobiographical. Doug Brown moved from Paramus, New Jersey, not Providence, Rhode Island.",
                },
                {
                  title: "Spitfire",
                  text: "The events of summer were almost word for word, but Doug Brown did not get the girl. The setting for those events was moved twenty-five miles closer to Woostuh.",
                },
                {
                  title: "Pawns",
                  text: "Doug Brown watched the moon landing sitting very close to the TV. His vision never suffered.",
                },
                {
                  title: "Sailing the Etta Lee",
                  text: "Doug Brown has been accused of many things but has admitted to none.",
                },
                {
                  title: "All My Monsters",
                  text: "The portion involving Viscount Raul Chimichanga was 100% factual except that the vampire had no name and the Austrian nanny was not named Lisel but Anna Marie. And she married a dentist from Greenwich, Connecticut who divorced his wife rather than discharge the nanny.",
                },
                {
                  title: "Siobhan's Gathering",
                  text: "This story has no autobiographical content. It was drawn entirely from deathbed anecdotes, especially those common to multiple sources.",
                },
              ].map((entry) => (
                <div key={entry.title} className="pl-4 md:pl-6">
                  <span className="font-cinzel font-bold text-accent text-base">{entry.title}</span>
                  <span className="text-foreground/80"> — {entry.text}</span>
                </div>
              ))}
            </div>

            <p>
              The rumor mill is already whirring — which characters are rife for sequel or serialization? 
              Los fanaticos, please don't bicker! There'll be time to follow all storylines!
            </p>
          </div>
        </div>

        {/* Copyright */}
        <p className="mt-10 text-center font-cormorant text-sm text-foreground/50 tracking-wide">
          © 2026 by Doug Brown
        </p>
      </div>
    </section>
  );
};

export default LinerNotes;
