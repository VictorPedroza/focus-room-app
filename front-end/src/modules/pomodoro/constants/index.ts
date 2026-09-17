export type Mode = "work" | "shortBreak" | "longBreak";

export const POMODORO_MODES: { label: string; value: Mode }[] = [
  { label: "Foco", value: "work" },
  { label: "Pausa Curta", value: "shortBreak" },
  { label: "Pausa Longa", value: "longBreak" },
];

export const getModeMinutes = (mode: Mode, workDuration: number): number => {
  switch (mode) {
    case "work":
      return workDuration;
    case "shortBreak":
      return 5;
    case "longBreak":
      return 15;
    default:
      return workDuration;
  }
};

export const formatTime = (totalSeconds: number): string => {
  const minutes = String(Math.floor(totalSeconds / 60)).padStart(2, "0");
  const seconds = String(totalSeconds % 60).padStart(2, "0");
  return `${minutes}:${seconds}`;
};
