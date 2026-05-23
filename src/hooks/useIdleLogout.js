import { useEffect } from "react";

export const useIdleLogout = (logout, time = 300000) => {
  useEffect(() => {
    let timeout;

    const resetTimer = () => {
      clearTimeout(timeout);

      timeout = setTimeout(() => {
        logout();
      }, time);
    };

    const events = [
      "mousemove",
      "mousedown",
      "keypress",
      "touchmove",
      "scroll",
    ];

    events.forEach(event =>
      window.addEventListener(event, resetTimer)
    );

    resetTimer();

    return () => {
      clearTimeout(timeout);

      events.forEach(event =>
        window.removeEventListener(event, resetTimer)
      );
    };
  }, [logout, time]);
};