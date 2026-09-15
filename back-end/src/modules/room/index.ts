import type { Server, Socket } from "socket.io";

import type { Room } from "./types/room.types.js";
import { RoomService } from "./services/room.service.js";
import { RoomHandler } from "./handlers/room.handler.js";

const rooms = new Map<string, Room>();
const service = new RoomService(rooms);

export function registerRoomHandler(socket: Socket, server: Server) {
    const handler = new RoomHandler(socket, server, service);

    handler.register()
}