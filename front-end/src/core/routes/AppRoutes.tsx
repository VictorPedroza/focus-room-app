import { Route, Routes } from "react-router-dom"

import { routes } from "@/core/routes";
import { ProtectedRoute } from "./components/ProtectedRoute";

export const AppRoutes = () => {
    return (
        <Routes>
            {routes.map((layout, index) => {
                const Layout = layout.component;
                return (
                    <Route key={index} path={layout.path} element={<Layout />}>
                        {layout.children?.map((route, index) => {
                            const Component = route.component;

                            const Element = route.isProtected ? (
                                <ProtectedRoute>
                                    <Component />
                                </ProtectedRoute>
                            ) : (
                                <Component />
                            );

                            return (
                                <Route
                                    key={index}
                                    path={route.path}
                                    element={Element}
                                />
                            );


                        })}
                    </Route>
                )
            })}
        </Routes>
    )
}