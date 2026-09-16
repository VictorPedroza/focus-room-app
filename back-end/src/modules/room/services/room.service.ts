import type {
  CreateRoomProps,
  GetRoomProps,
  JoinRoomProps,
  LeaveRoomProps,
  Room,
  RoomResult,
  UpdateMemberStatusProps,
} from "../types/room.types.js";

/**
 * RoomService - Serviço de gerenciamento das sala de foco
 *
 * @author Victor Pedroza <victor.pedroza@protonmail.com>
 * @since 2026-09-14
 * @version 1.0.0
 *
 **/
export class RoomService {
  constructor(private rooms: Map<string, Room>) {}

  /**
   * Método para criar sala
   ***/
  createRoom({
    code,
    title,
    duration = 25,
    member,
  }: CreateRoomProps): RoomResult {
    if (this.rooms.has(code)) {
      return {
        success: false,
        error: {
          type: "room_code_already_exists",
          message: "Erro ao gerar sala",
          code,
        },
      };
    }

    if (!this.isValidRoomCode) {
      return {
        success: false,
        error: {
          type: "room_invalid_code",
          message: "Erro ao gerar sala",
          code,
        },
      };
    }

    const room: Room = {
      code,
      title,
      duration,
      members: [
        {
          id: member.id,
          username: member.username,
          status: "online",
        },
      ],
    };

    this.rooms.set(code, room);
    return {
      success: true,
      room,
    };
  }

  /**
   * Método para entrar na sala
   **/
  joinRoom({ code, member }: JoinRoomProps): RoomResult {
    const room = this.rooms.get(code);

    if (!room) {
      return {
        success: false,
        error: {
          type: "room_not_found",
          message: "Sala não encontrada",
          code: "ROOM_NOT_FOUND",
        },
      };
    }

    room.members.push({
      ...member,
      status: "online",
    });

    return {
      success: true,
      room,
    };
  }

  /** Método para sair da sala **/
  leaveRoom({ code, member }: LeaveRoomProps): RoomResult {
    const room = this.rooms.get(code);

    if (!room) {
      return {
        success: false,
        error: {
          type: "room_not_found",
          message: "Sala não encontrada",
          code: null,
        },
      };
    }

    const existMember = room.members.find((m) => m.id === member.id);

    if (!existMember) {
      return {
        success: false,
        error: {
          type: "member_not_found",
          message: "Usuário não encontrado",
          code: code,
        },
      };
    }

    room.members = room.members.filter((m) => (m.id = member.id));

    return {
      success: true,
      room,
    };
  }

  updateStatus({ code, member }: UpdateMemberStatusProps): RoomResult {
    const room = this.rooms.get(code);

    if (!room) {
      return {
        success: false,
        error: {
          type: "room_not_found",
          message: "Sala não encontrada",
          code: null,
        },
      };
    }

    const existMember = room.members.find((m) => m.id === member.id);

    if (!existMember) {
      return {
        success: false,
        error: {
          type: "member_not_found",
          message: "Usuário não encontrado",
          code: code,
        },
      };
    }

    existMember.status = member.status;

    return {
      success: true,
      room,
    };
  }

  getRoom({ code, memberId }: GetRoomProps): RoomResult {
    const room = this.rooms.get(code);

    if (!room) {
      return {
        success: false,
        error: {
          type: "room_not_found",
          message: "Sala não encontrada",
          code: null,
        },
      };
    }

    const existMember = room.members.find((m) => m.id === memberId);

    if (!existMember) {
      return {
        success: false,
        error: {
          type: "member_not_found",
          message: "Usuário não encontrado",
          code: code,
        },
      };
    }

    return {
        success: true,
        room
    }
  }

  /** Métodos Auxiliares **/
  private isValidRoomCode(code: string): boolean {
    return /^\d{4}$/.test(code);
  }
}
