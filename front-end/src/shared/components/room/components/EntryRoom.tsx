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
            <div className="mt-3 w-full flex flex-col">
                <label htmlFor="code" className="pl-2 text-xs text-slate-600">Codigo:</label>
                <div className="flex w-full px-3 items-center border border-gray-800 bg-slate-900 rounded-lg text-slate-400">
                    <p>FRSM-</p>
                    <input
                        type="number"
                        id="code"
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        className="h-10 bg-transparent
                        text-sm
                        text-slate-400
                        outline-none
                        placeholder:text-slate-400
                        disabled:cursor-not-allowedx
                        [appearance:textfield]
                        [&::-webkit-inner-spin-button]:appearance-none
                        [&::-webkit-outer-spin-button]:appearance-none"/>
                </div>
            </div>
            <p className="text-xs text-slate-600 text-center mt-1">Solicite o código para quem criou a sala</p>
            <Button
                text="Entrar na sala →"
                onClick={handleEntryRoom}
            />
        </div>
    )
}