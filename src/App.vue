<template>
  <div class="app-container">
    <mt-header fixed title="超人达达"></mt-header>
    <transition mode="out-in">
      <router-view></router-view>
    </transition>
    <div>
      <nav class="mui-bar mui-bar-tab">
        <router-link class="mui-tab-item-lib" to="/home">
          <span class="mui-icon mui-icon-home"></span>
          <span class="mui-tab-label">首页</span>
        </router-link>
        <router-link class="mui-tab-item-lib" to="/member">
          <span class="mui-icon mui-icon-email"
            ><span class="mui-badge">9</span></span
          >
          <span class="mui-tab-label">会员</span>
        </router-link>
        <router-link class="mui-tab-item-lib" to="/car">
          <span class="mui-icon mui-icon-contact"></span>
          <span class="mui-tab-label">购物车</span>
        </router-link>
        <router-link class="mui-tab-item-lib" to="/search">
          <span class="mui-icon mui-icon-gear"></span>
          <span class="mui-tab-label">搜索</span>
        </router-link>
      </nav>
    </div>
   
  </div>
</template>

<script></script>

<style scoped lang="scss">
.app-container {
  overflow-x: hidden;
  padding-top: 40px;
  padding-bottom:50px;
}

.v-enter {
  opacity: 0;
  transform: translate(100%);
}
.v-leave-to {
  opacity: 0;
  transform: translate(-100%);
}
.v-enter-active,
.v-leave-active {
  transition: all 0.2s ease;
}

.mui-bar-tab .mui-tab-item-lib{
      display: table-cell;
    overflow: hidden;
    width: 1%;
    height: 50px;
    text-align: center;
    vertical-align: middle;
    white-space: nowrap;
    text-overflow: ellipsis;
}
.mui-bar-tab .mui-tab-item-lib .mui-icon {
    top: 3px;
    width: 24px;
    height: 24px;
    padding-top: 0;
    padding-bottom: 0;
}

.mui-bar-tab .mui-tab-item-lib .mui-icon~.mui-tab-label {
    font-size: 11px;
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
}
</style>
