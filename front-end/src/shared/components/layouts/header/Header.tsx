import { Logo } from "@/shared/components";
import { useRoom } from "@/core/contexts";
import { useState } from "react";

export const Header = () => {
    const { room } = useRoom();

    const user = room?.members.find((user) => user.id === localStorage.getItem("userId"));

    const [copied, setCopied] = useState(false);

    const handleCopyCode = async () => {
        const code = `FRSM-${room?.id}`;

        try {
            await navigator.clipboard.writeText(code);
            setCopied(true);

            setTimeout(() => {
                setCopied(false);
            }, 2000);
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
                        <p className="text-xs font-medium text-slate-400">
                            Focus Room
                        </p>

                        <h1 className="truncate text-base font-semibold text-slate-100">
                            {room?.title}
                        </h1>
                    </div>
                </div>

                {/* Informações da sessão */}
                <div className="flex shrink-0 items-center gap-3">
                    {/* Status */}
                    <div className="flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1.5">
                        <span className="size-2 animate-pulse rounded-full bg-emerald-400" />
                        <span className="text-xs font-medium text-emerald-400">
                            Ao Vivo
                        </span>
                    </div>

                    {/* Código */}
                    {/* Código */}
                    <button
                        type="button"
                        onClick={handleCopyCode}
                        className="hidden rounded-md border border-slate-800 bg-slate-900 items-center justify-center px-3 py-1.5 sm:flex cursor-pointer hover:bg-slate-800 transition-colors"
                        title={copied ? "Copiado!" : "Clique para copiar"}
                    >
                        <span className="font-mono text-xs text-slate-400">
                            {copied ? "Copiado!" : `FRSM-${room?.id}`}
                        </span>
                    </button>


                    {/* Avatar / usuário */}
                    <div className="flex size-9 items-center justify-center rounded-full bg-slate-800 text-xs font-semibold text-slate-200">
                        {user?.name.substring(0, 2).toUpperCase()}
                    </div>
                </div>
            </div>
        </header>
    )
}
