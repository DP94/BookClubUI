import {createRouter, createWebHashHistory} from "vue-router";
import MainPageView from "../views/MainPageView.vue";
import BookView from "../views/BookView.vue";
import RegisterView from "../views/RegisterView.vue";

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
    },
    {
      path: "/register",
      name: "register",
      component: RegisterView
    }
  ],
});

export default router;
