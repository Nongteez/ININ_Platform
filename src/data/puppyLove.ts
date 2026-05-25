import bgHero from "@/assets/Image//PuppyLove/BG_PUPPYNOLOGO2.png";
import sceneBg from "@/assets/m2.jpg";
import introVideo from "@/assets/Image/PuppyLove/VDO/Intro.mp4";
import stairVideo from "@/assets/Image/PuppyLove/VDO/2_Stair.mp4";
import canteenVideo from "@/assets/Image/PuppyLove/VDO/3_CateenAsk.mp4";
import endingVideo from "@/assets/Image/PuppyLove/VDO/Ending.mp4";
import ambientSound from "@/assets/Image/PuppyLove/Sound/Sound1.mp3";
import girl1 from "@/assets/Image/Contact/Person1.jpg";
import girl2 from "@/assets/Image/Contact/Person2.jpg";
import girl3 from "@/assets/Image/Contact/Person3.jpg";
import girl4 from "@/assets/Image/Contact/Person4.jpg";

export type GamePhase =
  | "intro"
  | "stair_route"
  | "canteen_route"
  | "bad_ending"
  | "game_over";

export const puppyLoveAssets = {
  background: bgHero,
  scene: sceneBg,
  introVideo,
  stairVideo,
  canteenVideo,
  endingVideo,
  ambientSound,
  characters: [
    { name: "Cream", image: girl1, rotate: -6 },
    { name: "Fai", image: girl2, rotate: 4 },
    { name: "Bam", image: girl3, rotate: -3 },
    { name: "Jinny", image: girl4, rotate: 7 },
  ],
};

export const puppyLoveMeta = {
  title: "Puppy Love",
  subtitle: "Every choice changes your relationship.",
  description:
    "A story-driven interactive romance game where you build relationships with four girls and shape your own ending.",
  tags: ["Romance", "Interactive", "Visual Novel", "Multiple Endings", "Choice Driven Story", "Replayable Routes"],
};

export const openingCharacterName = "Cream";

export const openingSubtitle = "เราจะไปกินข้าวที่เรียนรวม 2 ไปด้วยกันป่ะ?";

export const openingChoices = [
  { id: "gentle", label: "ไปด้วยก็ได้" },
  { id: "direct", label: "ไม่ไปอะ" },
] as const;

export const stairSubtitle = "คนตกบันได เข้าไปช่วยไหม?";

export const stairChoices = [
  { id: "help", label: "เข้าไปช่วย" },
  { id: "no_help", label: "ไม่เข้าไปช่วย" },
] as const;

export const canteenSubtitle = "ไปซื้อข้าวร้านโปรดด้วยกัน";

export const canteenChoices = [
  { id: "accept", label: "ไปซื้อด้วยกัน" },
  { id: "decline", label: "ปฏิเสธไม่ไปซื้อด้วยกัน" },
] as const;

export const videoByPhase: Record<Exclude<GamePhase, "game_over">, string> = {
  intro: introVideo,
  stair_route: stairVideo,
  canteen_route: canteenVideo,
  bad_ending: endingVideo,
};

export type DialogueChoice = { id: string; label: string };

export function getDialogueForPhase(phase: GamePhase): {
  characterName: string;
  subtitle: string;
  choices: readonly DialogueChoice[];
} | null {
  if (phase === "intro") {
    return {
      characterName: openingCharacterName,
      subtitle: openingSubtitle,
      choices: openingChoices,
    };
  }
  if (phase === "stair_route") {
    return {
      characterName: openingCharacterName,
      subtitle: stairSubtitle,
      choices: stairChoices,
    };
  }
  if (phase === "canteen_route") {
    return {
      characterName: openingCharacterName,
      subtitle: canteenSubtitle,
      choices: canteenChoices,
    };
  }
  return null;
}
