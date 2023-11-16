import { createApp } from "vue";
import App from "./App.vue";
// 清除默认样式
import "@/styles/reset.scss";

// 使用svg的依赖
import "virtual:svg-icons-register";

// router
import router from "@/router/index";
// pinia
import { createPinia } from "pinia";

import "virtual:uno.css";

// Vuetify
import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

const vuetify = createVuetify({
	components,
	directives
});

const app = createApp(App);

app.use(router).use(createPinia()).use(vuetify);

router.isReady().then(() => app.mount("#app"));
