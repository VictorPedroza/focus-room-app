import type { Layout } from "../../shared/constants";
import { MainLayout, RoomLayout } from "../../shared/layouts";
import { RoomSelector } from "../../shared/components";
import { HomePage } from "../../pages";

export const routes: Layout[] = [
  {
    path: "",
    component: MainLayout,
    children: [
      {
        path: "",
        component: RoomSelector,
      },
    ],
  },
  {
    path: "room",
    component: RoomLayout,
    children: [
      {
        path: "",
        component: HomePage,
      },
    ],
  },
];
