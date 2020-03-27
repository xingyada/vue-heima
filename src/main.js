import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResouce from 'vue-resource'
import App from './App.vue'
Vue.config.productionTip = false


import "mint-ui/lib/style.css";
import './lib/mui/css/mui.min.css'



import router from './router.js'


import Vuex from 'vuex'
Vue.use(Vuex)
var car = JSON.parse(localStorage.getItem('car') || '[]')

var store = new Vuex.Store({
  state:{
    car: car,
     
  },
  mutations:{ 
    // 第一个参数是state
    addToCar(state,goodsinfo){
      //两种情况  一种是已存在  一种是没有
      var flag = false
      state.car.some( item=>{
        if (item.id == goodsinfo.id){
          item.count += parseInt(goodsinfo.count)
          flag = true
          return true
        }
      })
      //如果购物车未找到id 直接push
      if(!flag){
        state.car.push(goodsinfo)
      }
      localStorage.setItem('car',JSON.stringify(state.car))
    },
    //在购物车中修改数量
    updataeGoodsInfo(state, goodsinfo) {
      state.car.some(item => {
        if (item.id == goodsinfo.id) {
          item.count = parseInt(goodsinfo.count)
        }
      })
      //修改完之后 存储一下localStroge
      localStorage.setItem('car', JSON.stringify(state.car))
    },
    //删除购物车
    removeFromCar(state,id){
      state.car.some( (item,i) =>{
        if(item.id == id){
          state.car.splice(i,1)
          return 
        }
      })
      //放到本地存储
      localStorage.setItem('car', JSON.stringify(state.car))
    },
    //修改state中的selected属性
    updateGoodsSeleted(state,info){
      state.car.some(item =>{
        if(item.id == info.id){
          item.selected = info.selected
        }
      })
      localStorage.setItem('car', JSON.stringify(state.car))
    }
  },
  getters:{
    //getttes 相当于计算属性，
    //购物车的总数
    getAllCount(state){
      var c = 0
      state.car.forEach( item => {
        if(item.selected==true){
          c += item.count
        }
       
      })
      return c
    },
    //id到count的关系
    getIdtoCount(state){
      var o={}
      state.car.forEach( item =>{
        o[item.id]=item.count
      })
      return o
    },
    //获取开关状态，返回的是id:selected
    getGoodsSelected(state){
      var o={}
      state.car.forEach(item =>{
        o[item.id]=item.selected
      })
      return o
    },
    //获取商品最终数量
    getGoodsCountAndAmount(state){
      var o={
        count:0,
        amount:0
      }
      state.car.forEach( item =>{
        if(item.selected){
          o.count += item.count
          o.amount += item.price*item.count
        }
      })
      return o
    }
  }
})



/* 预览图组件 */
import VuePreview from 'vue-preview';
Vue.use(VuePreview);




Vue.use(VueRouter)
Vue.use(VueResouce)

//按需导入组件
import { Header, Swipe, SwipeItem, Button, LazyLoad, Switch } from "mint-ui";

Vue.component(Swipe.name, Swipe)
Vue.component(SwipeItem.name, SwipeItem)
Vue.component(Header.name,Header)
Vue.component(Button.name, Button)
Vue.component(Switch.name, Switch)
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
  store,
}).$mount('#app')
