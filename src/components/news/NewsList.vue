<template>
    <div>
        <ul class="mui-table-view">
				<li class="mui-table-view-cell mui-media" v-for="item in list" :key="item.id">
					<router-link :to="'/home/newsinfo/'+item.id">
						<img class="mui-media-object mui-pull-left" :src="item.img_url">
						<div class="mui-media-body">
							<h1 v-html="item.title"></h1>
							<p class="mui-ellipsis">
								<span >发表时间：{{item.add_time | dateFormat}}</span>
								<span>点击：{{item.click}}</span>
							</p>
						</div>
					</router-link>
				</li>
			</ul>
    </div>
</template>

<script>
import {Toast} from 'mint-ui'
export default {
    data() {
        return {
            list:[1,2,3,4,5,6,7,8,9,0]
        }
    },
	created() {
		this.getNewsList()
	},
	methods: {
		getNewsList(){
			this.$http.get('api/getnewslist').then( res => {
				if(res.body.status === 0){
					window.console.log(res.body)
					this.list = res.body.message
				}else{
					Toast('数据获取失败')
				}
			})
		}
	},
}
</script>	

<style lang="scss" scoped>
    .mui-table-view{
		li{
			h1{
				font-size:16px;
			}
			.mui-ellipsis{
				font-size:12px;
				color: blue;
			}
		}
	}
</style>