import axios, { AxiosInstance } from 'axios';
import { boot } from 'quasar/wrappers';

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $axios: AxiosInstance;
  }
}

const api = axios.create({ baseURL: process.env.API_BASE_URL });

export default boot(({ app }) => {
  app.config.globalProperties.$api = api;
  app.config.globalProperties.$axios = axios;
});

export { api };
