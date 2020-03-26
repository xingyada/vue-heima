import VueRouter from 'vue-router'
import HomeContainer from './components/tabbar/HomeContainer.vue'
import MemberContainer from './components/tabbar/MemberContainer.vue'
import SearchContainer from './components/tabbar/SearchContainer.vue'
import ShopCarContainer from './components/tabbar/ShopCarContainer.vue'
import NewsList from './components/news/NewsList.vue'
import NewsInfo from './components/news/NewsInfo.vue'
import PhoteList from './components/photo/PhotoList.vue'
import PhoteInfo from './components/photo/PhotoInfo.vue'
import GoodsList from './components/goods/GoodsList.vue'
import GoodsInfo from './components/goods/GoodsInfo.vue'



 const router = new VueRouter({
    routes:[
       { path: '/', redirect: '/home' },
       { path: '/home', component: HomeContainer },
       { path: '/member', component: MemberContainer },
       { path: '/search', component: SearchContainer },
       { path: '/car', component: ShopCarContainer },
       { path: '/home/newslist', component: NewsList },
       { path: '/home/newsinfo/:id', component: NewsInfo },
       {path:'/home/photolist',component:PhoteList},
       { path: '/home/photoinfo/:id', component: PhoteInfo },
      {path :'/home/goodslist',component:GoodsList},
       { path: '/home/goodsinfo/:id', component: GoodsInfo }
    ],
    linkExactActiveClass:'mui-active'
})

export default router