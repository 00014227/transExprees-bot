// socket.js

import { isTelegramWebApp } from "./utils/isTelegramWebApp";


let socket = null;

export const initSocket = () => {
  if (isTelegramWebApp()) {
    console.warn("WebSocket is disabled inside Telegram WebApp");
    return null;
  }

  socket = new WebSocket('wss://https://coral-app-6u5nx.ondigitalocean.app//ws');

  socket.onopen = () => console.log("WebSocket connected");
  socket.onmessage = (msg) => console.log("Message:", msg.data);
};

export const getSocket = () => socket;
