/** 「特徴・こだわり」の絞り込み条件。検索パネルと一覧の両方で使う */
import type { TrainerSummary } from "@/lib/view";

export const CONDITIONS = [
  { key: "private", label: "マンツーマンで受けられる", test: (s: TrainerSummary) => s.formats.includes("マンツーマン") },
  { key: "room", label: "完全個室", test: (s: TrainerSummary) => s.features.includes("完全個室") },
  { key: "female", label: "女性のトレーナー", test: (s: TrainerSummary) => s.gender === "女性" },
  { key: "calm", label: "おだやかに見守る", test: (s: TrainerSummary) => s.tone === "おだやかに見守る" },
  { key: "logic", label: "理屈から知りたい", test: (s: TrainerSummary) => s.tone === "理屈からていねいに" },
  { key: "food", label: "食事も一緒に考える", test: (s: TrainerSummary) => s.nutrition === "記録を見て助言する" || s.nutrition === "食事も一緒に組み立てる" },
  { key: "online", label: "オンラインで受けられる", test: (s: TrainerSummary) => s.formats.includes("オンライン") },
  { key: "weekend", label: "土日に通える", test: (s: TrainerSummary) => s.weekend },
  { key: "evening", label: "20時以降も通える", test: (s: TrainerSummary) => s.evening },
  { key: "morning", label: "朝7時までに始められる", test: (s: TrainerSummary) => s.morning },
] as const;
