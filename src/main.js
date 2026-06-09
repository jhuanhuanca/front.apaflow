import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { createHead } from '@unhead/vue/client';
import App from './App.vue';
import router from './router';
import { useClientConfigStore } from '@/stores/clientConfig';
import { useAuthStore } from '@/stores/auth';
import { useLocaleStore } from '@/stores/locale';
import './style/main.scss';

const app = createApp(App);
const pinia = createPinia();
const head = createHead();

app.use(pinia);
app.use(router);
app.use(head);

const localeStore = useLocaleStore(pinia);
localeStore.setLocale(localeStore.locale);

const clientConfig = useClientConfigStore(pinia);
const auth = useAuthStore(pinia);

/** Config obligatoria antes de montar; sesión en paralelo sin bloquear la primera navegación. */
Promise.all([
  clientConfig.bootstrap(),
  auth.restoreSession(),
]).finally(() => {
  app.mount('#app');
});
