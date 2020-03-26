<template>
    <div>
        <div class="newsinfo-container">
            <h3 class="title">{{item.title}}</h3>
            <p class="subtitle">
                <span>发表时间 {{item.add_time | dateFormat}}</span>
                <span>点击：{{item.click}}次</span>
            </p>
        </div>

        <div class="content" v-html="item.content"></div>
        <comment :id="id"></comment>
    </div>
</template>

<script>
import {Toast} from 'mint-ui'
import comment from '../subscomponents/comment.vue'
export default {
    data() {
        return {
            id:this.$route.params.id,
            item:{}
        }
    },
    components:{
        comment
    },
    created() {
        this.getNewsInfo()
    },
    methods: {
        getNewsInfo(){
            this.$http.get('api/getnew/'+this.id).then( res=>{
                 if(res.body.status === 0){
                    this.item = res.body.message[0]
                   
                 }else{
                     Toast('获取失败')
                 }
            }
               
            )
        }
    },
}
</script>



<style lang="scss" scoped>
    
</style>