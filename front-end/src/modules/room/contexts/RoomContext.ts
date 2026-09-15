import { createContext, useContext } from "react";

import type { CreateRoomProps, JoinRoomProps, Room } from "../types/room.types";

interface RoomContext {
    room: Room | undefined;
    createRoom: (data: CreateRoomProps) => void;
    joinRoom: (data: JoinRoomProps) => void;
}

export const RoomContext = createContext<RoomContext | undefined>(undefined);

export const useRoom = () => {
  const context = useContext(RoomContext);

  if (!context) {
    throw new Error("useRoom must be used within a RoomProvider");
  }
  return context;
};