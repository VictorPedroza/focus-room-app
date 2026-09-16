import { useState, useEffect, useCallback } from "react";

import { Button } from "@/shared/components";
import { useRoom } from "@room/contexts";
import type { MemberStatus } from "@/modules/room/types";

type Mode = "work" | "shortBreak" | "longBreak";

export const PomodoroTimer = () => {
    const { room, updateMemberStatus } = useRoom();

    const workDuration = room?.duration || 25;

    const [timeLeft, setTimeLeft] = useState(workDuration * 60);
    const [isRunning, setIsRunning] = useState(false);
    const [mode, setMode] = useState<Mode>("work");

    const getModeMinutes = useCallback((currentMode: Mode) => {
        switch (currentMode) {
            case "work":
                return workDuration;
            case "shortBreak":
                return 5;
            case "longBreak":
                return 15;
            default:
                return workDuration;
        }
    }, [workDuration]);

    const updateStatus = useCallback((running: boolean, currentMode: Mode) => {
        if (!room) return;

        const userId = localStorage.getItem("userId");
        if (!userId) return;

        let status: MemberStatus;
        if (!running) {
            status = "focused";
        } else if (currentMode === "work") {
            status = "online";
        } else {
            status = "paused";
        }

        updateMemberStatus({
            code: room.code,
            member: {
                id: userId,
                status,
            },
        });
    }, [room, updateMemberStatus]);

    const handleStartPause = () => {
        const nextIsRunningState = !isRunning;
        setIsRunning(nextIsRunningState);
        updateStatus(nextIsRunningState, mode);
    };

    const switchMode = useCallback((newMode: Mode) => {
        setMode(newMode);
        setTimeLeft(getModeMinutes(newMode) * 60);
        setIsRunning(false);
        updateStatus(false, newMode);
    }, [getModeMinutes, updateStatus]);

    useEffect(() => {
        if (mode === "work" && !isRunning) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setTimeLeft(workDuration * 60);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [workDuration]);

    // Controle do timer
    useEffect(() => {
        if (!isRunning) return;

        const timer = window.setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    setIsRunning(false);
                    const nextMode = mode === "work" ? "shortBreak" : "work";

                    // Escapa do ciclo atual do React para atualizar o modo com segurança
                    window.setTimeout(() => switchMode(nextMode), 0);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => window.clearInterval(timer);
    }, [isRunning, mode, switchMode]);

    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60)
            .toString()
            .padStart(2, "0");

        const secondsFormatted = (seconds % 60)
            .toString()
            .padStart(2, "0");

        return `${minutes}:${secondsFormatted}`;
    };

    const MODES = [
        { label: "Foco", value: "work" as Mode },
        { label: "Pausa Curta", value: "shortBreak" as Mode },
        { label: "Pausa Longa", value: "longBreak" as Mode },
    ];

    return (
        <div className="mx-auto flex w-full max-w-md flex-col items-center rounded-2xl border border-slate-800 bg-slate-950 p-6">
            <div className="mb-8 grid w-full grid-cols-3 gap-2 rounded-lg bg-slate-900 p-1">
                {MODES.map((m) => (
                    <button
                        key={m.value}
                        onClick={() => switchMode(m.value)}
                        className={`
                            rounded-md px-3 py-2 text-xs font-medium transition-all duration-150
                            ${mode === m.value
                                ? "bg-slate-800 text-white shadow-sm"
                                : "text-slate-400 hover:bg-slate-800/50 hover:text-slate-200"
                            }
                        `}
                    >
                        {m.label}
                    </button>
                ))}
            </div>

            <div className="mb-8 font-mono text-7xl font-bold tracking-widest text-white">
                {formatTime(timeLeft)}
            </div>

            <div className="flex w-full gap-3">
                <div className="flex-1">
                    <Button
                        text={isRunning ? "Pausar" : "Iniciar"}
                        onClick={handleStartPause}
                    />
                </div>

                <button
                    onClick={() => {
                        setIsRunning(false);
                        setTimeLeft(getModeMinutes(mode) * 60);
                        updateStatus(false, mode);
                    }}
                    className="mt-4 flex cursor-pointer gap-2 rounded-lg bg-slate-800 px-4 py-3 text-sm font-semibold text-slate-100 hover:bg-slate-900 disabled:bg-slate-700/50 disabled:text-slate-800"
                    disabled={isRunning}
                >
                    Reiniciar
                </button>
            </div>
        </div>
    );
};