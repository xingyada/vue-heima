<template>
    <div class="goods-list">
        <div class="goods-item" v-for="item in goodslist" :key="item.id" @click="goToGoodsInfo(item.id)"> 
            <div>
                <img :src="item.img_url" alt />
            </div>
            <h1>{{item.title}}</h1>
            <div class="info">
                <p class="price">
                    <span class="now">{{item.sell_price}}</span>
                    <span class="old">{{item.market_price}}</span>
                </p>
                <p class="sell">
                    <span>热卖中</span>
                    <span>剩{{item.stock_quantity}}件</span>
                </p>
            </div>
        </div>
    <mt-button type="danger" size="large" @click="getMore">加载更多</mt-button>
    </div>
</template>

<script>
export default {
    data() {
        return {
           pageIndex:1 ,
           goodslist:[]
        }
    },
    created() {
        this.getGoodsList()
    },
    methods: {
        getGoodsList(){
            this.$http.get('api/getgoods?pageindex='+this.pageIndex).then(function(res){
                if(res.body.status == 0){
                    this.goodslist =  this.goodslist.concat(res.body.message)
                }
            })
        },
        getMore(){
            this.pageIndex++
            this.getGoodsList()
        },
        goToGoodsInfo(id){
            this.$router.push( "/home/goodsinfo/"+id )
        }
    },
};
</script>

<style lang="scss" scoped>
.goods-list {
    display: flex;
    flex-wrap: wrap;
    padding: 7px;
    justify-content: space-between;
    .goods-item{
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        width: 49%;
        border: 2px solid #ccc;
        box-shadow:0 0 2px #000;
        margin: 3px 0;
        img{
            width: 100%;
        }
        h1{
            font-size: 14px;
        }
        .info{
            background-color:linen;
            .sell{
                display: flex;
                justify-content: space-between;
            }
        }
        .now{
            color: red;
        }

    }
}
</style>