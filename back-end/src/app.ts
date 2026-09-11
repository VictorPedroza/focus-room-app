import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors);

export const server = createServer(app);
const ws = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

ws.on("connection", (socket) => {
  console.log("[+] Web Socket connected", socket.id);

  socket.on("join_room", ({ roomId }: { roomId: string }) => {
    socket.join(roomId);

    console.log(`[+] ${socket.id} joined room: ${roomId}`);
  });

  socket.on("disconnect", () => {
    console.log("[-] Web Socket disconnected:", socket.id);
  });
});

app.get("/", (req, res) => {
  res.json({
    status: "OK",
  });
});
