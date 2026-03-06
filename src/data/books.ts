import bohemianBaptismCover from "@/assets/bohemian-baptism-cover.png";
import gladfindCover from "@/assets/gladfind-cover.png";

export interface EditorialReview {
  quote: string;
  author: string;
  role?: string;
}

export interface Book {
  id: number;
  slug: string;
  title: string;
  subtitle: string;
  collection: string;
  author: string;
  image: string;
  description: string;
  fullDescription: string;
  category: string;
  badge: string;
  sampleChapter: string;
  pageCount: number;
  rating: number;
  reviewCount: number;
  comingSoon?: boolean;
  editorialReviews?: EditorialReview[];
  formats: {
    kindle: number;
    paperback: number;
  };
  purchaseLinks: {
    amazon: string;
  };
}

export const books: Book[] = [
  {
    id: 1,
    slug: "my-bohemian-baptism",
    title: "My Bohemian Baptism",
    subtitle: "And Then Some",
    collection: "Stories",
    author: "Doug Brown",
    image: bohemianBaptismCover,
    description:
      "A debut collection of twelve short stories whose characters are children of the twentieth century hurtling toward the twenty-first — navigating the absurd, the heartbroken, and the marvelous in equal measure.",
    fullDescription: `Doug Brown and his characters are children of the twentieth century who find themselves hurtling toward the twenty-first. In this collection of twelve short stories, Brown explores a diversity of genres including horror, sci-fi, detective fiction, dystopian fantasy, comedy, romance, slice of life, and magical realism — yet the collection subverts these genres as soon as the reader thinks they have them pegged.

The stories feature a subtle accretion of place, time, and local flavor, creating a world that feels both new and strangely familiar. Readers follow humor and pathos through a heartbroken world teeming with the necessary and the inane, the magical and the profane.

Deceptively simple, these stories deal with deep themes: the relationship of time and eternity, the reality of judgment, the personification of evil, the permanence of morals, and the compromises life forces on the living.

Winner of the Katie Lehman Award for Fiction, Brown's debut announces a distinctive voice in American short fiction — one that is at once whimsical and unsettling, absurd and emotionally devastating.`,
    category: "Short Stories • Literary Fiction",
    badge: "Katie Lehman Award",
    sampleChapter: `The house on Birch Street had been empty for eleven years, which was long enough for the neighborhood to forget what it looked like with curtains. Long enough for the maples to grow bold, sending roots under the foundation like thieves testing a lock.

Margaret noticed it first — not the roots, but the light. A thin yellow line beneath the front door, visible only if you were walking your dog at exactly 2:17 in the morning, which Margaret was, because Chaplin had developed an old man's bladder and an old man's stubbornness about where he'd relieve it.

"That's not right," she told Chaplin, who was investigating a fire hydrant with the seriousness of a coroner.

The light pulsed once. Then nothing.

Margaret stood on the sidewalk for a long time, the leash slack in her hand, the October air pressing against her face like a cold washcloth. She had lived on Birch Street for forty-three years. She had watched the Hendersons move in, watched them fight, watched them leave. She had not watched whoever was making that light.

She went home and locked the door and did not sleep.`,
    pageCount: 240,
    rating: 4.5,
    reviewCount: 12,
    editorialReviews: [
      {
        quote: "Doug Brown has accomplished all that one looks for when searching for a worthwhile story collection. The stories between the covers of My Bohemian Baptism and Then Some are teeming with unforgettable characters... In every case, their stories manage to touch a well of tenderness, and expose the fragile world of the human heart.",
        author: "Jon DiSavino",
        role: "Host, Short Story Today",
      },
      {
        quote: "Doug Brown's stories speak the Greek tragedies in a language we cannot help but understand. They turn the tools of Roman satire against the times we inhabit. In these qualities — as in his horrors and grotesqueries — he follows Flannery O'Connor, whom I had till now thought inimitable. These are works of genius.",
        author: "Mike Aquilina",
        role: "author, Rhymes' Reasons",
      },
      {
        quote: "Vivid characters and vibrant prose. Doug Brown is an engaging writer and a keen observer of people and the circumstances in which they find themselves. The stories are alternately humorous, serious, and deeply moving. The endings surprise, and even startle. Brown knows how to spin a good yarn... I highly recommend this book.",
        author: "Kenneth Garcia, PhD",
        role: "Award winning author of Pilgrim River: A Spiritual Memoir",
      },
      {
        quote: "Doug Brown's stories are weird. He sees the world through some sort of custom microscope that reveals the weirdness of normal people and situations, and conveys that revelation in bracing, inventive language. This is his first collection; I can't wait for his second.",
        author: "Jane Greer",
        role: "author, Love like a Conflagration and The World as We Know It Is Falling Away",
      },
    ],
    formats: {
      kindle: 4.99,
      paperback: 14.99,
    },
    purchaseLinks: {
      amazon:
        "https://www.amazon.com/My-Bohemian-Baptism-Then-Some-ebook/dp/B0CVFSDDP4",
    },
  },
  {
    id: 2,
    slug: "gladfind-and-other-monsters",
    title: "Gladfind and Other Monsters",
    subtitle: "A Short Story Collection",
    collection: "Stories",
    author: "Doug Brown",
    image: gladfindCover,
    description:
      "New England Gothic at its finest. Fiction that reveals the strangeness lurking beneath the quaint ordinary — exposing hidden fault lines in everyday lives through closet monsters, shapeshifters, ghosts, and the anxieties that warp desire.",
    fullDescription: `Doug Brown returns with Gladfind and Other Monsters, a second collection that proves his debut was no accident. If My Bohemian Baptism announced an important new voice, this volume confirms it.

Brown's fiction ranges from whimsical to wistful, from absurd to unsettling. He nods to Greek tragedy, winks at Roman satire, and ventures — without apology — into the grotesque. The result is something critics have begun to call "New England Gothic" — fiction that reveals the strangeness lurking beneath the quaint ordinary.

Brown has a gift for exposing the hidden fault lines in everyday lives. His monsters are not always fanged or spectral. Often they are anxieties, compromises, appetites, ideologies — forces that distort vision and warp desire. With bracing, tactile prose, he decodes the dysfunctional psychology that drives us all.

These stories are deftly paced and emotionally fearless. They will move you — to laughter, to tears, to the very edge of your seat.

Published by Serif Press. 220 pages.`,
    category: "Short Stories • Dark Humor • Magical Realism",
    badge: "New Release",
    sampleChapter: `Gladfind arrived on a Tuesday, which was the day Mrs. Pettibone did her ironing. She was pressing the collar of her husband's good shirt — the one he wore to funerals and job interviews, neither of which had occurred recently — when she heard the sound from the hall closet.

Not a knock. Not a scratch. More of a settling, the way an old house settles, except this sound had intention behind it.

"Harold," she called, though Harold was at the hardware store, buying a part for the lawn mower that would sit in its packaging on the workbench until Christmas. "Harold, there's something in the closet."

The closet door opened. Not all the way — just enough to admit a sliver of darkness that was somehow darker than the darkness inside. And from that sliver emerged a hand, gray-green and roughly the size of a dinner plate, with fingers that bent in directions fingers ought not to bend.

"Good morning," said the hand's owner, in a voice like someone gargling with gravel and honey. "I'm looking for the Gladfind. You haven't seen it, have you?"

Mrs. Pettibone set down the iron. She had survived a war, three children, and forty-one years of Harold. She was not about to be undone by a closet.

"Wipe your feet," she said.`,
    pageCount: 220,
    rating: 0,
    reviewCount: 0,
    comingSoon: false,
    editorialReviews: [
      {
        quote: "Quirky, original, and most of all — fun. Doug Brown's second collection, Gladfind and Other Monsters, features lyrical writing that is almost tactile in its intensity. Sit back, buckle up, and enjoy!",
        author: "Terry Shaw",
        role: "Author of The Way Life Should Be and Publisher of Howling Hills Publishing",
      },
      {
        quote: "Doug Brown's stories run a range — from contemplative peaks to baleful troughs, which swallow the heart and drain it dry for a spell. On the way up — back down and around — you'll run across staggered plateaus: tactile yet surreal, angelic and absurd.",
        author: "Thomas Tracy",
        role: "Author of The Kings of Cork Lane: A Baseball Memoir",
      },
      {
        quote: "While the title of Doug Brown's second collection may be hinting at horror, there's more here to make you smile than shiver. Yes, you'll find closet monsters and shapeshifters and ghosts — but they're mastered by the children and adults in these stories in ways that will surprise and delight you. With an assured hand, Doug Brown reminds us that where there's light, there will always be shadow — but there's a good chance that the shadows may also be holding some of the answers we seek.",
        author: "Jon DiSavino",
        role: "Podcast Producer and Host of Short Story Today",
      },
    ],
    formats: {
      kindle: 4.99,
      paperback: 15.99,
    },
    purchaseLinks: {
      amazon:
        "https://www.amazon.com/Gladfind-Other-Monsters-Short-Collection-ebook/dp/B0GQP39DQL",
    },
  },
];

export const getBookBySlug = (slug: string): Book | undefined => {
  return books.find((book) => book.slug === slug);
};
