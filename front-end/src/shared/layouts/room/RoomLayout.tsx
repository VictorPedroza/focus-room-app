import { Outlet } from "react-router-dom";
import { Sidebar, Header } from "../../components";

export const RoomLayout = () => {
    return (
        <div className="flex min-h-screen w-full flex-col bg-slate-950">
            <Header />

            <div className="mx-auto flex w-full flex-1 gap-6">
                <main className="min-w-0 min-h-0 flex-1">
                    <Outlet />
                </main>

                <aside className="hidden min-h-0 shrink-0 lg:block">
                    <Sidebar />
                </aside>
            </div>
        </div>
    );
};
