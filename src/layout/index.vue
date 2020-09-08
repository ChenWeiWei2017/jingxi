<template>
  <div>
    <main>
      <transition>
        <router-view />
      </transition>
    </main>
    <footer>
      <van-tabbar v-model="active" safe-area-inset-bottom route>
        <van-tabbar-item name="home" icon="home-o" to="/home">首页</van-tabbar-item>
        <van-tabbar-item name="type" icon="apps-o" to="/type">分类</van-tabbar-item>
        <van-tabbar-item name="shopping-cart" icon="shopping-cart-o" to="/shopping-cart">购物车</van-tabbar-item>
        <van-tabbar-item name="mine" icon="user-o" to="/mine">我的</van-tabbar-item>
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
      active: 'home',
      searchValue: ''
    }
  },
  methods: {

  }
}
</script>

<style lang="sass" scoped>

</style>
