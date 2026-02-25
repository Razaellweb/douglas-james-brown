import bohemianBaptismCover from "@/assets/bohemian-baptism-cover.png";
import gladfindCover from "@/assets/gladfind-cover.png";

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
    fullDescription: `A debut collection of twelve short stories whose characters are children of the twentieth century hurtling toward the twenty-first. Doug Brown writes with the unsettling clarity of a Yankee Flannery O'Connor, weaving the mundane into incisive tapestries that reveal the marvelous and the grotesque lurking just beneath the surface of everyday life.

These stories range across genre — from detective fiction to magical realism, from slice of life to dystopian fantasy — but are united by Brown's bracing, tactile prose and his fearless exploration of the spaces where the ordinary tips into the strange.

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
    fullDescription: `Doug Brown's second collection confirms his ascent as one of the most original voices in contemporary American fiction. Gladfind and Other Monsters is New England Gothic at its finest — fiction that reveals the strangeness lurking beneath the quaint ordinary, exposing hidden fault lines in everyday lives.

The "monsters" in these stories are often internal forces: anxieties, compromises, appetites, and ideologies that distort vision and warp desire. But they also take more literal forms — closet monsters mastered by children, shapeshifters navigating suburban cul-de-sacs, ghosts who refuse to honor the boundaries between the living and the dead.

Brown's prose ranges from the whimsical and wistful to the absurd, unsettling, and even grotesque, nodding to Greek tragedy and Roman satire while remaining firmly rooted in the soil of New England. The result is fiction that is lyrical yet bracing, tactile yet surreal, angelic and absurd.

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
    formats: {
      kindle: 4.99,
      paperback: 15.99,
    },
    purchaseLinks: {
      amazon:
        "https://www.amazon.com/Gladfind-Other-Monsters-Short-Collection/dp/B0GPQNRY25",
    },
  },
];

export const getBookBySlug = (slug: string): Book | undefined => {
  return books.find((book) => book.slug === slug);
};
