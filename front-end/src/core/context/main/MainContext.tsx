import { RoomContextProvider } from "@/modules/room/contexts"
import type { ReactNode } from "react"

export const MainContext = ({ children }: { children: ReactNode }) => {
    return (
        <RoomContextProvider>
            {children}
        </RoomContextProvider>
    )
}