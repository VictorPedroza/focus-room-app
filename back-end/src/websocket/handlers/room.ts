import type { Server, Socket } from "socket.io";
import type { RoomState } from "../../shared/constants/room.js";

const rooms = new Map<string, RoomState>();

// Rastreia os timers de desconexão para poder cancelá-los
const disconnectTimers = new Map<string, NodeJS.Timeout>();

interface JoinRoomProps {
  id: string;
  userName: string;
}

interface CreateRoomProps {
  id: string;
  title: string;
  userName: string;
}

export function roomHandler(socket: Socket, server: Server) {
  const userId = socket.handshake.auth.userId;

  // 1. Se o usuário acabou de (re)conectar, cancelamos a "contagem regressiva" de offline
  if (disconnectTimers.has(userId)) {
    clearTimeout(disconnectTimers.get(userId));
    disconnectTimers.delete(userId);
  }

  socket.on("create_room", ({ id, title, userName }: CreateRoomProps) => {
    if (rooms.has(id)) {
      socket.emit("create_room_error", {
        error: "room_id_already_exists",
        id,
      });
      return;
    }

    const room: RoomState = {
      id,
      title,
      members: [
        {
          id: userId,
          name: userName,
          status: "online",
        },
      ],
    };

    rooms.set(id, room);
    
    // Vincula o socket atual à sala para sabermos de onde ele saiu no disconnect
    socket.data.roomId = id; 
    
    socket.join(id);
    server.to(id).emit("room_state_update", room);
  });

  socket.on("join_room", ({ id, userName }: JoinRoomProps) => {
    const room = rooms.get(id);

    if (!room) {
      socket.emit("room_error", {
        error: "room_not_found",
        id,
      });
      return;
    }

    socket.data.roomId = id; 
    socket.join(id);

    const member = room.members.find((m) => m.id === userId);

    if (!member) {
      room.members.push({
        id: userId,
        name: userName,
        status: "online",
      });
    } 
    
    server.to(id).emit("room_state_update", room);
  });

  socket.on("get_room", ({ id }: { id: string }) => {
    const room = rooms.get(id);
    if (!room) {
      socket.emit("room_error", {
        error: "room_not_found",
        id,
      });
      return;
    }
    socket.emit("room_state_update", room);
  });
}