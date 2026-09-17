import { useEffect } from "react";
import { useRoom } from "@room/contexts";
import type { MemberStatus } from "@/modules/room/types";
import type { Mode } from "../constants";

export const usePomodoroSync = (isRunning: boolean, mode: Mode) => {
    const { room, updateMemberStatus } = useRoom();

    useEffect(() => {
        if (!room) return;
        
        const userId = localStorage.getItem("userId");
        if (!userId) return;

        let status: MemberStatus;
        if (!isRunning) {
            status = "focused";
        } else if (mode === "work") {
            status = "online";
        } else {
            status = "paused";
        }

        updateMemberStatus({
            code: room.code,
            member: { id: userId, status },
        });
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isRunning, mode, room?.code, updateMemberStatus]);
};