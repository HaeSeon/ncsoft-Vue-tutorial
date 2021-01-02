import { createApp } from 'vue'
import { router } from './router'
import App from '@/App.vue'

// export const serverUrl = `http://${location.hostname}:3001/users`;


// fetch(`${serverUrl}`)
//   .then(res => res.json())
//   .then(res => {
//     console.log(`${res.users[0].id} 님 환영합니다`, res);
//   });

createApp(App).use(router).mount('#app')
// createApp(App).mount('#app')