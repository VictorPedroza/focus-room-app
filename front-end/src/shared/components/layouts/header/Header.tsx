import { useRoom } from "@room/contexts";
import { Logo } from "@/shared/components";
import { useState } from "react";

interface HeaderProps {
    onToggleSidebar?: () => void;
}

export const Header = ({ onToggleSidebar }: HeaderProps) => {
    const { room } = useRoom();
    const user = room?.members.find((user) => user.id === localStorage.getItem("userId"));
    const [copied, setCopied] = useState(false);

    const handleCopyCode = async () => {
        try {
            if (room) {
                await navigator.clipboard.writeText(room.code);
                setCopied(true);
            }
            setTimeout(() => setCopied(false), 2000);
        } catch (error) {
            console.error("Erro ao copiar código:", error);
        }
    };

    return (
        <header className="w-full border-b border-slate-800 bg-slate-950 px-4 py-3">
            <div className="mx-auto flex w-full items-center justify-between gap-4">
                {/* Identidade da sala */}
                <div className="flex min-w-0 items-center gap-3">
                    <Logo />
                    <div className="min-w-0">
                        <p className="text-xs font-medium text-slate-400">Focus Room</p>
                        <h1 className="truncate text-base font-semibold text-slate-100">
                            {room?.title}
                        </h1>
                    </div>
                </div>

                {/* Informações da sessão */}
                <div className="flex shrink-0 items-center gap-3">
                    {/* Código */}
                    <button
                        type="button"
                        onClick={handleCopyCode}
                        className="hidden items-center justify-center rounded-md border border-slate-800 bg-slate-900 px-3 py-1.5 transition-colors hover:bg-slate-800 sm:flex cursor-pointer"
                        title={copied ? "Copiado!" : "Clique para copiar"}
                    >
                        <span className="font-mono text-xs text-slate-400">
                            {copied ? "Copiado!" : `FRSM-${room?.code}`}
                        </span>
                    </button>

                    {/* Avatar / usuário */}
                    <div className="flex size-9 items-center justify-center rounded-full border border-slate-700/50 bg-slate-800 text-xs font-semibold text-slate-200">
                        {user?.username.substring(0, 1).toUpperCase()}
                    </div>

                    {/* Botão Menu Mobile */}
                    {onToggleSidebar && (
                        <button
                            type="button"
                            onClick={onToggleSidebar}
                            className="flex items-center justify-center rounded-md p-1.5 text-slate-400 transition-colors hover:bg-slate-800 hover:text-slate-100 lg:hidden"
                            aria-label="Abrir menu"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="3" y1="12" x2="21" y2="12" />
                                <line x1="3" y1="6" x2="21" y2="6" />
                                <line x1="3" y1="18" x2="21" y2="18" />
                            </svg>
                        </button>
                    )}
                </div>
            </div>
        </header>
    );
};