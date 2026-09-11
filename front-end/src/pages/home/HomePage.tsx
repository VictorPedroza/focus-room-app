import { useEffect } from "react"
import { socket } from "../../services/socket/socket";

export const HomePage = () => {
    useEffect(() => {
        socket.emit("join_room", { roomId: "1234" });
    }, []); 

    return(
        <h1 className="text-white" >Home Page</h1>
    )
}