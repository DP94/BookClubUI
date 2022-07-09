import {createRouter, createWebHashHistory, createWebHistory} from "vue-router";
import MainPageView from "../views/MainPageView.vue";
import BookView from "../views/BookView.vue";

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: MainPageView,
    },
    {
      path: "/book",
      name: "book",
      component: BookView
    }
  ],
});

export default router;
