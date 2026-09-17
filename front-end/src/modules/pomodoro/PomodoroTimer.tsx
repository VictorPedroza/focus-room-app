import { Button } from "@/shared/components";
import { useRoom } from "@room/contexts";
import { usePomodoro } from "./hooks/usePomodoro";
import { usePomodoroSync } from "./hooks/usePomodoroSync";
import { formatTime, POMODORO_MODES } from "./constants";

export const PomodoroTimer = () => {
    const { room } = useRoom();
    const workDuration = room?.duration || 25;

    const { 
        mode, 
        isRunning, 
        timeLeft, 
        changeMode, 
        toggleTimer, 
        resetTimer 
    } = usePomodoro(workDuration);

    usePomodoroSync(isRunning, mode);

    return (
        <div className="mx-auto flex h-full w-full max-w-md flex-col items-center justify-center rounded-2xl bg-slate-950 p-6">
            <div className="mb-8 grid w-full grid-cols-3 gap-2 rounded-lg bg-slate-900 p-1">
                {POMODORO_MODES.map((m) => (
                    <button
                        key={m.value}
                        onClick={() => changeMode(m.value)}
                        disabled={isRunning} // Trava o clique se estiver rodando
                        className={`
                            rounded-md px-3 py-2 text-xs font-medium transition-all duration-150
                            ${mode === m.value
                                ? "bg-slate-800 text-white shadow-sm" // Modo atual ativo
                                : isRunning 
                                    ? "text-slate-500/50 cursor-not-allowed" // Desabilitado
                                    : "text-slate-400 hover:bg-slate-800/50 hover:text-slate-200" // Padrão clicável
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
                        onClick={toggleTimer}
                    />
                </div>

                <button
                    onClick={resetTimer}
                    disabled={isRunning}
                    className="mt-4 flex cursor-pointer gap-2 rounded-lg bg-slate-800 px-4 py-3 text-sm font-semibold text-slate-100 hover:bg-slate-900 disabled:bg-slate-700/50 disabled:text-slate-800 disabled:cursor-not-allowed"
                >
                    Reiniciar
                </button>
            </div>
        </div>
    );
};