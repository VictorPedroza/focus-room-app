import { Room } from "../components/room/Room";
import { MainLayout } from "../layouts/main/MainLayout";
import { RoomLayout } from "../layouts/room/RoomLayout";
import { HomePage } from "../pages";
import type { Layout } from "../types";

export const routes: Layout[] = [
  {
    path: "",
    component: MainLayout,
    children: [
      {
        path: "",
        component: Room,
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
