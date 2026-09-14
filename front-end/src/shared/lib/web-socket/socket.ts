import { io, Socket } from "socket.io-client";

import type {
  ClientToServerEvents,
  ServerToClientEvents,
} from "@/shared/constants";
import { enviroment } from "@/core/env";

const SOCKET_URL = enviroment.WebSocketUrl || "http://localhost:8000";

export const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(
  SOCKET_URL,
  {
    autoConnect: false,
  },
);

export function connectSocket() {
  if(socket.connected) return;

  let userId = localStorage.getItem("userId");

  if(!userId) {
    userId = crypto.randomUUID();
    localStorage.setItem("userId", userId);
  }

  socket.auth = { userId }
  socket.connect();
}

export function disconnectSocket() {
  if (socket.connected) {
    socket.disconnect();
  }
}
