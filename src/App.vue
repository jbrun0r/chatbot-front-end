<script lang="ts" setup>
import "@/assets/tailwind.css";
import { usePrimeVue } from "primevue/config";
import { ptBr } from "./common/locale";

usePrimeVue().config.locale = ptBr;
</script>

<template>
  <router-view />
</template>
