import { useState } from "react";
import { useParams } from "react-router-dom";
import { CreateRoom, EntryRoom } from "./components";

type formType = "create" | "entry";

export const RoomSelector = () => {
    const { code } = useParams();
    const [formType, setFormtype] = useState<formType>(code ? "entry" : "create");

    const getButtonStyles = (type: formType) => {
        const isActive = formType === type;
        const baseStyles = "w-full py-1.5 rounded transition-colors text-sm font-medium focus-visible:outline-2 focus-visible:outline-slate-400";
        const activeStyles = "bg-slate-800 border border-slate-700/30 text-slate-100 font-semibold shadow-sm";
        const inactiveStyles = "text-slate-400 hover:text-slate-200";

        return `${baseStyles} ${isActive ? activeStyles : inactiveStyles}`;
    };

    return (
        <div className="mt-14 max-w-sm rounded-2xl sm:border border-slate-700/30 sm:bg-slate-900/50 p-6 w-95 h-auto">
            <div className="flex items-center justify-between rounded-lg border border-slate-800/30 bg-slate-900 p-1">
                <button
                    className={getButtonStyles("create")}
                    onClick={() => setFormtype("create")}
                >
                    Criar Sala
                </button>

                <button
                    className={getButtonStyles("entry")}
                    onClick={() => setFormtype("entry")}
                >
                    Entrar
                </button>
            </div>
            <div className="mt-4">
                {formType === "create" && <CreateRoom />}
                {formType === "entry" && <EntryRoom />}
            </div>
        </div>
    );
};