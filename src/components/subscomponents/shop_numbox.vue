<template>
    <div>
        <div class="mui-numbox" data-numbox-min="1" data-numbox-max="9" style="height:25px">
            <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
            <input id="test" class="mui-input-numbox" type="number" :value="initcount"  @change="changeCount"  ref="numbox" />
            <button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
        </div>
    </div>
</template>

<script>
import mui from "../../lib/mui/js/mui.js";

export default {
    data() {
        return {
            id:this.goodsid
        }
    },
    props:["initcount","goodsid"],
    mounted() {
        mui('.mui-numbox').numbox()
    },
    methods: {
       changeCount(){          
           const num =this.$refs.numbox.value
           this.$store.commit('updataeGoodsInfo',{id:this.id,count:num})
       }
    },
};
</script>

<style lang="scss" scoped>
</style>