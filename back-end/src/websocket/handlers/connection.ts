import { Socket } from "socket.io";

export function registerConnectionHandler(socket: Socket) {
  console.log("[+] Web Socket connected", socket.id);

  socket.on("connect", () => {
    console.log(`[+] Web Socket connected on: ${socket.id}`);
  });

  // TODO: Handlers 

  socket.on("disconnect", () => {
    console.log("[-] Web Socket disconnected:", socket.id);
  });
}
