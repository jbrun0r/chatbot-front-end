import axios from "axios";

const chatbotApi = axios.create({
  baseURL: "/chatbot",
  headers: {
    "Content-Type": "application/json;charset=UTF-8",
  },
});

export default chatbotApi;
