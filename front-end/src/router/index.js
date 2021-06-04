import { createWebHistory, createRouter } from "vue-router";
import NewsFeedList from "@/components/NewsFeedList.vue";
import Edit from "@/components/Edit.vue";

const routes = [
  {
    path: "/",
    name: "NewsFeedList",
    component: NewsFeedList,
  },
  {
    path: "/edit/:id",
    name: "Edit",
    component: Edit,
    props: true,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
