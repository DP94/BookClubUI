import {Vue} from "vue-class-component";
import {createApp} from "vue";
import {createPinia} from "pinia";
import axios from "axios";
import VueAxios from 'vue-axios'

import App from "./App.vue";
import router from "./router";

import {plugin, defaultConfig} from "@formkit/vue";
import Notifications from '@kyvg/vue3-notification'

Vue.registerHooks(['beforeRouteEnter',
    'beforeRouteLeave',
    'beforeRouteUpdate']);

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(VueAxios, axios);
app.use(plugin, defaultConfig({theme: 'genesis'}));
app.use(Notifications);

app.mount("#app");