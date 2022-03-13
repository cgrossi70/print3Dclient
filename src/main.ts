import Vue from 'vue'
import App from './App.vue'
import i18n from '@/plugins/i18n'
import router from './router' 
import store from './store/index'
import vuetify from './plugins/vuetify'
import { WebSocketPlugin } from './plugins/WebSocket'

//vue-echarts-ts
import { plugin } from 'echarts-for-vue';
import * as echarts from 'echarts';
import 'echarts/lib/chart/line';
import 'echarts/lib/chart/bar';
import 'echarts/lib/component/title';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/legend';

//Vue.config.devtools = true;
Vue.use(plugin, { echarts });


Vue.use(WebSocketPlugin,{ store: store })

new Vue({
  i18n,
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
