import {createRouter, createWebHashHistory} from "vue-router";
import MainPageView from "../views/MainPageView.vue";
import BookView from "../views/BookView.vue";
import UserView from "../views/UserView.vue";
import UsersView from "../views/UsersView.vue";
import RegisterView from "../views/RegisterView.vue";
import LoginView from "../views/LoginView.vue";

import {Vue} from "vue-class-component";
import {userStore} from "@/stores/user-store";

Vue.registerHooks(['beforeRouteEnter',
  'beforeRouteLeave',
  'beforeRouteUpdate']);

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "books",
      component: MainPageView,
      beforeEnter: (to, from, next) => {
        const store = userStore();
        if (!store.hasSession()) {
          next('/login')
        } else {
          next();
        }
      }
    },
    {
      path: "/book",
      name: "book",
      component: BookView,
      beforeEnter: (to, from, next) => {
        const store = userStore();
        if (!store.hasSession()) {
          next('/login')
        } else {
          next();
        }
      }
    },
    {
      path: "/register",
      name: "register",
      component: RegisterView
    },
    {
      path: "/user",
      name: "user",
      component: UserView,
      beforeEnter: (to, from, next) => {
        const store = userStore();
        if (!store.hasSession()) {
          next('/login')
        } else {
          next();
        }
      }
    },
    {
      path: "/users",
      name: "users",
      component: UsersView,
      beforeEnter: (to, from, next) => {
        const store = userStore();
        if (!store.hasSession()) {
          next('/login')
        } else {
          next();
        }
      }
    },
    {
      path: "/login",
      name: "login",
      component: LoginView,
    }
  ],
});
export default router;
