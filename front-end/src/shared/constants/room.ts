export type UserStatus = "online" | "focused" | "offline";

export interface User {
  id: string;
  name: string;
  status: UserStatus;
}

export interface RoomState {
  id: string;
  title: string;
  members: User[];
}

// Eventos que o Cliente envia para o Servidor
export interface ClientToServerEvents {
  join_room: ({ id, userName }: { id: string; userName: string }) => void;
  create_room: ({
    id,
    title,
    userName,
  }: {
    id: string;
    title: string;
    userName: string;
  }) => void;
  get_room: (data: { id: string }) => void;
}

// Eventos que o Servidor envia para o Cliente
export interface ServerToClientEvents {
  room_state_update: (state: RoomState) => void;
  create_room_error: (data: { error: string; id: string; }) => void;
  room_error: (data:{ error:string; id: string; }) => void;
}
