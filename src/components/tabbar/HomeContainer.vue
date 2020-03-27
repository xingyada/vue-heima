<template>
    <div>
        <swiper :list="list" :isfull="true"></swiper>
        <div class="mui-content">
            <ul class="mui-table-view mui-grid-view mui-grid-9">
                <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                    <router-link to="/home/newsList">
                        <span class="mui-icon mui-icon-home"></span>
                        <div class="mui-media-body">新闻资讯</div>
                    </router-link>
                </li>
                <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                    <router-link to="/home/photolist">
                        <span class="mui-icon mui-icon-email"></span>
                        <div class="mui-media-body">图片分享</div>
                    </router-link>
                </li>
                <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                    <router-link to="/home/goodslist">
                        <span class="mui-icon mui-icon-chatbubble"></span>
                        <div class="mui-media-body">商品购买</div>
                    </router-link>
                </li>
                <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                    <a href="#">
                        <span class="mui-icon mui-icon-location"></span>
                        <div class="mui-media-body">留言反馈</div>
                    </a>
                </li>
                <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                    <a href="#">
                        <span class="mui-icon mui-icon-search"></span>
                        <div class="mui-media-body">视频专区</div>
                    </a>
                </li>
                <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                    <a href="#">
                        <span class="mui-icon mui-icon-phone"></span>
                        <div class="mui-media-body">联系我们</div>
                    </a>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import { Toast } from "mint-ui";
import swiper from "../subscomponents/swiper.vue";
export default {
    data() {
        return {
            list: []
        };
    },
    components: {
        swiper
    },
    created() {
        this.getLunbo();
    },
    methods: {
        getLunbo() {
            this.$http
                .get(
                    "https://www.fastmock.site/mock/8382a0a7b9ad1598995ec4ffac6c6227/api/api/getLunbo"
                )
                .then(result => {
                    if (result.body.status === 0) {
                        this.list = result.body.message;
                        Toast({
                            message: "欢迎访问",
                            position: "bottom",
                            duration: 1000
                        });
                    } else {
                        Toast("加载失败");
                    }
                });
        }
    }
};
</script>

<style lang="scss" scoped rel="style/scss">

</style>
