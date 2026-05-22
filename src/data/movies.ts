import m1 from "@/assets/m1.jpg";
import m2 from "@/assets/m2.jpg";
import m3 from "@/assets/m3.jpg";
import m4 from "@/assets/m4.jpg";
import m5 from "@/assets/m5.jpg";
import m6 from "@/assets/m6.jpg";
import m7 from "@/assets/m7.jpg";
import m8 from "@/assets/m8.jpg";
import type { Movie } from "@/components/MovieRow";

const allMovies: Movie[] = [
  {
    title: "Puppy Love",
    img: m1,
    year: 2026,
    match: 97,
    duration: "2h 14m",
    category: "Romantic",
    description:
      "In a rain-soaked cyberpunk metropolis, a rogue detective uncovers a conspiracy that connects the city's neon underworld to an AI god threatening to rewrite reality itself.",
  },
  {
    title: "Rain Zone",
    img: m2,
    year: 2025,
    match: 94,
    duration: "2h 30m",
    category: "Romantic",
    description:
      "When an alien armada surrounds Earth's last space station, a crew of misfits must pilot an ancient warship on a desperate mission to save humanity from extinction.",
  },
  {
    title: "Wan Yam",
    img: m3,
    year: 2026,
    match: 91,
    duration: "1h 58m",
    category: "Horror",
    description:
      "The last dragonrider must forge an alliance with a forgotten kingdom to prevent a dark sorcerer from unleashing an army of the dead upon the world.",
  },
  {
    title: "Startup Partner",
    img: m4,
    year: 2025,
    match: 88,
    duration: "1h 45m",
    category: "Romance",
    description:
      "Two strangers meet on a rain-soaked evening beneath the Eiffel Tower, beginning a whirlwind romance that will change the course of their lives forever.",
  },
  {
    title: "Sea You",
    img: m5,
    year: 2026,
    match: 95,
    duration: "2h 05m",
    category: "BoyLove",
    description:
      "A retired special forces operative is pulled back into action when a global terror network threatens to detonate a weapon capable of leveling entire cities.",
  },
  {
    title: "99 Rules",
    img: m6,
    year: 2025,
    match: 90,
    duration: "1h 52m",
    category: "Horror",
    description:
      "Deep within an ancient forest, a young herbalist discovers she possesses the power to communicate with mystical creatures and must protect them from an industrial empire.",
  },
  {
    title: "The Esan Love",
    img: m7,
    year: 2026,
    match: 96,
    duration: "1h 36m",
    category: "BoyLove",
    description:
      "A masterless samurai wanders feudal Japan, seeking redemption for a betrayal that destroyed his clan, while hunted by the very empire he once served.",
  },
  {
    title: "The Last Hope",
    img: m8,
    year: 2025,
    match: 93,
    duration: "2h 22m",
    category: "Thriller",
    description:
      "In the underbelly of a corrupt city, an undercover agent must infiltrate a crime syndicate while battling the ghosts of a past that refuses to stay buried.",
  },
];

// Row data generation with different shuffles
const shuffle = (arr: Movie[], offset: number): Movie[] => [
  ...arr.slice(offset),
  ...arr.slice(0, offset),
];

// Top 10 with ranking badges
const top10Movies: Movie[] = allMovies.map((m, i) => ({
  ...m,
  rank: i + 1,
}));

// Continue watching with progress
const continueWatching: Movie[] = [
  { ...allMovies[0], progress: 65 },
  { ...allMovies[4], progress: 30 },
  { ...allMovies[2], progress: 80 },
  { ...allMovies[7], progress: 45 },
  { ...allMovies[5], progress: 15 },
  { ...allMovies[1], progress: 92 },
];

export const rows: {
  title: string;
  movies: Movie[];
  variant?: "default" | "top10" | "continue";
}[] = [
    { title: "Continue Watching", movies: continueWatching, variant: "continue" },
    { title: "Trending Now", movies: allMovies },
    { title: "Top 10 on ININ", movies: top10Movies, variant: "top10" },
    { title: "Romantic Collection", movies: allMovies.filter((m) => m.category === "Romantic") },
    { title: "Popular on ININ", movies: shuffle(allMovies, 3) },
    { title: "Boy Love", movies: allMovies.filter((m) => m.category === "BoyLove" || m.category === "Thriller") },
    { title: "Recommended For You", movies: shuffle(allMovies, 5) },
    { title: "Horror", movies: allMovies.filter((m) => m.category === "Horror") },
  ];
