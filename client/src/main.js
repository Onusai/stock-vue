import { createApp } from 'vue'
import App from './App.vue'
import axios from 'axios';
//import VueCookies from 'vue-cookies';



const app = createApp(App)
app.mount('#app')


app.config.productionTip = false;
app.config.globalProperties.$http = axios;
//app.use(VueCookies);
