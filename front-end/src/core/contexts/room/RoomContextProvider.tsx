import { RoomContext } from "./RoomContext";
import { socket } from "../../../shared/lib";
import {
    useCallback,
    useEffect,
    useState,
    type ReactNode,
} from "react";
import { useNavigate } from "react-router-dom";
import type { RoomState } from "../../../shared/constants/room";

interface RoomContextProviderProps {
    children: ReactNode;
}

export const RoomContextProvider = ({
    children,
}: RoomContextProviderProps) => {
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
        const requestRoom = () => {
            socket.emit("get_room", {
                id
            });
        };

        if (socket.connected) {
            requestRoom();
            return;
        }

        socket.once("connect", requestRoom);
    }, []);

    const joinRoom = useCallback(
        ({
            id,
            userName,
        }: {
            id: string;
            userName: string;
        }) => {
            const join = () => {
                socket.emit("join_room", {
                    id,
                    userName,
                });
            };
            localStorage.setItem("roomId", id);

            if (socket.connected) {
                join();
                return;
            }

            socket.once("connect", join);
        },
        [],
    );

    const createRoom = useCallback(
        ({
            id,
            title,
            userName,
        }: {
            id: string;
            title: string;
            userName: string;
        }) => {
            const create = () => {
                socket.emit("create_room", {
                    id,
                    title,
                    userName,
                });
            };

            if (socket.connected) {
                create();
                return;
            }

            socket.once("connect", create);
        },
        [],
    );

    return (
        <RoomContext.Provider
            value={{
                room,
                getRoom,
                joinRoom,
                createRoom,
            }}
        >
            {children}
        </RoomContext.Provider>
    );
};
