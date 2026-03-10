const EditorialPraise = () => {
  return (
    <section id="acclaim" className="relative py-16 md:py-24 px-6 md:px-12 overflow-hidden bg-zinc-950 text-zinc-300">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-zinc-950 to-background" />

      <div className="container relative z-10 mx-auto max-w-4xl">
        {/* Section header */}
        <div className="text-center mb-12 md:mb-16 space-y-4 animate-fade-in">
          <h2 className="font-cinzel text-4xl md:text-6xl font-bold text-foreground">
            <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">Acclaim</span>
          </h2>
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
        <div className="mt-24 md:mt-32 pt-16 border-t border-zinc-800/50">
          <div className="text-center mb-12">
            <h3 className="font-cinzel text-2xl md:text-3xl font-bold text-primary mb-2" style={{ color: '#D4AF37' }}>
              Awards & Honors
            </h3>
            <div className="h-px w-24 bg-gradient-to-r from-transparent via-primary to-transparent mx-auto opacity-50" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {[
              "Khasi Hill Shortlist",
              "Globe Soup Honorable Mention",
              "Katie Lehman"
            ].map((award, index) => (
              <div 
                key={index} 
                className="group relative flex flex-col items-center text-center p-6 rounded-xl bg-zinc-900/40 border border-zinc-800/50 hover:border-primary/30 transition-all duration-500 animate-fade-in"
                style={{ animationDelay: `${600 + (index * 100)}ms` }}
              >
                <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl" />
                <div className="mb-4 text-primary opacity-60 group-hover:opacity-100 transition-all duration-500 transform group-hover:scale-110">
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 15l-2 5 2 2 2-2-2-5z" />
                    <path d="M15.5 12a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0z" />
                    <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2z" />
                    <path d="M8 8a4 4 0 0 1 8 0" />
                  </svg>
                </div>
                <p className="font-cormorant text-xl md:text-2xl font-bold text-zinc-100 group-hover:text-primary transition-colors duration-300" style={{ color: index === 2 ? '#D4AF37' : 'inherit' }}>
                  {award}
                </p>
                {index === 2 && (
                  <span className="mt-2 font-cinzel text-xs uppercase tracking-widest text-primary/70">Winner</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default EditorialPraise;
