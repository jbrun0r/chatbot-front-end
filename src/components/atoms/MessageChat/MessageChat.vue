<script setup lang="ts">
import { defineProps } from "vue";

const props = defineProps({
  type: { type: String, required: true },
  value: { type: String, required: true },
  time: { type: String, required: true },
  green: { type: Boolean, required: true },
});
</script>

<template>
  <div class="slot-message" v-bind:class="{ green: props.green }">
    <template v-if="props.type === 'image'">
      <img :src="props.value" alt="Imagem" style="border-radius: 5px" />
    </template>
    <template v-else>
      {{ props.value }}
    </template>
    <span>{{ props.time }}</span>
  </div>
</template>

<style scoped>
.green {
  background: rgb(228 228 231) !important;
  align-self: flex-end;
}

.slot-message {
  font-size: 14px;
  box-shadow: rgba(0, 0, 0, 0.13) 0px 1px 0.5px 0px;
  background: white;
  margin: 15px 0 0 0;
  padding: 5px 10px;
  border-radius: 8px;
  width: fit-content;
  max-width: 60%;
  overflow-wrap: break-word;
}

.slot-message span {
  margin-left: 10px;
  font-size: 12px;
  color: gray;
}
</style>
