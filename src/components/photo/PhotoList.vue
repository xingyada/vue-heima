<template>
    <div>
        <div
            class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted"
        >
            <div class="mui-scroll">
                <a
                    :class="['mui-control-item',item.id == 0 ? 'mui-active' : '']"
                    v-for="item in cates"
                    :key="item.id"
                >{{item.title}}</a>
            </div>

            <!-- 图片列表区域 -->
            <ul class="img-list">
                <router-link tag="li"  :to="'/home/photoinfo/'+item.id" v-for="item in list" :key="item.id">
                    <img v-lazy="item.img_url" />
                </router-link>
            </ul>
        </div>
    </div>
</template>


<script>
import mui from "../../lib/mui/js/mui.js";

export default {
    data() {
        return {
            cates: [],
            list:[]
        };
    },
    methods: {
        getAllCategory() {
            this.$http.get("api/getimgcategory").then(res => {
                if (res.body.status === 0) {
                    res.body.message.unshift({ title: "全部", id: 0 });
                    this.cates = res.body.message;
                }
            });
        },
        getImgListByCateId(cateid){
              this.$http.get("api/getimages/"+cateid).then(res => {
                if (res.body.status === 0) {
                    this.list = res.body.message;
                }
            });
        }
    },
    created() {
        this.getAllCategory();
        this.getImgListByCateId(0)
    },
    mounted() {
        mui(".mui-scroll-wrapper").scroll({
            deceleration: 0.0005
        }); 
    }
};
</script>

<style lang="scss" scoped>
* {
    touch-action: pan-y;
}

img[lazy=loading] {
  width: 40px;
  height: 300px;
  margin: auto;
}
.img-list{
    
    padding-left: 0px;
    padding: 10px;
    padding-top: 25px;
    li{
        list-style: none;
        background-color: darkgrey;
        margin-bottom: 10px;
        img{
            width: 100%;
            vertical-align: middle;
        }
    }
}
</style>