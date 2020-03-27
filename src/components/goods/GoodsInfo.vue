<template>
    <div class="goods-info">
        <transition
            @before-enter="beforeEnter"
            @enter="enter"
            @after-enter="afterEnter"
        >
            <div class="ball" v-show="ballFlag" ref="ball"></div>       
        </transition>
        <!-- lunbo -->
        <div class="mui-card">
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <swiper :list="lunboList" :isfull="false"></swiper>
                </div>
            </div>
        </div>
        <!-- goumai  -->
        <div class="mui-card">
            <div class="mui-card-header">{{goodsList.title}}</div>
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <p class="price">{{goodsList.market_price}}</p>
                    <p>购买数量:<goodsinfo-numbox @getNumVal="getNumValFromBox"></goodsinfo-numbox></p>
                    
                    <p class="add-car">
                        <mt-button type="primary" size="small">立即购买</mt-button>
                        <mt-button type="danger" size="small" @click="addToCar">加入购物车</mt-button>
                    </p>
                </div>
            </div>
            
        </div>
        <!-- shanpin canshu -->
        <div class="mui-card">
            <div class="mui-card-header">商品参数</div>
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <p>商品货号:{{goodsList.goods_no}}</p>
                    <p>上架时间：{{goodsList.add_time}}</p>
                    <p>剩余库存:{{goodsList.stock_quantity}}</p>
                </div>
            </div>
            <mt-button type="primary" size="large">图文介绍</mt-button>
            <mt-button type="danger" size="large">商品评论</mt-button>
        </div>
    </div>
</template>

<script>
import swiper from '../subscomponents/swiper.vue'
import goodsinfoNumbox from '../subscomponents/goodsinfo_numbox.vue'
export default {
    data() {
        return {
            id:this.$route.params.id,
            lunboList:[],
            goodsList:{},
            ballFlag:false,
            boxNum:1
        }
    },
    components:{
        swiper,
        goodsinfoNumbox
    },
    methods: {
        getLunbo(){
            this.$http.get('api/getthumimages/'+this.id).then( res => {
                if(res.body.status === 0){
                    res.body.message.forEach(element => {
                        element.img = element.src
                    });
                    this.lunboList = res.body.message
                }
            })
        },
        getGoodInfo(){
            this.$http.get('api/goods/getinfo/'+this.id).then( res =>{
                if(res.body.status === 0){
                    this.goodsList = res.body.message[0]
                }
            })
        },
        addToCar(){
            this.ballFlag = !this.ballFlag
            //拼接成一个要保存到 vuex 中的数组
            var goodsinfo = {
                id:this.id,
                count:this.boxNum,
                price:this.goodsList.market_price,
                selected:true
            }
            this.$store.commit('addToCar',goodsinfo)
        },
        beforeEnter(el){
            el.style.transform ="translate(0,0)"
 
        },
        enter(el,done){
            el.offsetWidth
            const ballPostition = this.$refs.ball.getBoundingClientRect()
            const endPosition = document.querySelector('#badge').getBoundingClientRect()
            const xDist = endPosition.left-ballPostition.left
            const yDist = endPosition.top-ballPostition.top
            el.style.transform =`translate(${xDist}px,${yDist}px)`
            el.style.transition = 'all 0.5s cubic-bezier(.4,-0.3,1,.68)'
            done()
        },
        afterEnter(){
            this.ballFlag = false
        },
        getNumValFromBox(d){ //子组件要要调用
            this.boxNum = d
        }

    },
    created() {
        this.getLunbo(),
        this.getGoodInfo()
    },
};
</script>

<style lang="scss" scoped>
.goods-info{
    background-color: #eee;
    .mint-swipe-item{
        height: auto;
    }
    .add-car{
        display: flex;
        justify-content: space-between;
    }
    .ball{
        width: 15px;
        height: 15px;
        background: red;
        border-radius:50% ;
        position: absolute;
        z-index: 999;
        top: 430px;
        left: 76px;
        
    }
}

</style>