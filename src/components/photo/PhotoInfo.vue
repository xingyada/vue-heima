<template>
    <div>
        <h4>{{photoInfo.title}}</h4>
        <div class="subtitle">
            <span>{{photoInfo.add_time | dateFormat}}</span>
            <p>
                点击次数：<span>{{photoInfo.click}}</span>
            </p>
        </div>
        <div class="thumbs">
            <vue-preview :slides="thumbsList" class="imgPrev"></vue-preview>
        </div>
        <div class="content">{{photoInfo.content}}</div>

        <cmt-box :id="id"></cmt-box>
    </div>
</template>


<script>
import comment from '../subscomponents/comment.vue'
export default {
    data() {
        return {
            id: this.$route.params.id,
            photoInfo: {},
            thumbsList:[]

        };
    },
    components:{
        'cmt-box':comment
    },
    methods: {
        getPhotoInfo() {
            this.$http.get("api/getimageinfo/" + this.id).then(res => {
                if (res.body.status === 0) {
                    this.photoInfo = res.body.message[0];
                }
            });
        },
        getThumbImage(){
            this.$http.get("api/getthumimages/"+this.id).then( res => {
                if(res.body.status === 0){
                    res.body.message.forEach((item)=>{
                        item.w =600,
                        item.h = 400,
                        item.msrc = item.src
                    })
                    this.thumbsList = res.body.message
                }
            })
        }
    },
    created() {
        this.getPhotoInfo();
        this.getThumbImage()
    }
};
</script>


<style lang="scss" scoped>
.subtitle{
    display:flex;
    justify-content :space-between;
}
.content{
    font-size: 18px;
    line-height: 25px;
}

</style>