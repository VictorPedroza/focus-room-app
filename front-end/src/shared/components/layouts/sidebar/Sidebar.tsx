import { useState } from "react";
import { useRoom } from "@room/contexts";
import type { MemberStatus } from "@room/types";

interface SidebarProps {
    onClose?: () => void;
}

export const Sidebar = ({ onClose }: SidebarProps) => {
    const { room } = useRoom();
    const [copied, setCopied] = useState<boolean>(false);
    const members = room?.members;

    const statusStyle: Record<MemberStatus, string> = {
        online: "bg-green-500/50 border-green-400/60 text-green-400",
        focused: "bg-yellow-500/50 border-yellow-400/60 text-yellow-400",
        paused: "bg-gray-500/50 border-gray-400/60 text-gray-400",
    };

    const statusMap: Record<MemberStatus, string> = {
        online: "Em Foco",
        focused: "Foco Parado",
        paused: "Em Pausa",
    };

    const inviteUrl = `${window.location.origin}/convite/${room?.code}`;
    const handleCopyInviteUrl = async () => {
        try {
            await navigator.clipboard.writeText(inviteUrl);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (error) {
            console.error("Erro ao copiar URL:", error);
        }
    };

    return (
        <aside className="flex h-full w-70 lg:w-auto min-w-70 flex-col space-y-6 border-l border-slate-800 bg-slate-950 p-4 text-slate-100">
            {/* Cabeçalho do Grupo */}
            <div className="flex items-center justify-between border-b border-slate-800/80 pb-4">
                <div className="flex items-center gap-2">
                    <h2 className="text-lg font-semibold tracking-tight">Seu Grupo</h2>
                    <span className="rounded-full bg-slate-800 px-2.5 py-0.5 text-xs font-medium text-slate-400">
                        {members?.length} Membros
                    </span>
                </div>

                {/* Botão de Fechar Mobile */}
                {onClose && (
                    <button
                        type="button"
                        onClick={onClose}
                        className="flex items-center justify-center rounded-md p-1.5 text-slate-400 transition-colors hover:bg-slate-800 hover:text-slate-100 lg:hidden"
                        aria-label="Fechar menu"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="18" y1="6" x2="6" y2="18" />
                            <line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                    </button>
                )}
            </div>

            {/* Lista de Membros */}
            <div className="space-y-2.5 flex-1 overflow-y-auto pr-1 custom-scrollbar">
                {members?.map((member) => (
                    <div
                        key={member.id}
                        className="flex items-center justify-between rounded-xl border border-slate-800/50 bg-slate-900/40 p-2.5 transition-colors hover:bg-slate-900/80"
                    >
                        <div className="flex items-center gap-3">
                            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-800 text-xs font-bold text-slate-200 border border-slate-700/50">
                                {member.username.substring(0, 1).toUpperCase()}
                            </div>
                            <span className="text-sm font-medium text-slate-200">{member.username}</span>
                        </div>
                        <span className={`rounded-md border px-2 py-0.5 text-xs font-medium ${statusStyle[member.status]}`}>
                            {statusMap[member.status]}
                        </span>
                    </div>
                ))}
            </div>

            {/* Botão Convidar */}
            <button
                type="button"
                onClick={handleCopyInviteUrl}
                className="flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-slate-700/60 bg-slate-900/20 py-2.5 text-sm font-medium text-slate-300 transition-colors hover:border-slate-600 hover:bg-slate-900/60 hover:text-slate-100 shrink-0"
            >
                {copied ? "Copiado!" : "Convidar Membros"}
            </button>
        </aside>
    );
};