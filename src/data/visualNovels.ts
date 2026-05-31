import cover1 from "@/assets/Image/Visual_Novel/cover_1.png";
import cover2 from "@/assets/Image/Visual_Novel/cover_2.png";
import cover3 from "@/assets/Image/Visual_Novel/cover_3.png";
import cover4 from "@/assets/Image/Visual_Novel/cover_4.png";
import cover5 from "@/assets/Image/Visual_Novel/cover_5.png";
import cover6 from "@/assets/Image/Visual_Novel/cover_6.png";
import cover7 from "@/assets/Image/Visual_Novel/cover_7.png";
import cover8 from "@/assets/Image/Visual_Novel/cover_8.png";
import cover9 from "@/assets/Image/Visual_Novel/cover_9.png";
import cover10 from "@/assets/Image/Visual_Novel/cover_10.png";
import cover11 from "@/assets/Image/Visual_Novel/cover_11.png";
import cover12 from "@/assets/Image/Visual_Novel/cover_12.png";

export interface VisualNovel {
  id: string;
  title: string;
  description: string;       // Synopsis
  cover: string;
  genres: string[];
  tags: string[];            // Search tags
  views: number;
  likes: number;
  endings: number;
  chapters: number;
  featured?: boolean;
  original?: boolean;
  match?: number;           // match percentage (e.g. 98)
  recentProgress?: number;  // continue reading progress (e.g. 65)
  lastUpdated: string;      // date string for sorting (e.g. '2026-05-29')
}

