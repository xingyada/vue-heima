import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResouce from 'vue-resource'
import App from './App.vue'
Vue.config.productionTip = false


import "mint-ui/lib/style.css";
import './lib/mui/css/mui.min.css'
import router from './router.js'

/* 预览图组件 */
import VuePreview from 'vue-preview';
Vue.use(VuePreview);




Vue.use(VueRouter)
Vue.use(VueResouce)

//按需导入组件
import { Header, Swipe, SwipeItem, Button,LazyLoad} from "mint-ui";

Vue.component(Swipe.name, Swipe)
Vue.component(SwipeItem.name, SwipeItem)
Vue.component(Header.name,Header)
Vue.component(Button.name, Button)
Vue.use(LazyLoad)



Vue.http.options.root = 'http://www.liulongbin.top:3005'
Vue.http.options.emulateJSON = true
//全局过滤器
import moment from 'moment'
Vue.filter('dateFormat',function(dataStr,patten="YYYY-MM-DD HH:mm:ss"){
  return moment(dataStr).format(patten)
})

new Vue({
  render: h => h(App),
  router,
}).$mount('#app')
