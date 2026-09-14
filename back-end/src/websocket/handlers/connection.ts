import { Server, Socket } from "socket.io";
import { roomHandler } from "./room.js";

export function registerConnectionHandler(socket: Socket, server: Server) {
  socket.on("connect", () => {
    console.log(`[+] Web Socket connected on: ${socket.id}`);
  });

  // Handlers 
  roomHandler(socket, server);

  socket.on("disconnect", () => {
    console.log("[-] Web Socket disconnected:", socket.id);
  });
}
