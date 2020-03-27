<template>
    <div class="shopcar-container">
        <div class="mui-card" v-for="item in goodslist" :key="item.id">
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <mt-switch v-model="$store.getters.getGoodsSelected[item.id]" @change="changeSeleted(item.id,$store.getters.getGoodsSelected[item.id])"></mt-switch>
                    <img :src="item.thumb_path" alt="">
                    <div class="info">
                        <h1>{{item.title}}</h1>
                        <p>
                            <span class="price"> ${{item.sell_price}}</span>
                            <numbox :initcount="$store.getters.getIdtoCount[item.id]" :goodsid="item.id"></numbox>
                            <a href="" class="" @click.prevent="remove(item.id,i)">删除</a>                          
                        </p>
                    </div>
                </div>
            </div>
        </div>
        <div class="mui-card">
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <div class="left">
                        <p>总计(不包含运费)</p>
                        <p>已勾选商品 {{$store.getters.getGoodsCountAndAmount.count}} 件，总价<span class="price"> ￥ {{$store.getters.getGoodsCountAndAmount.amount}}</span></p>
                    </div>
                    <mt-button size="normal" type="danger">去结算</mt-button>
                </div>
            </div>
        </div>
        
    </div>
</template>

<script>
import numbox from '../subscomponents/shop_numbox.vue'
export default {
    data() {
        return {
            goodslist:[]
        }
    },
    components:{
         numbox
    },
    methods: {
        getCarList(){
            var idArr = []
            this.$store.state.car.forEach(item=>{
                idArr.push(item.id)
            })
            //如果购物车没商品，不请求
            if(idArr.length<=0){
                return
            }
            this.$http.get('api/goods/getshopcarlist/'+idArr.join(',')).then( res =>{
                 if(res.body.status === 0){
                    this.goodslist = res.body.message
                }
            })
        },
        remove(id,i){
            //先删除goodlist中的数据
            this.goodslist.splice(i,1)
            //在删除store中的数据
            this.$store.commit("removeFromCar",id)
        },
        changeSeleted(id,val){
            
            this.$store.commit('updateGoodsSeleted',{'id':id,selected:val})
        }
    },  
    created() {
        this.getCarList()
    }, 
}
</script>

<style lang="scss" scoped>
.shopcar-container{
    .mui-card-content-inner{
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    img{
        width: 60px;
        height: 60px;
    }
    h1{
        font-size: 16px;
    }
    .price{
        color:red;
        font-size: 18px;
    }
    .info{
        p{
            display: flex;
        }
    }
}
</style>