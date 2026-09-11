import { Server as HttpServer } from "http";
import { Server } from "socket.io";
import { registerConnectionHandler } from "./handlers/connection.js";

export function setupWebSocket(server: HttpServer) {
  const ws = new Server(server, {
    cors: {
      origin: "http://localhost:5173",
      methods: ["GET", "POST"],
    },
  });

  ws.on("connection", registerConnectionHandler);

  return ws;
}
