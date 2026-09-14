import { Server as HttpServer } from "http";
import { Server } from "socket.io";

import { registerConnectionHandler } from "./handlers/connection.js";
import { environment } from "../core/env/enviroment.js";

export function setupWebSocket(server: HttpServer) {
  const ws = new Server(server, {
    cors: {
      origin: environment.FRONT_END_URL,
      methods: ["GET", "POST"],
    },
  });

  ws.on("connection", (socket) => {
    registerConnectionHandler(socket, ws);
  });

  return ws;
}
