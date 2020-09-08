<template>
  <div>
    <van-nav-bar
      :fixed="true"
      :placeholder="true"
      @click-left="onClickLeft"
    >
      <template v-slot:left>
        <van-icon name="user-circle-o" color="#2f373df2" size=".7rem" />
      </template>
      <template v-slot:title>
        首页
      </template>
      <template v-slot:right>
        <van-icon name="chat-o" size=".7rem" dot color="#07c160" />
      </template>
    </van-nav-bar>
    <div class="container">
      <van-swipe class="img-swipe" :autoplay="3000" indicator-color="white">
        <van-swipe-item>1</van-swipe-item>
        <van-swipe-item>2</van-swipe-item>
        <van-swipe-item>3</van-swipe-item>
        <van-swipe-item>4</van-swipe-item>
      </van-swipe>
      <van-swipe class="type-swipe" indicator-color="white">
        <van-swipe-item>
          <van-grid square :gutter="10">
            <van-grid-item v-for="value in 8" :key="value" icon="photo-o" text="文字" />
          </van-grid>
        </van-swipe-item>
        <van-swipe-item>
          <van-grid square :gutter="10">
            <van-grid-item v-for="value in 8" :key="value" icon="photo-o" text="文字" />
          </van-grid>
        </van-swipe-item>
      </van-swipe>
    </div>
  </div>
</template>

<script>
import { NavBar, Icon, Search, Swipe, SwipeItem, Grid, GridItem } from 'vant'

export default {
  name: 'Home',
  components: {
    [NavBar.name]: NavBar,
    [Icon.name]: Icon,
    [Search.name]: Search,
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem,
    [Grid.name]: Grid,
    [GridItem.name]: GridItem
  },
  data() {
    return {

    }
  },
  methods: {
    onClickLeft() {
      this.$router.push({ name: 'login' })
    }
  }
}
</script>

<style lang="scss" scoped>
  .van-swipe  {
    margin-top: 10px;

    &.img-swipe {
      .van-swipe-item {
        color: #fff;
        font-size: 20px;
        line-height: 150px;
        text-align: center;
        background-color: #39a9ed;
      }
    }

    &.type-swip {
      .van-swipe__indicators {
        bottom: 0;
      }
    }
  }
</style>

<style lang="scss">
  .van-swipe {
    &.type-swipe {
      .van-swipe__indicators {
          bottom: 0;
        }
    }
  }
</style>
