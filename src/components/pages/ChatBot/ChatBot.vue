<script lang="ts" setup>
import { ref } from "vue";
import ChatDialog from "@/components/organisms/ChatDialog/ChatDialog.vue";

const showChatDialog = ref(false);
</script>

<template>
  <div
    class="h-[calc(106vh-66px)] flex flex-col align-middle flex-wrap content-center justify-center"
  >
    <div
      @click="() => (showChatDialog = true)"
      class="chat-icon flex rounded-full justify-center items-center cursor-pointer w-12 h-12 bg-zinc-200"
    >
      <vue-feather type="message-square"></vue-feather>
    </div>
    <ChatDialog
      :is-visible="showChatDialog"
      :id="'1'"
      :name="'João'"
      @update:visible="() => (showChatDialog = false)"
    />
  </div>
</template>
