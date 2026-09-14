import { useNavigate } from "react-router-dom";
import {
    useCallback,
    useEffect,
    useState,
    type ReactNode,
} from "react";
import type { RoomState } from "@/shared/constants";
import { connectSocket, socket } from "@/shared/lib";

import { RoomContext } from "./RoomContext";

interface RoomContextProviderProps {
    children: ReactNode;
}

export const RoomContextProvider = ({
    children,
}: RoomContextProviderProps) => {
    const isConnected = socket.connected;
    const [room, setRoom] = useState<RoomState>();
    const navigate = useNavigate();

    useEffect(() => {
        const handleRoomUpdate = (state: RoomState) => {
            setRoom(state);
        };

        const handleRoomError = (data: {
            error: string;
            id: string;
        }) => {
            console.error(data.error);
            navigate("/");
        };

        socket.on("room_state_update", handleRoomUpdate);
        socket.on("room_error", handleRoomError);

        return () => {
            socket.off("room_state_update", handleRoomUpdate);
            socket.off("room_error", handleRoomError);
        };
    }, [navigate]);

    const getRoom = useCallback((id: string) => {
        connectSocket(); 
        socket.emit("get_room", { id });
    }, []);

    const joinRoom = useCallback(({ id, userName }: { id: string; userName: string }) => {
        localStorage.setItem("roomId", id);
        connectSocket();
        socket.emit("join_room", { id, userName });
    }, []);

    const createRoom = useCallback(({ id, title, userName }: { id: string; title: string; userName: string }) => {
        connectSocket();
        socket.emit("create_room", { id, title, userName });
    }, []);

    return (
        <RoomContext.Provider
            value={{
                room,
                isConnected,
                getRoom,
                joinRoom,
                createRoom,
            }}
        >
            {children}
        </RoomContext.Provider>
    );
};
