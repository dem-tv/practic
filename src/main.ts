import { createApp } from 'vue';

// eslint-disable-next-line import-x/no-unresolved
import 'virtual:svg-icons-register';
import '@vuepic/vue-datepicker/dist/main.css';
import '@/assets/styles/main.scss';

import App from '@/App.vue';
import { router } from '@/router';
import { pinia } from '@/stores';

const app = createApp(App);
app.use(router);
app.use(pinia);

app.mount('#app');
