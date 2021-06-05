import { createWebHistory, createRouter } from "vue-router";
import NewsFeedList from "@/components/NewsFeedList.vue";
import Edit from "@/components/Edit.vue";
import New from "@/components/New.vue";

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
  {
    path: "/new",
    name: "New",
    component: New,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
