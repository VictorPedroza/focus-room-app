import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Header, Sidebar } from "@/shared/components";

export const RoomLayout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <div className="flex min-h-screen w-full flex-col bg-slate-950">
            <Header onToggleSidebar={() => setIsSidebarOpen(true)} />

            <div className="relative mx-auto flex w-full flex-1 gap-6 overflow-hidden">
                <main className="flex-1 min-h-0 min-w-0 overflow-y-auto">
                    <Outlet />
                </main>

                {/* Overlay Background para Mobile */}
                {isSidebarOpen && (
                    <div
                        className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity lg:hidden"
                        onClick={() => setIsSidebarOpen(false)}
                        aria-hidden="true"
                    />
                )}

                {/* Container da Sidebar (Responsivo) */}
                <div
                    className={`fixed inset-y-0 right-0 z-50 flex transform transition-transform duration-300 ease-in-out lg:static lg:block lg:translate-x-0 ${isSidebarOpen ? "translate-x-0" : "translate-x-full"
                        }`}
                >
                    <Sidebar onClose={() => setIsSidebarOpen(false)} />
                </div>
            </div>
        </div>
    );
};