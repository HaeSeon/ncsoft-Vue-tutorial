import { createApp } from 'vue'
import Router from './router'
import App from '@/App.vue'

export const serverUrl = `http://${location.hostname}:3000/users`;


fetch(`${serverUrl}`)
  .then(res => res.json())
  .then(res => {

    console.log(`${res.users[0].id} 님 환영합니다`, res);

  });

createApp(App).use(Router).mount('#app')