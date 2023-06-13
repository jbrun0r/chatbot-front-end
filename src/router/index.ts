import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/chat",
    name: "chatBot",
    component: () => import("../components/pages/ChatBot/ChatBot.vue"),
    meta: { auth: false, blockAuthUser: true },
  },
  {
    path: "/:pathMatch(.*)*",
    component: () => import("../components/pages/ChatBot/ChatBot.vue"),
    meta: { auth: false, blockAuthUser: true },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
