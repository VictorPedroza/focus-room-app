import type { Layout } from "@/shared/constants";

import { HomePage } from "@/pages";
import { RoomSelector } from "@/shared/components";
import { MainLayout, RoomLayout } from "@/shared/layouts";

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
        component: HomePage,
        isProtected: true
      },
    ],
  },
];
