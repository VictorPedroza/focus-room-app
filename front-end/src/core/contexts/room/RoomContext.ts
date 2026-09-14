import { createContext, useContext } from "react";
import type { RoomState } from "../../../shared/constants/room";

interface RoomContextProps {
    joinRoom({ id, userName }: {
        id: string;
        userName: string;
    }): void;

    createRoom({ id, title, userName }: {
        id: string;
        title: string;
        userName: string;
    }): void;

    getRoom(id: string): void;

    room: RoomState | undefined;
}

export const RoomContext = createContext<RoomContextProps | undefined>(undefined);

export const useRoom = () => {
    const context = useContext(RoomContext);

    if (!context) {
        throw new Error("useRoom must be used within a RoomProvider");
    }

    return context;
};