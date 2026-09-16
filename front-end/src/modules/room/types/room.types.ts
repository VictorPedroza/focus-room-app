export type MemberStatus = "online" | "focused" | "paused";

interface Member {
  id: string;
  username: string;
  status: MemberStatus;
}

export interface Room {
  code: string;
  title: string;
  duration: number;
  members: Member[];
}

export type RoomResult =
  | {
      success: true;
      room: Room;
    }
  | {
      success: false;
      error: RoomError;
    };


export interface CreateRoomProps {
  code: string;
  title: string;
  duration?: number;
  member: {
    id: string;
    username: string;
  };
}

export interface JoinRoomProps {
  code: string;
  member: {
    id: string;
    username: string;
  };
}

export interface LeaveRoomProps {
  code: string;
  member: {
    id: string;
  };
}

export interface UpdateMemberStatusProps {
  code: string;
  member: {
    id: string;
    status: MemberStatus;
  };
}

export interface GetRoomProps {
  code: string;
  memberId: string;
}


/** Error Types **/
export type ErrorType =
  | "room_code_already_exists"
  | "room_invalid_code"
  | "room_not_found"
  | "member_not_found";

export interface RoomError {
  type: ErrorType;
  message: string;
  code: string | null;
}

/** WebSocket & Server Types **/
export interface ClientToServer {
  create_room: (data: CreateRoomProps) => void;
  join_room: (data: JoinRoomProps) => void;
  leave_room: (data: LeaveRoomProps) => void;
  update_member_status: (data: UpdateMemberStatusProps) => void;
  get_room: (data: GetRoomProps) => void;
}

export interface ServerToClient {
  room_state_update: (room: Room) => void;
  room_error: (error: RoomError) => void;
}
