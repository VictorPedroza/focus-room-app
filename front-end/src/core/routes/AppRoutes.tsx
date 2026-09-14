import { Route, Routes } from "react-router-dom"
import { RoomContextProvider } from "@/core/contexts";
import { routes } from "@/core/routes";

export const AppRoutes = () => {
    return (
        <RoomContextProvider>
            <Routes>
                {routes.map((layout, index) => {
                    const Layout = layout.component;
                    return (
                        <Route key={index} path={layout.path} element={<Layout />}>
                            {layout.children?.map((route, index) => {
                                const Component = route.component;
                                return (
                                    <Route key={index} path={route.path} element={<Component />} />
                                )
                            })}
                        </Route>
                    )
                })}
            </Routes>
        </RoomContextProvider>
    )
}