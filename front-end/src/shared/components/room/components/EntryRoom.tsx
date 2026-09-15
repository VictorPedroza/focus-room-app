import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"

import { useRoom } from "@room/contexts";
import { Button, Input } from "@/shared/components"

export const EntryRoom = () => {
    const [code, setCode] = useState("");
    const [username, setUsername] = useState("");

    const { room, joinRoom } = useRoom();
    const navigate = useNavigate();

    useEffect(() => {
        if (room) {
            navigate(`/room/${room.code}`);
        }
    }, [room, navigate]);

    const handleEntryRoom = () => {
        if (!code.trim() || !username.trim()) {
            return;
        }

        joinRoom({
            code,
            member: {
                id: crypto.randomUUID(),
                username
            }
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
                label="Código:"
                placeholder="FSRM-XXXX"
                value={code}
                onChange={(e) => setCode(e.target.value)}
            />
            <p className="text-xs text-slate-600 text-center mt-1">Solicite o código para quem criou a sala</p>
            <Button
                text="Entrar na sala →"
                onClick={handleEntryRoom}
            />
        </div>
    )
}