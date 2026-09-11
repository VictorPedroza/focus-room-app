import { Room } from "../components/room/Room";
import { MainLayout } from "../layouts/main/MainLayout";
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
];
