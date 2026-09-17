import { useState, useEffect, useCallback } from "react";
import { getModeMinutes, type Mode } from "../constants";

export const usePomodoro = (workDuration: number) => {
  const [mode, setMode] = useState<Mode>("work");
  const [isRunning, setIsRunning] = useState(false);
  const [timeLeft, setTimeLeft] = useState(workDuration * 60);

  // Adicionado parâmetro 'force' para permitir a transição automática do sistema
  const changeMode = useCallback(
    (newMode: Mode, force: boolean = false) => {
      // Regra de negócio: não troca o modo se estiver rodando (a menos que seja forçado pelo sistema)
      if (isRunning && !force) return;

      setMode(newMode);
      setTimeLeft(getModeMinutes(newMode, workDuration) * 60);
      setIsRunning(false);
    },
    [workDuration, isRunning],
  );

  const toggleTimer = useCallback(() => {
    setIsRunning((prev) => !prev);
  }, []);

  const resetTimer = useCallback(() => {
    setIsRunning(false);
    setTimeLeft(getModeMinutes(mode, workDuration) * 60);
  }, [mode, workDuration]);

  useEffect(() => {
    if (mode === "work" && !isRunning) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setTimeLeft(workDuration * 60);
    }
  }, [workDuration, mode, isRunning]);

  useEffect(() => {
    if (!isRunning) return;

    const timer = window.setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setIsRunning(false);
          const nextMode = mode === "work" ? "shortBreak" : "work";

          // Passamos 'true' para forçar a troca ignorando o bloqueio de isRunning
          window.setTimeout(() => changeMode(nextMode, true), 0);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => window.clearInterval(timer);
  }, [isRunning, mode, changeMode]);

  return { mode, isRunning, timeLeft, changeMode, toggleTimer, resetTimer };
};
