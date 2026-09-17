import { useCallback, useEffect, useState, type ReactNode } from "react"
import { RoomContext } from "./RoomContext"
import type { CreateRoomProps, JoinRoomProps, LeaveRoomProps, Room, RoomError, UpdateMemberStatusProps } from "../types/room.types";
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

    const updateMemberStatus = useCallback((data: UpdateMemberStatusProps) => {
        socket.emit("update_member_status", data);
    }, [])

    const leaveRoom = useCallback((data: LeaveRoomProps) => {
        localStorage.removeItem("userId");
        localStorage.removeItem("roomCode");

        socket.emit("leave_room", data);

        setRoom(undefined);
        navigate("/");
    }, [navigate]);
    return (
        <RoomContext.Provider value={{ room, createRoom, joinRoom, updateMemberStatus, leaveRoom }} >
            {children}
        </RoomContext.Provider>
    )
}