import { Logo } from "@/shared/components"
import { Outlet } from "react-router-dom"

export const MainLayout = () => {
    return (
        <div className="min-h-screen w-full flex flex-col items-center justify-center bg-slate-950">
            <div className="w-lg min-h-8 flex gap-2 items-center justify-center">
                <Logo />
                <h1 className="text-2xl font-bold text-slate-100 ">Focus Room</h1>
            </div>
            <p className="text-slate-600 pt-2">Trabalhe, estude e foque junto</p>
            <Outlet />
        </div>
    )
}