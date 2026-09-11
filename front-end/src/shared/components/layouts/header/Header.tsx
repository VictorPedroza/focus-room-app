export const Header = () => {
    return (
        <header className="w-full border-b border-slate-800 bg-slate-950 px-4 py-3">
            <div className="mx-auto flex w-full items-center justify-between gap-4">
                {/* Identidade da sala */}
                <div className="flex min-w-0 items-center gap-3">
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-blue-800">
                        <svg
                            width="20"
                            height="20"
                            viewBox="0 0 18 18"
                            fill="none"
                            aria-hidden="true"
                        >
                            <circle
                                cx="6"
                                cy="9"
                                r="3"
                                fill="white"
                                opacity="0.9"
                            />
                            <circle
                                cx="12"
                                cy="6"
                                r="2.5"
                                fill="white"
                                opacity="0.65"
                            />
                            <circle
                                cx="12"
                                cy="12"
                                r="2.5"
                                fill="white"
                                opacity="0.65"
                            />
                        </svg>
                    </span>

                    <div className="min-w-0">
                        <p className="text-xs font-medium text-slate-400">
                            Focus Room
                        </p>

                        <h1 className="truncate text-base font-semibold text-slate-100">
                            Room Title
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
                    <div className="hidden rounded-md border border-slate-800 bg-slate-900 items-center justify-center px-3 py-1.5 sm:flex">
                        <span className="font-mono text-xs text-slate-400">
                            FRSM-1324
                        </span>
                    </div>

                    {/* Avatar / usuário */}
                    <div className="flex size-9 items-center justify-center rounded-full bg-slate-800 text-xs font-semibold text-slate-200">
                        PE
                    </div>
                </div>
            </div>
        </header>
    )
}
