<template>
  <div>
    <header>
      <van-nav-bar
        :fixed="true"
        :placeholder="true"
        @click-left="onClickLeft"
      >
        <template v-slot:left>
          登录
        </template>
        <template v-slot:title>
          搜索框
        </template>
        <template v-slot:right>
          扫一扫
        </template>
      </van-nav-bar>
    </header>
    <main>
      内容
    </main>
    <footer>
      <van-tabbar v-model="active" safe-area-inset-bottom>
        <van-tabbar-item name="home" icon="home-o">首页</van-tabbar-item>
        <van-tabbar-item name="search" icon="search">搜索</van-tabbar-item>
        <van-tabbar-item name="friends" icon="friends-o">我的</van-tabbar-item>
        <van-tabbar-item name="setting" icon="setting-o">设置</van-tabbar-item>
      </van-tabbar>
    </footer>
  </div>
</template>

<script>
import { NavBar, Tabbar, TabbarItem } from 'vant'

export default {
  name: 'Layout',
  components: {
    [NavBar.name]: NavBar,
    [Tabbar.name]: Tabbar,
    [TabbarItem.name]: TabbarItem
  },
  data() {
    return {
      active: 'home'
    }
  },
  methods: {
    onClickLeft() {
      this.$router.push({ name: 'login' })
    }
  }
}
</script>

<style lang="sass" scoped>

</style>
