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
          <h2 className="font-cormorant text-4xl md:text-6xl font-bold text-primary">
            Fandom
          </h2>
          <p className="font-cormorant text-3xl md:text-4xl text-foreground/90 max-w-2xl mx-auto italic">
            For the fanaticos...
          </p>
        </div>

        {/* Content - Gladfind */}
        <div className="relative p-4 sm:p-6 md:p-14 rounded-3xl bg-gradient-to-br from-muted/50 to-muted/20 border border-accent/20 backdrop-blur-sm animate-fade-in space-y-7 font-cormorant text-lg md:text-xl text-foreground/90 leading-relaxed mb-12">
          <div className="absolute top-0 right-0 w-40 h-40 bg-accent/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-40 h-40 bg-primary/5 rounded-full blur-3xl" />

          <div className="relative space-y-7">
            <h3 className="font-cormorant text-3xl font-bold text-foreground border-b border-accent/20 pb-4">
              Gladfind and Other Monsters
            </h3>
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
                  <span className="text-accent font-bold text-xl">{entry.title}</span>
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

        {/* Content - My Bohemian Baptism */}
        <div className="relative p-4 sm:p-6 md:p-14 rounded-3xl bg-gradient-to-br from-muted/50 to-muted/20 border border-primary/20 backdrop-blur-sm animate-fade-in space-y-7 font-cormorant text-lg md:text-xl text-foreground/90 leading-relaxed mb-12">
          <div className="absolute top-0 right-0 w-40 h-40 bg-primary/5 rounded-full blur-3xl" />
          
          <div className="relative space-y-7">
            <h3 className="font-cormorant text-3xl font-bold text-foreground border-b border-primary/20 pb-4">
              My Bohemian Baptism
            </h3>
            <p>
              At first there were rumors and rumblings. There was talk that Doug Brown was on the move, 
              writing again, but not pencil-to-legal-pad as he had once done. Not pen-to-paper, not typewriter, 
              not even proprietary word processor with amber-lit CRT screen. But actual twenty-first century 
              technology – man burdened with machine, fiction-writing cyborg. No cheap open-AI bastardization 
              of humanity, but the soul-stretching spectacle of man struggling to create art despite computer, 
              searching directories for files just saved, losing entire files at random to MS Word, and hours 
              spent parsing "PC LOAD LETTER."
            </p>

            <p>
              As the stories began to leak out, an ardent group of fanatics coalesced around the theme of 
              verifying the fan-facts of the author – sifting bio from brand-speak. The bio-veracity corpse 
              are agreed on certain facts.
            </p>

            <div className="space-y-5 pl-0 md:pl-4 border-l-2 border-primary/30">
              {[
                {
                  title: "Census",
                  text: "Doug Brown has no comment.",
                },
                {
                  title: "Cats",
                  text: "In third grade, Brown's teacher would read to the class after recess to calm the kids down. His verified friend Mark would sneak all the way to the back of the room without anyone noticing.",
                },
                {
                  title: "My Bohemian Baptism",
                  text: "Yes, we all had that friend in school with the \"cool\" parents who just figured we were going to drink and do drugs anyway, so we might as well make the most of it. Said mother taught English in Doug Brown's high school. He had her in eleventh grade and she liked to run her fingers through his hair in the middle of class. It is believed that she liked to make him blush. She never did anything else out of line on school property.",
                },
                {
                  title: "Dammit",
                  text: "A typical New England small town in the 70's. The Mormons and Jehovah's Witnesses would always come through at least once every summer.",
                },
                {
                  title: "De Rien",
                  text: "While working in New York on the Upper East Side Doug Brown was known to try to get out of the office for lunch at least once a week.",
                },
                {
                  title: "Three Birds on a Wire",
                  text: "Nothing autobiographical, thank goodness. But all the names come from infamous murders: 1959 Clutter family massacre, the song Mac the Knife, etc.",
                },
                {
                  title: "Wendy Wafers Tart and Tangy",
                  text: "The mansion is obviously modeled on the Castle in the Clouds, Moultonborough, New Hampshire.",
                },
                {
                  title: "Ruskin's Mulch",
                  text: "When Doug Brown lived in Rhode Island, he was known to enjoy driving along Ocean Drive and out to the Beavertail Light in Narragansett Bay. From there it is a simple step to conclude he imagined what secrets the shrubs, fences, and walls hid for the sake of the people in the beautiful estates along the water. The Cheeseman is based on a real character, but we are all legally bound to say the portrayal of him is fictitious.",
                },
                {
                  title: "The Grey Man",
                  text: "Doug Brown has certainly seen many strange things in the thin places along the Pemigewasset River, but nothing that didn't belong there.",
                },
                {
                  title: "Not Convenient",
                  text: "People familiar with Weirs Beach in Laconia, New Hamshire may remember the businesses around the stone bridge on Endicott Street. 'Nough said.",
                },
                {
                  title: "Phhhrt!",
                  text: "This is fairly representative of the many board meetings Doug Brown attended as a senior marketing executive. Fanaticos can neither confirm nor deny that products such as TimePlex were discussed. And if they were in fact discussed, Doug Brown would certainly be prevented from sharing any portion of those discussions by virtue of extant non-disclosure agreements.",
                },
                {
                  title: "McCutcheon Crazy",
                  text: "This situation is largely autobiographical, though significant elements of the story were fictionalized (as is much of Doug Brown's unauthorized autobiography).",
                },
              ].map((entry) => (
                <div key={entry.title} className="pl-4 md:pl-6">
                  <span className="text-primary font-bold text-xl">{entry.title}</span>
                  <span className="text-foreground/90"> — {entry.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <p className="mt-10 text-center font-cormorant text-base text-foreground/80 tracking-wide font-medium">
          © 2026 by Doug Brown
        </p>
      </div>
    </section>
  );
};

export default LinerNotes;
