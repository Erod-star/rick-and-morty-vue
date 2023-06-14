import './assets/main.css';

import { createApp } from 'vue';
import { VueQueryPlugin } from '@tanstack/vue-query';

import App from './App.vue';
import router from './router';

import '@/store/characters.store';

const app = createApp(App);

// app.use(VueQueryPlugin);
VueQueryPlugin.install(app, {
  queryClientConfig: {
    defaultOptions: {
      queries: {
        cacheTime: 1000 * 120,
        refetchOnReconnect: 'always'
      }
    }
  }
});

app.use(router);

app.mount('#app');
