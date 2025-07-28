export const isTelegramWebApp = () => {
    return typeof window.Telegram !== 'undefined' && typeof window.Telegram.WebApp !== 'undefined';
  };
  