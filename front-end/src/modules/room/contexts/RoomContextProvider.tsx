import { useCallback, useEffect, useState, type ReactNode } from "react"
import { RoomContext } from "./RoomContext"
import type { CreateRoomProps, JoinRoomProps, Room, RoomError } from "../types/room.types";
import { socket } from "@/shared/lib";
import { useNavigate } from "react-router-dom";

export const RoomContextProvider = ({ children }: { children: ReactNode }) => {
    const [room, setRoom] = useState<Room | undefined>(undefined);

    const navigate = useNavigate();

    useEffect(() => {
        const handleUpdate = (room: Room) => {
            setRoom(room);
        };

        const handleError = (error: RoomError) => {
            console.error("ERROR:", error);
            navigate("/");
        };

        const getRoom = () => {
            const roomCode = localStorage.getItem("roomCode");
            const userId = localStorage.getItem("userId");

            console.log("GET ROOM", {
                roomCode,
                userId,
                connected: socket.connected,
            });

            if (!roomCode || !userId) {
                navigate("/");
                return;
            }

            socket.emit("get_room", {
                code: roomCode,
                memberId: userId,
            });
        };

        socket.on("room_state_update", handleUpdate);
        socket.on("room_error", handleError);

        if (socket.connected) {
            getRoom();
        } else {
            socket.once("connect", getRoom);
        }

        return () => {
            socket.off("room_state_update", handleUpdate);
            socket.off("room_error", handleError);
            socket.off("connect", getRoom);
        };
    }, [navigate]);

    const createRoom = useCallback((data: CreateRoomProps) => {
        localStorage.setItem("roomCode", data.code);
        localStorage.setItem("userId", data.member.id);
        socket.emit("create_room", data);
    }, [])

    const joinRoom = useCallback((data: JoinRoomProps) => {
        localStorage.setItem("roomCode", data.code);
        localStorage.setItem("userId", data.member.id);
        socket.emit("join_room", data);
    }, []);

    return (
        <RoomContext.Provider value={{ room, createRoom, joinRoom }} >
            {children}
        </RoomContext.Provider>
    )
}