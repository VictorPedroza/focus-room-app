import { Outlet } from "react-router-dom"

export const MainLayout = () => {
    return (
        <div className="min-h-screen w-full flex flex-col items-center justify-center bg-slate-950">
            <div className="w-lg min-h-8 flex gap-2 items-center justify-center">
                <span className="bg-blue-800 p-1.5 rounded">
                    <svg width="28" height="28" viewBox="0 0 18 18" fill="none">
                        <circle cx="6" cy="9" r="3" fill="white" opacity="0.9" />
                        <circle cx="12" cy="6" r="2.5" fill="white" opacity="0.65" />
                        <circle cx="12" cy="12" r="2.5" fill="white" opacity="0.65" />
                    </svg>
                </span>
                <h1 className="text-2xl font-bold text-slate-100 ">Focus Room</h1>
            </div>
            <p className="text-slate-600 pt-2">Trabalhe, estude e foque junto</p>
            <Outlet />
        </div>
    )
}