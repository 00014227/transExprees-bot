import axios from "axios";

const sendToBot = async (formData) => {
  try {
    const tg = window.Telegram.WebApp;
    const user = tg.initDataUnsafe.user;

    alert("Данные отправлены в Google Sheets!", user);
  } catch (error) {
    console.error("Ошибка при отправке:", error);
    alert("Ошибка, попробуйте снова!");
  }
};


export default sendToBot
