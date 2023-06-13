<script setup lang="ts">
import { toRef, defineProps } from "vue";
import { useField } from "vee-validate";
import InputText from "primevue/inputtext";

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  label: {
    type: String,
  },
  type: {
    type: String,
    default: "text",
  },
  placeholder: {
    type: String,
  },
  id: {
    type: String,
  },
  disabled: {
    type: Boolean,
  },
  labelClass: {
    type: String,
  },
  maxLength: {
    type: String,
  },
});

const { errorMessage, value } = useField<string>(toRef(props, "name"));
</script>

<template>
  <div class="block">
    <label class="flex mb-2" :for="name" :class="labelClass">{{ label }}</label>
    <InputText
      :id="id"
      class="block w-full"
      v-model.trim="value"
      :aria-describedby="`${name}-help`"
      :class="{ 'p-invalid': errorMessage }"
      :type="type"
      :placeholder="placeholder"
      :disabled="disabled"
      :maxlength="maxLength"
    />
    <small :id="`${name}-help`" class="p-error text-xs">{{
      errorMessage
    }}</small>
  </div>
</template>

<style scoped lang="scss">
.p-inputtext {
  font-family: Roboto;
  height: 3.5rem;
  &:focus,
  &:active {
    border-color: var(--green-500x);
    box-shadow: 0 0 0 0.1rem var(--green-500x);
  }

  &:hover {
    border-color: var(--green-500x);
  }

  &:disabled {
    border: 1px solid #cccccc !important;
    background-color: #ececec;
    &:active {
      box-shadow: none;
    }
  }
}

.p-inputtext::placeholder {
  font-family: "Roboto";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  display: flex;
  align-items: center;
  color: #818181;
  flex: none;
  order: 0;
  flex-grow: 1;
}

.p-error {
  position: absolute;
  display: flex;
  text-align: left;
  margin-top: 0.25rem;
  font-family: Roboto;
}
</style>
