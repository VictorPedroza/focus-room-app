import { Outlet, useParams } from "react-router-dom";
import { useEffect } from "react";

import { useRoom } from "@/core/contexts";
import { Header, Sidebar } from "@/shared/components";

export const RoomLayout = () => {
    const { code } = useParams();
    const { getRoom } = useRoom();

    useEffect(() => {
        if (code) {
            getRoom(code);
        }
    }, [code, getRoom]);

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
