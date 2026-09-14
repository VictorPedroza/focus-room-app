type UserStatus = "online" | "focused" | "offline";

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