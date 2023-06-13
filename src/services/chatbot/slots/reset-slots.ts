import chatbotApi from "@/services/chatbot/api-chatbot";

export async function resetSlots(sender: string) {
  const url = `/conversations/${sender}/tracker/events`;
  const slots = [
    {
      event: "slot",
      name: "id",
      value: null,
    },
    {
      event: "slot",
      name: "name",
      value: null,
    },
  ];

  await Promise.all(slots.map((slot) => chatbotApi.post(url, slot)));
}
