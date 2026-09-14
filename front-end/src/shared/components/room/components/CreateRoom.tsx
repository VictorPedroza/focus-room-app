import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useRoom } from "@/core/contexts";
import { Button, Input } from "@/shared/components"


const DURATION_OPTS = [
    { label: "25 min", value: 25, desc: "Pomodoro clássico" },
    { label: "50 min", value: 50, desc: "Sessão profunda" },
    { label: "90 min", value: 90, desc: "Foco estendido" },
];

export const CreateRoom = () => {
    const [title, setTitle] = useState("");
    const [userName, setUserName] = useState("");
    const [duration, setDuration] = useState(25);

    const { createRoom } = useRoom();
    const navigate = useNavigate();

    const handleCreateRoom = () => {
        if (!title.trim() || !userName.trim()) {
            return;
        }

        const code = Math.floor(1000 + Math.random() * 9000).toString();

        createRoom({
            id: code,
            title: title,
            userName: userName,
        });

        navigate(`/room/${code}`);
    };

    return (
        <div>
            <Input
                label="Nome:"
                placeholder="Digite seu Nome"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
            />

            <Input
                label="Nome da Sala:"
                placeholder="Ex: Deep Work"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />

            <div className="flex flex-col mt-3">
                <label className="text-xs mb-2 text-slate-600 pr-2">
                    Duração padrão
                </label>

                <div className="grid grid-cols-3 gap-2">
                    {DURATION_OPTS.map((d) => (
                        <button
                            type="button"
                            key={d.value}
                            onClick={() => setDuration(d.value)}
                            className={`
                                py-2 px-3 rounded-lg text-xs font-medium
                                transition-all duration-150
                                ${duration === d.value
                                    ? "bg-slate-900 text-white border border-slate-900"
                                    : "bg-slate-800 text-slate-400"
                                }
                            `}
                        >
                            {d.label}
                        </button>
                    ))}
                </div>
            </div>

            <Button
                text="Criar sala →"
                onClick={handleCreateRoom}
            />
        </div>
    );
};
