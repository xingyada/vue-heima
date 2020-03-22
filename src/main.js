import Vue from 'vue'

import { Header } from "mint-ui";
import "mint-ui/lib/style.css";
import App from './App.vue'
import './lib/mui/css/mui.min.css'

Vue.config.productionTip = false
Vue.component(Header.name,Header)




new Vue({
  render: h => h(App),
}).$mount('#app')
