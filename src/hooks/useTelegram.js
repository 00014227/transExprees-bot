import { useEffect, useState } from "react";

export function useTelegram() {
  const [tg, setTg] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined" && window.Telegram?.WebApp) {
      const webApp = window.Telegram.WebApp;

      webApp.ready();
      webApp.expand();

      setTg(webApp);
      setUser(webApp.initDataUnsafe?.user || null);
    }
  }, []);

  return { tg, user };
}
