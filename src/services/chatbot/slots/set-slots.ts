import chatbotApi from "@/services/chatbot/api-chatbot";

export interface SetSlots {
  sender: string;
  id: string;
  name: string;
}

export async function setSlots(data: SetSlots) {
  const url = `/conversations/${data.sender}/tracker/events`;
  const slots = [
    {
      event: "slot",
      name: "id",
      value: data.id,
    },
    {
      event: "slot",
      name: "name",
      value: data.name,
    },
  ];

  await Promise.all(slots.map((slot) => chatbotApi.post(url, slot)));
}
