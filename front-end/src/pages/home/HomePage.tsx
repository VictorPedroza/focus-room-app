import { useEffect } from "react"
import { socket } from "../../shared/lib";

export const HomePage = () => {
    useEffect(() => {
        socket.emit("join_room");
    }, []); 

    return(
        <h1 className="text-white" >Home Page</h1>
    )
}