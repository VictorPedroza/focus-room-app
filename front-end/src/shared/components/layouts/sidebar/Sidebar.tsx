import { useRoom } from "@/core/contexts";

import type { UserStatus } from "@/shared/constants";

export const Sidebar = () => {
    const { room } = useRoom();
    const members = room?.members;

    const statusStyle: Record<UserStatus, string> = {
        online: "bg-green-500/50 border-green-400/60 text-green-400",
        focused: "bg-yellow-500/50 border-yellow-400/60 text-yellow-400",
        offline: "bg-gray-500/50 border-gray-400/60 text-gray-400",
    };

    return (
        <aside className="flex h-full flex-col min-w-70 space-y-6 border-l border-slate-800 bg-slate-950 p-4 text-slate-100">
            {/* Cabeçalho do Grupo */}
            <div className="flex items-center justify-between border-b border-slate-800/80 pb-4">
                <h2 className="text-lg font-semibold tracking-tight">Seu Grupo</h2>
                <span className="rounded-full bg-slate-800 px-2.5 py-0.5 text-xs font-medium text-slate-400">
                    {members?.length} Membros
                </span>
            </div>

            {/* Lista de Membros */}
            <div className="space-y-2.5">
                {members?.map((member) => {

                    return (
                        <div
                            key={member.id}
                            className="flex items-center justify-between rounded-xl border border-slate-800/50 bg-slate-900/40 p-2.5 transition-colors hover:bg-slate-900/80"
                        >
                            <div className="flex items-center gap-3">
                                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-800 text-xs font-bold text-slate-200 border border-slate-700/50">
                                    {member.name.substring(0, 2).toUpperCase()}
                                </div>
                                <span className="text-sm font-medium text-slate-200">{member.name}</span>
                            </div>

                            <span className={`rounded-md border px-2 py-0.5 text-xs font-medium ${statusStyle[member.status]}`}>
                                {member.status}
                            </span>
                        </div>
                    );
                })}
            </div>

            {/* Botão Convidar */}
            <button
                type="button"
                className="flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-slate-700/60 bg-slate-900/20 py-2.5 text-sm font-medium text-slate-300 transition-colors hover:border-slate-600 hover:bg-slate-900/60 hover:text-slate-100"
            >
                <span>+</span> Convidar Membros
            </button>
        </aside>
    );
};