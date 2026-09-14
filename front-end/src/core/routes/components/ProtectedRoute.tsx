import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({ children }: { children: ReactNode }) => {
    const userId = localStorage.getItem("userId");

    if (!userId) {
        return <Navigate to="/" replace />;
    }

    return <>{children}</>;
}