import { createApp } from 'vue'
import App from './App.vue'
import router from './router' // Import the router
import '@picocss/pico' // Import Pico CSS
import ElementPlus from 'element-plus' // Import Element Plus
import 'element-plus/dist/index.css' // Import Element Plus CSS
import 'element-plus/theme-chalk/dark/css-vars.css'
import './assets/main.css' // Import your main CSS file
import localeEs from 'element-plus/es/locale/lang/es'

const app = createApp(App)
app.use(router) // Si estás usando Vue Router
app.use(ElementPlus, {
    locale: localeEs // Cambia el idioma a español
}) // Si estás usando Element Plus
app.mount('#app')
