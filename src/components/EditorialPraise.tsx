const EditorialPraise = () => {
  return (
    <section id="acclaim" className="relative py-16 md:py-24 px-6 md:px-12 overflow-hidden bg-zinc-950 text-zinc-300">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-zinc-950 to-background" />

      <div className="container relative z-10 mx-auto max-w-4xl">
        {/* Section header */}
        <div className="text-center mb-12 md:mb-16 space-y-4 animate-fade-in">
          <h2 className="font-cormorant text-4xl md:text-6xl font-bold text-foreground">
            <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">Acclaim</span>
          </h2>
          <p className="font-cormorant text-xl text-zinc-400 max-w-2xl mx-auto italic">
            What people have been saying . . .
          </p>
        </div>

        {/* Blurbs container */}
        <div className="flex flex-col gap-12 md:gap-20 mx-auto">
          {/* Review 1 */}
          <div className="animate-fade-in space-y-3 md:space-y-4">
            <p className="font-cormorant text-xl md:text-[1.65rem] leading-[1.4] text-justify text-zinc-100/90 tracking-wide">
              <span className="text-primary font-bold text-2xl md:text-[2.2rem] pr-2 tracking-normal" style={{ color: '#D4AF37' }}>
                Doug Brown's stories are weird.
              </span> 
              He sees the world through some sort of custom microscope that reveals the weirdness of normal people and situations, and conveys that revelation in bracing, inventive language. This is his first collection; I can't wait for his second.
            </p>
            <div className="text-right font-cormorant text-lg md:text-[1.35rem] leading-snug text-zinc-300/90 tracking-wide pt-2">
              —Jane Greer, author, <span className="italic">Love like a Conflagration</span><br />
              and <span className="italic">The World as We Know It Is Falling Away</span>
            </div>
          </div>

          {/* Review 2 */}
          <div className="animate-fade-in space-y-3 md:space-y-4" style={{ animationDelay: "100ms" }}>
            <p className="font-cormorant text-xl md:text-[1.65rem] leading-[1.4] text-justify text-zinc-100/90 tracking-wide">
              <span className="text-primary font-bold text-2xl md:text-[2.2rem] pr-2 tracking-normal" style={{ color: '#D4AF37' }}>
                Vivid characters and vibrant prose.
              </span> 
              Doug Brown is an engaging writer and a keen observer of people and the circumstances in which they find themselves: whether the encounters of missionaries, donning white shirts and black ties, in an unfriendly neighborhood; a young boy who spends a summer with his quirky and aging hippie aunt and uncle; a tale about the discovery of grisly murders and their perpetrators; and a hilarious—but portentous—interaction between an ordinary, middle-aged citizen and a census agent of the all-seeing and intrusive Nanny State. The stories are alternately humorous, serious, and deeply moving. The endings surprise, and even startle. Brown knows how to spin a good yarn... I highly recommend this book.
            </p>
            <div className="text-right font-cormorant text-lg md:text-[1.35rem] leading-snug text-zinc-300/90 tracking-wide pt-2">
              —Kenneth Garcia, PhD<br />
              Award winning author of<br />
              <span className="italic">Pilgrim River: A Spiritual Memoir</span>
            </div>
          </div>

          {/* Review 3 */}
          <div className="animate-fade-in space-y-3 md:space-y-4" style={{ animationDelay: "200ms" }}>
            <div className="font-cormorant text-xl md:text-[1.65rem] leading-[1.4] text-justify text-zinc-100/90 tracking-wide">
              Doug Brown's stories speak the Greek tragedies in a language we cannot help but understand. They turn the tools of Roman satire against the times we inhabit. In these qualities—as in his horrors and grotesqueries—he follows Flannery O'Connor, whom I had till now thought inimitable.
              <div className="text-primary font-bold text-2xl md:text-[2.2rem] mt-3 tracking-normal" style={{ color: '#D4AF37' }}>
                These are works of genius.
              </div>
            </div>
            <div className="text-right font-cormorant text-lg md:text-[1.35rem] leading-snug text-zinc-300/90 tracking-wide pt-2">
              —Mike Aquilina, author, <span className="italic">Rhymes' Reason</span>
            </div>
          </div>

          {/* Review 4 */}
          <div className="animate-fade-in space-y-3 md:space-y-4" style={{ animationDelay: "300ms" }}>
            <p className="font-cormorant text-xl md:text-[1.65rem] leading-[1.4] text-justify text-zinc-100/90 tracking-wide">
              <span className="text-primary font-bold text-2xl md:text-[2.2rem] pr-2 tracking-normal" style={{ color: '#D4AF37' }}>
                Quirky, original, and most of all—fun.
              </span> 
              Doug Brown's second collection, <span className="italic">GladFind and Other Monsters</span>, features lyrical writing that is almost tactile in its intensity. <span className="font-bold text-primary" style={{ color: '#D4AF37' }}>Sit back, buckle up, and enjoy!</span>
            </p>
            <div className="text-right font-cormorant text-lg md:text-[1.35rem] leading-snug text-zinc-300/90 tracking-wide pt-2">
              —Terry Shaw, author, <span className="italic">The Way Life Should Be</span>; and publisher, Howling Hills Publishing
            </div>
          </div>

          {/* Review 5 */}
          <div className="animate-fade-in space-y-3 md:space-y-4" style={{ animationDelay: "400ms" }}>
            <p className="font-cormorant text-xl md:text-[1.65rem] leading-[1.4] text-justify text-zinc-100/90 tracking-wide">
              <span className="text-primary font-bold text-2xl md:text-[2.2rem] pr-2 tracking-normal" style={{ color: '#D4AF37' }}>
                Doug Brown's stories
              </span> 
              run a range—from contemplative peaks to baleful troughs, which <span className="font-bold text-primary" style={{ color: '#D4AF37' }}>swallow the heart and drain it dry for a spell.</span> On the way up—back down and around—you'll run across staggered plateaus: <span className="font-bold text-primary" style={{ color: '#D4AF37' }}>tactile yet surreal, angelic and absurd.</span>
            </p>
            <div className="text-right font-cormorant text-lg md:text-[1.35rem] leading-snug text-zinc-300/90 tracking-wide pt-2">
              —Thomas Tracy, author, <span className="italic">The Kings of Cork Lane: A Baseball Memoir</span>
            </div>
          </div>

          {/* Review 6 */}
          <div className="animate-fade-in space-y-3 md:space-y-4" style={{ animationDelay: "500ms" }}>
            <p className="font-cormorant text-xl md:text-[1.65rem] leading-[1.4] text-justify text-zinc-100/90 tracking-wide">
              While the title of Doug Brown's second collection may be hinting at horror, there's more here to make you smile than shiver. Yes, you'll find <span className="font-bold text-primary" style={{ color: '#D4AF37' }}>closet monsters and shapeshifters and ghosts</span>—but they're mastered by the children and adults in these stories in ways that <span className="font-bold text-primary" style={{ color: '#D4AF37' }}>will surprise and delight you.</span> With an assured hand, Doug Brown reminds us that <span className="font-bold text-primary" style={{ color: '#D4AF37' }}>where there's light, there will always be shadow</span>—but there's a good chance that <span className="font-bold text-primary" style={{ color: '#D4AF37' }}>the shadows may also be holding some of the answers we seek.</span>
            </p>
            <div className="text-right font-cormorant text-lg md:text-[1.35rem] leading-snug text-zinc-300/90 tracking-wide pt-2">
              —Jon DiSavino, podcast producer and host, <span className="italic">Short Story Today</span>
            </div>
          </div>
        </div>

        {/* Amazon link */}
        {/* <div className="text-center mt-16 md:mt-20 animate-fade-in" style={{ animationDelay: "600ms" }}>
          <a
            href="http://amazon.com/author/doug.brown.fiction"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-cormorant text-lg md:text-xl text-primary/80 hover:text-primary transition-colors duration-300"
          >
            Read more on Amazon
            <span className="text-lg">→</span>
          </a>
        </div> */}
        
        {/* Awards & Honors Section */}
        <div className="mt-16 md:mt-20">
          <div className="flex flex-col items-center gap-6 md:gap-8 animate-fade-in" style={{ animationDelay: '600ms' }}>
            {[
              "2023 Khasi Hills Creative Prize for Fiction, Shortlist -- \"Cats\"",
              "2022 GLOBE SOUP Short Story Competition, Honorable Mention -- \"Wendy Wafers Tart and Tangy\"",
              "1984 Katie Lehman Award for Fiction, First Place -- \"Simple Brain Fever\"",
            ].map((award, index) => (
              <div
                key={index}
                className="w-full text-center animate-fade-in"
                style={{ animationDelay: `${600 + index * 100}ms` }}
              >
                <p className="font-cormorant text-xl md:text-[1.65rem] leading-relaxed text-zinc-200 tracking-wide">
                  {award}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default EditorialPraise;
