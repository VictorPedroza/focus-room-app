import { Route, Routes } from "react-router-dom"
import { routes } from "./routes";

export const AppRoutes = () => {
    return (
        <Routes>
            {routes.map((route, index) => {
                const Component = route.component;
                return (
                    <Route
                        key={index}
                        path={route.path}
                        element={<Component />}
                    />
                )
            })}
        </Routes>
    )
}