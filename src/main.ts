// src/main.ts
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "./assets/main.css";
import "@picocss/pico"; // Importación global de Pico.css

const app = createApp(App);
app.use(router);
app.mount("#app");
