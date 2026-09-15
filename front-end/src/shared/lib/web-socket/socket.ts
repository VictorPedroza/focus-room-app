import { io, type Socket } from "socket.io-client";

import { environment } from "@/core/env";
import type { ClientToServer, ServerToClient } from "@room/types";

const SOCKET_URL = environment.WebSocketUrl;

export const socket: Socket<ServerToClient, ClientToServer> = io(
  SOCKET_URL,
  {
    autoConnect: true,
  },
);
