import type { Server, Socket } from "socket.io";

import type {
  ClientToServer,
  ServerToClient,
  Room,
  RoomError,
  RoomResult,
} from "../types/room.types.js";
import type { RoomService } from "../services/room.service.js";

/**
 * RoomHandle - Handler de gerenciamento de salas
 *
 * @author Victor Pedroza <victor.pedroza@protonmail.com>
 * @since 2026-09-14
 * @version 1.0.0
 *
 **/
export class RoomHandler {
  constructor(
    private socket: Socket<ClientToServer, ServerToClient>,
    private server: Server<ClientToServer, ServerToClient>,
    private service: RoomService,
  ) {}

  /** Método de Registro de Métodos do Handler **/
  register() {
    this.socket.on("create_room", (data) => {
      const result = this.service.createRoom(data);

      if (result.success) {
        this.socket.join(data.code);
      }
      this.handleRoomResult(result, data.code);
    });

    this.socket.on("join_room", (data) => {
      const result = this.service.joinRoom(data);

      if (result.success) {
        this.socket.join(data.code);
      }

      this.handleRoomResult(result, data.code);
    });

    this.socket.on("leave_room", (data) => {
      const result = this.service.leaveRoom(data);

      if (result.success) {
        this.socket.leave(data.code);
      }

      this.handleRoomResult(result, data.code);
    });

    this.socket.on("update_member_status", (data) => {
      const result = this.service.updateStatus(data);

      this.handleRoomResult(result, data.code);
    });

    this.socket.on("get_room", (data) => {
      const result = this.service.getRoom(data);

      if (result.success) {
        this.socket.join(data.code);
      }

      this.handleRoomResult(result, data.code);
    });
  }

  private emitError(error: RoomError) {
    this.socket.emit("room_error", error);
  }

  private emitRoomUpdate(code: string, room: Room) {
    this.server.to(code).emit("room_state_update", room);
  }

  private handleRoomResult(result: RoomResult, code?: string) {
    if (result.success) {
      console.log("Teste", result);
      if (code) {
        this.emitRoomUpdate(code, result.room);
      } else {
        this.socket.emit("room_state_update", result.room);
      }
    } else {
      this.emitError(result.error);
    }
  }
}
