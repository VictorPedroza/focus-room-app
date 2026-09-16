import { Server as HttpServer } from "http";
import { Server } from "socket.io";

import { environment } from "@/core/env";
import { registerRoomHandler } from "@/modules/room";

const setupWebSocket = (server: HttpServer) => {
  console.log("client: ", environment.FRONT_END_URL)
  const ws = new Server(server, {
    cors: {
      origin: environment.FRONT_END_URL,
      methods: ["GET", "POST"],
    },
  });

  ws.on("connection", (socket) => {
    registerRoomHandler(socket, ws);
  });

  return ws;
}
export default setupWebSocket;