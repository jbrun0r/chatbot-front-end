import chatbotApi from "@/services/chatbot/api-chatbot";

export type PostMessage = {
  message: string;
  sender: string;
};

export interface ResponseChatBot {
  recipient_id: string;
  [key: string]: string;
}

export async function postMessage(
  data: PostMessage
): Promise<ResponseChatBot[]> {
  const url = "/webhooks/rest/webhook";
  return await (
    await chatbotApi.post(url, data)
  ).data;
}
