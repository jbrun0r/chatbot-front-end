import { defineStore } from "pinia";
import { ref } from "vue";

export interface Message {
  type: string;
  value: string;
  time: string;
  green: boolean;
}

export const useMessageStore = defineStore("messages", () => {
  const messages = ref<Message[]>([]);

  function addMessage(message: Message) {
    messages.value.push(message);
  }

  function clearMessages() {
    messages.value = [];
  }

  function getMessages(): Message[] {
    return messages.value;
  }

  return {
    messages,
    addMessage,
    clearMessages,
    getMessages,
  };
});
