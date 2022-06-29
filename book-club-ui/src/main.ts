import { createApp } from "vue";
import { createPinia } from "pinia";
import axios  from "axios";
import VueAxios from 'vue-axios'

import App from "./App.vue";
import router from "./router";

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* import specific icons */
import { faLock } from '@fortawesome/free-solid-svg-icons'

library.add(faLock);
const app = createApp(App).component('font-awesome-icon',FontAwesomeIcon);

app.use(createPinia());
app.use(router);
app.use(VueAxios, axios);

app.mount("#app");