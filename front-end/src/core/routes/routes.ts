import type { Layout } from "@/shared/constants";

import { RoomSelector } from "@/shared/components";
import { MainLayout, RoomLayout } from "@/shared/layouts";
import { PomodoroTimer } from "@/modules/pomodoro";

export const routes: Layout[] = [
  {
    path: "",
    component: MainLayout,
    children: [
      {
        path: "",
        component: RoomSelector,
      },
      {
        path: "convite/:code",
        component: RoomSelector,
      },
    ],
  },
  {
    path: "room",
    component: RoomLayout,
    children: [
      {
        path: ":code",
        component: PomodoroTimer,
        isProtected: true
      },
    ],
  },
];
