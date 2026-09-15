import { useEffect, useState } from "react";

import { useRoom } from "@room/contexts";
import { Button, Input } from "@/shared/components"
import { useNavigate } from "react-router-dom";

const DURATION_OPTS = [
    { label: "25 min", value: 25, desc: "Pomodoro clássico" },
    { label: "50 min", value: 50, desc: "Sessão profunda" },
    { label: "90 min", value: 90, desc: "Foco estendido" },
];

export const CreateRoom = () => {
    const { room, createRoom } = useRoom();
    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [username, setUsername] = useState("");
    const [duration, setDuration] = useState(25);

    useEffect(() => {
        if (room) {
            navigate(`/room/${room.code}`);
        }
    }, [room, navigate]);

    const handleCreateRoom = () => {
        if (!title.trim() || !username.trim()) {
            return;
        }

        const member = {
            id: crypto.randomUUID(),
            username
        }

        const code = Math.floor(1000 + Math.random() * 9000).toString();

        createRoom({
            code: code,
            title: title,
            member: {
                id: member.id,
                username: member.username
            },
        });
    };

    return (
        <div>
            <Input
                label="Nome:"
                placeholder="Digite seu Nome"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
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
