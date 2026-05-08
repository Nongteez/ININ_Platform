import m1 from "@/assets/m1.jpg";
import m2 from "@/assets/m2.jpg";
import m3 from "@/assets/m3.jpg";
import m4 from "@/assets/m4.jpg";
import m5 from "@/assets/m5.jpg";
import m6 from "@/assets/m6.jpg";
import m7 from "@/assets/m7.jpg";
import m8 from "@/assets/m8.jpg";
import type { Movie } from "@/components/MovieRow";

const pool: Movie[] = [
  { title: "เมืองฝนสีนีออน", img: m1, year: 2024, match: 96, duration: "2 ชม. 14 น." },
  { title: "สงครามดาราจักร", img: m2, year: 2023, match: 92, duration: "2 ชม. 30 น." },
  { title: "อาณาจักรมังกร", img: m3, year: 2025, match: 89, duration: "1 ชม. 58 น." },
  { title: "รักใต้แสงปารีส", img: m4, year: 2022, match: 85, duration: "1 ชม. 45 น." },
  { title: "ระเบิดเดือด", img: m5, year: 2024, match: 91, duration: "2 ชม. 05 น." },
  { title: "ป่าต้องคำสาป", img: m6, year: 2023, match: 88, duration: "1 ชม. 52 น." },
  { title: "ผจญภัยพันหมื่นลี้", img: m7, year: 2024, match: 94, duration: "1 ชม. 36 น." },
  { title: "ตระกูลมาเฟีย", img: m8, year: 2022, match: 90, duration: "2 ชม. 22 น." },
];

const shuffle = (offset: number) => [...pool.slice(offset), ...pool.slice(0, offset)];

export const rows = [
  { title: "กำลังเป็นกระแสตอนนี้", movies: pool },
  { title: "สำหรับคุณโดยเฉพาะ", movies: shuffle(3) },
  { title: "ออริจินัลของ NEXFLIX", movies: shuffle(5) },
  { title: "หนังแอ็คชั่นมันส์ ๆ", movies: shuffle(2) },
  { title: "ดูต่อจากที่ค้างไว้", movies: shuffle(6) },
];
