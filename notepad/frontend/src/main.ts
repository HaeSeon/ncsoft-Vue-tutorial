import { createApp } from 'vue'
import { router } from './router'
import App from '@/App.vue'

export const serverUrl = `http://${location.hostname}:3001`;


createApp(App).use(router).mount('#app')