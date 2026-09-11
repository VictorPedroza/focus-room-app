import { useState } from "react";
import { CreateRoom } from "./CreateRoom";
import { EntryRoom } from "./EntryRoom";

type RoomType = "create" | "entry";

export const Room = () => {
    const [roomType, setRoomType] = useState<RoomType>("create");

    const getButtonStyles = (type: RoomType) => {
        const isActive = roomType === type;
        const baseStyles = "w-full py-1.5 rounded transition-colors text-sm font-medium focus-visible:outline-2 focus-visible:outline-slate-400";
        const activeStyles = "bg-slate-800 border border-slate-700/30 text-slate-100 font-semibold shadow-sm";
        const inactiveStyles = "text-slate-400 hover:text-slate-200";

        return `${baseStyles} ${isActive ? activeStyles : inactiveStyles}`;
    };

    return (
        <div className="mt-14 max-w-sm rounded-2xl border border-slate-700/30 bg-slate-900/50 p-6 w-95 h-87.5">
            <div className="flex items-center justify-between rounded-lg border border-slate-800/30 bg-slate-900 p-1">
                <button
                    className={getButtonStyles("create")}
                    onClick={() => setRoomType("create")}
                >
                    Criar Sala
                </button>

                <button
                    className={getButtonStyles("entry")}
                    onClick={() => setRoomType("entry")}
                >
                    Entrar
                </button>
            </div>
            <div className="mt-6">
                {roomType === "create" && <CreateRoom />}
                {roomType === "entry" && <EntryRoom />}
            </div>
        </div>
    );
};