export const visualNovels: VisualNovel[] = [
  {
    id: "vn-1",
    title: "Under Cherry Blossom Skies",
    description: "A heartwarming school romance of two high schoolers who cross paths under the cascading cherry blossom trees. As hidden rumors start to surface and graduation draws closer, will they find the courage to express their true feelings?",
    cover: cover1,
    genres: ["Romance", "Drama", "School Life"],
    tags: ["confession", "highschool", "heartwarming", "slice of life"],
    views: 142000,
    likes: 95400,
    endings: 5,
    chapters: 15,
    featured: true,
    original: true,
    match: 98,
    recentProgress: 65,
    lastUpdated: "2026-05-30"
  },
  {
    id: "vn-2",
    title: "Rainy Streetlights",
    description: "In a rain-slicked metropolis, two young men find comfort in a shared umbrella. As their careers clash and deep family secrets threaten to pull them apart, their bond is tested under the city streetlights.",
    cover: cover2,
    genres: ["Boy Love", "Romance", "Drama"],
    tags: ["bl", "urban", "slowburn", "forbidden love"],
    views: 118000,
    likes: 82100,
    endings: 4,
    chapters: 12,
    original: true,
    match: 96,
    recentProgress: 30,
    lastUpdated: "2026-05-28"
  },
  {
    id: "vn-3",
    title: "Asylum of Whispers",
    description: "Sent to investigate a abandoned state psychiatric facility, a junior detective is trapped in the dark corridors. Armed with only a vintage lantern, she must solve chilling puzzles before the shadows consume her.",
    cover: cover3,
    genres: ["Horror", "Mystery", "Thriller"],
    tags: ["ghosts", "asylum", "survival", "psychological horror"],
    views: 135000,
    likes: 89400,
    endings: 6,
    chapters: 10,
    original: true,
    match: 95,
    recentProgress: 80,
    lastUpdated: "2026-05-29"
  },
  {
    id: "vn-4",
    title: "Skies of Aethelgard",
    description: "A young dragon rider uncovers a lost elemental rune sword on the floating islands of Aethelgard. Embark on a skyward quest to defend the empire from an ancient void legion threatening the heavens.",
    cover: cover4,
    genres: ["Fantasy", "Fantasy Adventure", "Thriller"],
    tags: ["dragons", "sword", "skyworld", "magic"],
    views: 165000,
    likes: 110500,
    endings: 5,
    chapters: 16,
    original: false,
    match: 94,
    recentProgress: 45,
    lastUpdated: "2026-05-25"
  },
  {
    id: "vn-5",
    title: "Neon Cipher",
    description: "In a dark cyberpunk neon underworld, a hacker detective is contracted to decrypt a high-level cybernetic payload. Standard rules do not apply when the target is an AI god holding your sister's consciousness hostage.",
    cover: cover5,
    genres: ["Thriller", "Mystery", "Thriller Investigation"],
    tags: ["hacker", "cyberpunk", "revolver", "future"],
    views: 122000,
    likes: 79000,
    endings: 5,
    chapters: 14,
    original: true,
    match: 97,
    recentProgress: 15,
    lastUpdated: "2026-05-29"
  },
  {
    id: "vn-6",
    title: "Melodies of Youth",
    description: "A nostalgic drama following a high school band practicing in the music room under golden classroom sunsets. Can they overcome personal creative slumps and stage fright to play their dream final concert?",
    cover: cover6,
    genres: ["Drama", "School Life", "Comedy"],
    tags: ["music", "band", "guitar", "nostalgic", "friendship"],
    views: 94000,
    likes: 58200,
    endings: 4,
    chapters: 11,
    original: false,
    match: 91,
    recentProgress: 92,
    lastUpdated: "2026-05-30"
  },
  {
    id: "vn-7",
    title: "Fractured Reflection",
    description: "A psychological thriller about a brilliant medical student who starts seeing double in a cracked mirror. Each mirror shard whispers dark secrets about his friends' dark pasts. What is real and what is the reflection's lie?",
    cover: cover7,
    genres: ["Mystery", "Thriller", "Psychological Mystery"],
    tags: ["mirror", "psychological", "schism", "dark"],
    views: 105000,
    likes: 67100,
    endings: 6,
    chapters: 13,
    original: true,
    match: 93,
    recentProgress: 0,
    lastUpdated: "2026-05-27"
  },
  {
    id: "vn-8",
    title: "Modern Sorceress",
    description: "In the rain-drenched neon streets of modern Seoul, an urban wizard channels ancient runic magic to combat rogue shadow creatures. A high-stakes, fast-paced action story that bridges two worlds.",
    cover: cover8,
    genres: ["Fantasy", "Fantasy Adventure", "Urban Fantasy"],
    tags: ["sorcery", "seoul", "sigils", "urban wizard"],
    views: 89000,
    likes: 59300,
    endings: 4,
    chapters: 12,
    original: false,
    match: 90,
    recentProgress: 0,
    lastUpdated: "2026-05-22"
  },
  {
    id: "vn-9",
    title: "Masquerade of Blood",
    description: "Step into Victorian London's gothic masquerade halls where ancient vampire houses pull the strings of the empire. As a mortal noble, you find yourself cornered by a dangerous and seductive vampire lord.",
    cover: cover9,
    genres: ["Romance", "Horror", "Supernatural Romance"],
    tags: ["vampires", "gothic", "victorian", "masquerade", "noble"],
    views: 154000,
    likes: 104200,
    endings: 5,
    chapters: 14,
    original: true,
    match: 96,
    recentProgress: 0,
    lastUpdated: "2026-05-31"
  },
  {
    id: "vn-10",
    title: "Hourglass Chronicles",
    description: "A supernatural high school drama about a girl surrounded by golden floating hourglasses and gears. Every midnight, she can reverse the day by precisely 24 hours, but at the cost of being forgotten by the boy she loves.",
    cover: cover10,
    genres: ["Drama", "School Life", "Time Travel Drama"],
    tags: ["time loop", "hourglass", "golden", "emotional"],
    views: 87000,
    likes: 56500,
    endings: 3,
    chapters: 10,
    original: false,
    match: 89,
    recentProgress: 0,
    lastUpdated: "2026-05-18"
  },
  {
    id: "vn-11",
    title: "Abyssal Throne",
    description: "A dark high-fantasy saga following a dark wizard summoning terrifying skeletal titans to overthrow a corrupt celestial theocracy. Forge a bloody path to the ancient dark throne in this epic dark fantasy masterpiece.",
    cover: cover11,
    genres: ["Fantasy", "Horror", "Dark Fantasy"],
    tags: ["necromancy", "skeletons", "titan", "gothic", "throne"],
    views: 131000,
    likes: 88400,
    endings: 4,
    chapters: 15,
    original: true,
    match: 95,
    recentProgress: 0,
    lastUpdated: "2026-05-29"
  },
  {
    id: "vn-12",
    title: "Warm Coffee Hearts",
    description: "A cozy and soothing slice-of-life romance following a boy and girl who run a small bookstore cafe in a rainy mountain town. Share coffee mugs, write stories on a shared laptop, and discover slow, sweet comfort.",
    cover: cover12,
    genres: ["Romance", "Comedy", "Slice of Life Romance"],
    tags: ["cafe", "cozy", "rainy day", "bookstore", "sweet"],
    views: 79000,
    likes: 51200,
    endings: 3,
    chapters: 8,
    original: true,
    match: 92,
    recentProgress: 0,
    lastUpdated: "2026-05-24"
  }
];
