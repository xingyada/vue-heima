<template>
    <div class="goods-info">
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
                    <p>购买数量:<goodsinfo-numbox></goodsinfo-numbox></p>
                    
                    <p class="">
                        <mt-button type="primary" size="small">立即购买</mt-button>
                        <mt-button type="danger" size="small">加入购物车</mt-button>
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
            goodsList:{}
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
}

</style>