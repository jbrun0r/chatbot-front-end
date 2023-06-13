<script lang="ts" setup>
import { ref, toRef, defineProps, watch } from "vue";
import Dialog from "primevue/dialog";
import InputTextWithValidation from "@/components/molecules/InputTextWithValidation/InputTextWithValidation.vue";
import MessageChat from "@/components/atoms/MessageChat/MessageChat.vue";
import Loading from "@/components/atoms/LoadingMessage/LoadingMessage.vue";
import {
  postMessage,
  PostMessage,
  ResponseChatBot,
} from "@/services/chatbot/message/post-message";
import { setSlots, SetSlots } from "@/services/chatbot/slots/set-slots";
import { resetSlots } from "@/services/chatbot/slots/reset-slots";
import { getTokenFromStorage } from "@/services/http/api";
import { useForm } from "vee-validate";
import * as yup from "yup";
import { useMessageStore, Message } from "@/store/chat/messages";

const props = defineProps({
  isVisible: { type: Boolean, required: true, default: false },
  id: { type: String, required: true },
  name: { type: String, required: true },
});
const isVisibleRef = toRef(props, "isVisible");

const isLoading = ref(true);
const messageStore = useMessageStore();
const messages = ref(messageStore.getMessages());

watch(
  () => messageStore.getMessages(),
  (newMessages) => {
    messages.value = newMessages;
  }
);

const addMessage = (message: Message) => messageStore.addMessage(message);
const clearMessages = () => messageStore.clearMessages();

function currentTime() {
  return (
    new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) +
    ""
  );
}

function processResponseMessages(data: ResponseChatBot[]) {
  for (const item of data) {
    const paramName = Object.keys(item).find((key) => key !== "recipient_id");
    if (paramName) {
      const paramValue = item[paramName];

      const msg = {
        type: paramName,
        value: paramValue,
        time: currentTime(),
        green: false,
      };
      addMessage(msg);
    }
  }
}

const schema = yup.object({
  message: yup.string().max(255, "Máximo de 255 caracteres").required(" "),
});

const { handleSubmit, setValues } = useForm({
  initialValues: {
    message: "",
  },
  validationSchema: schema,
});

const onSubmit = handleSubmit(async (values) => {
  try {
    const data: PostMessage = {
      message: values.message,
      sender: getTokenFromStorage(),
    };

    const msg: Message = {
      type: "text",
      value: values.message,
      time: currentTime(),
      green: true,
    };

    addMessage(msg);
    setValues({ message: "" });
    isLoading.value = true;
    const response: ResponseChatBot[] = await postMessage(data);

    setTimeout(() => {
      processResponseMessages(response);
      isLoading.value = false;
    }, 2000);
  } catch (error) {
    console.error;
  }
});

const onDialogShow = async () => {
  try {
    isLoading.value = true;
    const slots: SetSlots = {
      sender: getTokenFromStorage(),
      id: props.id,
      name: props.name,
    };

    await setSlots(slots);

    const data: PostMessage = {
      message: "/start-conversation",
      sender: getTokenFromStorage(),
    };

    const response: ResponseChatBot[] = await postMessage(data);

    processResponseMessages(response);
    isLoading.value = false;
  } catch (error) {
    console.error;
  }
};

const onDialogBeforeHide = async () => {
  try {
    clearMessages();
    messages.value = [];
    await resetSlots(getTokenFromStorage());
  } catch (error) {
    console.error;
  }
};
</script>

<template>
  <Dialog
    :visible="isVisibleRef"
    modal
    dismissableMask
    :style="{ width: '500px' }"
    @update:visible="() => (isVisibleRef = false)"
    @show="onDialogShow"
    @hide="onDialogBeforeHide"
  >
    <template #header>
      <div class="flex">
        <div
          class="flex rounded-full justify-center items-center h-12 w-12 bg-zinc-200"
        >
          <vue-feather type="message-square"></vue-feather>
        </div>
        <div class="ml-4">
          <h2 class="font-semibold">ChatBot</h2>
          <div class="flex items-center">
            <div class="rounded-full h-1.5 w-1.5 bg-green-400"></div>
            <h5 class="ml-1 text-xs font-light">Online</h5>
          </div>
        </div>
      </div>
    </template>
    <template #default>
      <div
        class="flex justify-end flex-col overflow-y-auto"
        style="height: 500px"
      >
        <MessageChat
          v-for="(message, indice) in messages"
          v-bind:key="indice"
          :type="message.type"
          :value="message.value"
          :time="message.time"
          :green="message.green"
        />
        <Loading v-show="isLoading" />
      </div>
    </template>
    <template #footer>
      <div class="flex">
        <InputTextWithValidation
          v-on:keyup.enter="onSubmit"
          name="message"
          :placeholder="'Enviar mensagem.'"
          style="width: 95%"
        />
        <div class="flex justify-center items-center cursor-pointer">
          <vue-feather
            @click="onSubmit"
            type="send"
            class="send flex"
          ></vue-feather>
        </div>
      </div>
    </template>
  </Dialog>
</template>

<style lang="scss" scoped>
:global(.p-dialog) {
  border: solid #fff;
  box-shadow: 2px 4px 10px rgba(163, 163, 163, 0.25);
  border-radius: 16px;
}

:global(.p-dialog .p-dialog-header) {
  background: #fff;
  padding: 1.5rem 1.5rem 1rem 1.5rem;
}

:global(.p-dialog .p-dialog-header .p-dialog-header-icon:focus) {
  box-shadow: none;
}

:global(.p-dialog .p-dialog-content) {
  background: #f5f5f5;
  color: #495057;
  padding: 0 1.5rem 1rem 1.5rem;
}

:global(.p-dialog .p-dialog-footer) {
  background: #fff;
  padding: 0 1.5rem 0.2rem 1rem;
  text-align: right;
}

:global(.p-inputtext) {
  border: none;
}

:global(.p-inputtext:hover) {
  border: none;
}

:global(.p-inputtext:focus) {
  border-color: none !important;
  box-shadow: none !important;
}

:global(.p-inputtext:active) {
  border-color: none !important;
  box-shadow: none !important;
}

:global(.p-button) {
  padding: none !important  ;
}

.send {
  background-color: white;
  color: black;
  transition: all 0.9s;

  &:focus,
  &:active {
    color: rgb(74 222 128);
  }

  &:hover {
    color: rgb(74 222 128);
  }
}
</style>
