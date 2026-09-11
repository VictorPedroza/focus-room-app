import type { ComponentType } from "react";

export type Route = {
    path: string;
    component: ComponentType;
}

export type Layout = {
    path: string;
    component: ComponentType;
    children: Route[];
}