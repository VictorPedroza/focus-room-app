import { PomodoroTimer } from "@/shared/components"

export const HomePage = () => {
    return(
        <div className="flex flex-col items-center justify-center w-full h-full">
            <h1 className="text-white pb-8 text-4xl font-bold">Timer Pomodoro</h1>
            <PomodoroTimer />
        </div>
    )
}