<template>
    <div class="cmt-container">
        <h3>发表评论</h3>
        <textarea placeholder="请发表评论" v-model="pushmsg"></textarea>

        <mt-button type="primary" size="large" @click="pushComment">发表评论</mt-button>

        <div class="cmt-list">
            <div v-for="(item,i) in comments" :key="i" class="cmt-list-ctx">
                <div class="subtitle">
                    <div class="cmt-title">第{{i}}楼：用户:{{item.user_name}}</div>
                    <div class="cmt-time">发表时间：{{item.add_time | dateFormat}}</div>
                </div>

                <div class="cmt-body">{{item.content}}</div>
                <br />
            </div>
        </div>
        <mt-button type="primary" size="large" plain @click="getMore">加载更多</mt-button>
    </div>
</template>


<script>
import { Toast } from "mint-ui";
export default {
    data() {
        return {
            pageIndex: 1,
            comments: [],
            pushmsg: ""
        };
    },
    props: ["id"],
    created() {
        this.getComments();
    },
    methods: {
        getComments() {
            this.$http
                .get(
                    "api/getcomments/" +
                        this.id +
                        "?pageindex=" +
                        this.pageIndex
                )
                .then(res => {
                    if (res.body.status === 0) {
                        this.comments = this.comments.concat(res.body.message);
                    }
                });
        },
        getMore() {
            this.pageIndex++;
            this.getComments();
        },
        pushComment() {
            if(this.pushmsg.trim().length == 0){
                Toast('评论不能为空')
                return
            }
            this.$http
                .post(
                    "api/postcomment/" + this.$route.params.id,
                    { content: this.pushmsg.trim() },
                    { emulateJSON: true }
                )
                .then(res => {
                    if (res.body.status === 0) {
                        Toast("评论发表成功");
                        var ctxobj = {
                            user_name:'匿名用户'
                            ,add_time:Date.now(),
                            content:this.pushmsg
                        }
                        this.comments.unshift(ctxobj);
                        this.pushmsg =''
                    }
                });
        }
    }
};
</script>



<style lang="scss" soped>
.cmt-container {
    h3 {
        font-size: 18px;
    }
    .cmt-list {
        font-size: 12px;
        .cmt-list-ctx {
            .subtitle {
                overflow: hidden;
                background-color: burlywood;
                .cmt-title {
                    float: left;
                }
                .cmt-time {
                    float: right;
                }
            }
        }
        .cmt-body {
            font-size: 18px;
        }
    }
}
</style>