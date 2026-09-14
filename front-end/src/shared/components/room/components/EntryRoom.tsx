import { useState } from "react";
import { useNavigate } from "react-router-dom"

import { useRoom } from "@/core/contexts";
import { Button, Input } from "@/shared/components"

export const EntryRoom = () => {
    const [code, setCode] = useState("");
    const [userName, setUserName] = useState("");

    const { joinRoom } = useRoom();
    const navigate = useNavigate();

    const handleEntryRoom = () => {
        if (!code.trim() || !userName.trim()) {
            return;
        }

        joinRoom({
            id: code,
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