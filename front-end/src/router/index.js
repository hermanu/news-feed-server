import { createWebHistory, createRouter } from "vue-router";
import NewsFeedList from "@/components/NewsFeedList.vue";

const routes = [
  {
    path: "/",
    name: "NewsFeedList",
    component: NewsFeedList,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
