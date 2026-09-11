import { Outlet } from "react-router-dom";
import { Sidebar, Header } from "../../components";

export const RoomLayout = () => {
    return (
        <div className="min-h-screen w-full flex flex-col items-center bg-slate-950">
            <Header />
            <div className="flex w-full max-w-7xl flex-1 justify-between gap-6">
                <main className="flex-1">
                    <Outlet />
                </main>
                <aside className="w-20 shrink-0">
                    <Sidebar />
                </aside>
            </div>
        </div>
    );
};