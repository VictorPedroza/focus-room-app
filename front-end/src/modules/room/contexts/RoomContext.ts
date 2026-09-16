import { createContext, useContext } from "react";

import type  {
  Room,
  CreateRoomProps,
  JoinRoomProps,
  UpdateMemberStatusProps,
} from "../types/room.types";

interface RoomContext {
  room: Room | undefined;
  createRoom: (data: CreateRoomProps) => void;
  joinRoom: (data: JoinRoomProps) => void;
  updateMemberStatus: (data: UpdateMemberStatusProps) => void;
}

export const RoomContext = createContext<RoomContext | undefined>(undefined);

export const useRoom = () => {
  const context = useContext(RoomContext);

  if (!context) {
    throw new Error("useRoom must be used within a RoomProvider");
  }
  return context;
};
