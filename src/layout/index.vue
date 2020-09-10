<template>
  <div>
    <main>
      <transition :name="transitionName">
        <router-view class="router" />
      </transition>
    </main>
    <footer>
      <van-tabbar
        v-model="active"
        safe-area-inset-bottom
        route
        :fixed="true"
      >
        <van-tabbar-item icon="home-o" to="/home">首页</van-tabbar-item>
        <van-tabbar-item icon="apps-o" to="/type">分类</van-tabbar-item>
        <van-tabbar-item icon="shopping-cart-o" to="/shopping-cart">购物车</van-tabbar-item>
        <van-tabbar-item icon="user-o" to="/mine">我的</van-tabbar-item>
      </van-tabbar>
    </footer>
  </div>
</template>

<script>
import { Tabbar, TabbarItem } from 'vant'

export default {
  name: 'Layout',
  components: {
    [Tabbar.name]: Tabbar,
    [TabbarItem.name]: TabbarItem
  },
  data() {
    return {
      transitionName: '',
      active: 0,
      searchValue: ''
    }
  },
  watch: {
    active: {
      handler(newVal, oldVal) {
        if (newVal > oldVal) {
          this.transitionName = 'slide-left'
        } else {
          this.transitionName = 'slide-right'
        }
      }
    }
  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>
  .router {
    position: absolute;
    width: 100%;
    transition: all 0.8s ease;
  }

  .slide-left-enter, .slide-right-leave-active {
    opacity: 0;
    -webkit-transform: translate(100%, 0);
    transform: translate(100%, 0);
  }

  .slide-left-leave-active, .slide-right-enter {
    opacity: 0;
    -webkit-transform: translate(-100%, 0);
    transform: translate(-100%, 0);
  }
</style>
