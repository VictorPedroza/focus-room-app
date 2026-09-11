interface Member {
    id: string;
    name: string;
    initials: string;
    status: "focado" | "em_pausa" | "offline";
}

const MEMBERS: Member[] = [
    { id: "1", name: "Pedro", initials: "PE", status: "focado" },
    { id: "2", name: "Julio", initials: "JU", status: "em_pausa" },
    { id: "3", name: "Caio", initials: "CA", status: "offline" },
];

const STATUS_MAP = {
    focado: { label: "Focado", color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20" },
    em_pausa: { label: "Em Pausa", color: "text-amber-400 bg-amber-500/10 border-amber-500/20" },
    offline: { label: "Offline", color: "text-slate-500 bg-slate-800/50 border-slate-700/30" },
} as const;

export const Sidebar = () => {
    return (
        <aside className="flex h-full flex-col space-y-6 border-l border-slate-800 bg-slate-950 p-4 text-slate-100">
            {/* Cabeçalho do Grupo */}
            <div className="flex items-center justify-between border-b border-slate-800/80 pb-4">
                <h2 className="text-lg font-semibold tracking-tight">Seu Grupo</h2>
                <span className="rounded-full bg-slate-800 px-2.5 py-0.5 text-xs font-medium text-slate-400">
                    5 Membros
                </span>
            </div>

            {/* Lista de Membros */}
            <div className="space-y-2.5">
                {MEMBERS.map((member) => {
                    const status = STATUS_MAP[member.status];

                    return (
                        <div
                            key={member.id}
                            className="flex items-center justify-between rounded-xl border border-slate-800/50 bg-slate-900/40 p-2.5 transition-colors hover:bg-slate-900/80"
                        >
                            <div className="flex items-center gap-3">
                                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-800 text-xs font-bold text-slate-200 border border-slate-700/50">
                                    {member.initials}
                                </div>
                                <span className="text-sm font-medium text-slate-200">{member.name}</span>
                            </div>

                            <span className={`rounded-md border px-2 py-0.5 text-xs font-medium ${status.color}`}>
                                {status.label}
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

            {/* Métrica do Dia */}
            <div className="mt-auto rounded-xl border border-slate-800/60 bg-slate-900/30 p-4 space-y-3">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400">Hoje</h3>
                <div className="grid grid-cols-3 gap-2 text-center">
                    <div className="rounded-lg bg-slate-900/80 p-2 border border-slate-800/40">
                        <p className="text-lg font-bold text-slate-100">3</p>
                        <p className="text-[10px] font-medium text-slate-400">Sessões</p>
                    </div>
                    <div className="rounded-lg bg-slate-900/80 p-2 border border-slate-800/40">
                        <p className="text-lg font-bold text-emerald-400">1/3</p>
                        <p className="text-[10px] font-medium text-slate-400">Em foco</p>
                    </div>
                    <div className="rounded-lg bg-slate-900/80 p-2 border border-slate-800/40">
                        <p className="text-lg font-bold text-slate-100">40</p>
                        <p className="text-[10px] font-medium text-slate-400">Min. Totais</p>
                    </div>
                </div>
            </div>
        </aside>
    );
};