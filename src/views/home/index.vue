<template>
  <div>
    <van-nav-bar
      :fixed="true"
      :placeholder="true"
      @click-left="onClickLeft"
    >
      <template v-slot:left>
        <!-- <van-icon name="user-circle-o" color="#2f373df2" size=".7rem" /> -->
        <template v-if="showUserInfo()">
          <van-image :src="userAvatar" :alt="username" round width=".8rem" />
        </template>
        <template v-else>
          登录
        </template>
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

        <van-swipe-item v-for="(banner, index) in banners" :key="index">
          <a :href="banner.url">
            <van-image lazy-load :src="banner.src" :alt="banner.title">
              <template v-slot:loading>
                <van-loading type="spinner" size="20" />
              </template>
            </van-image>
          </a>
        </van-swipe-item>
      </van-swipe>
      <van-swipe class="type-swipe" indicator-color="white">
        <van-swipe-item>
          <van-grid square :gutter="10">
            <van-grid-item v-for="value in 8" :key="value" icon="gift-o" text="分类一" />
          </van-grid>
        </van-swipe-item>
        <van-swipe-item>
          <van-grid square :gutter="10">
            <van-grid-item v-for="value in 8" :key="value" icon="point-gift-o" text="分类二" />
          </van-grid>
        </van-swipe-item>
      </van-swipe>
    </div>
  </div>
</template>

<script>
import { NavBar, Icon, Search, Swipe, SwipeItem, Grid, GridItem, Lazyload, Image as VanImage, Loading } from 'vant'
import { bannerList } from '@/api/home'
import { mapGetters } from 'vuex'
import { getToken } from '@/utils/auth'

export default {
  name: 'Home',
  components: {
    [NavBar.name]: NavBar,
    [Icon.name]: Icon,
    [Search.name]: Search,
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem,
    [Grid.name]: Grid,
    [GridItem.name]: GridItem,
    [Lazyload.name]: Lazyload,
    [VanImage.name]: VanImage,
    [Loading.name]: Loading
  },
  data() {
    return {
      banners: [],
      userInfo: null
    }
  },
  computed: {
    ...mapGetters([
      'username',
      'userAvatar'
    ])
  },
  created() {
    bannerList().then((data) => {
      this.banners = data.data.banners
    })
    this.setUserInfo()
  },
  methods: {
    onClickLeft() {
      if (this.showUserInfo()) {
        this.$router.push({ name: 'mine' })
      } else {
        this.$router.push({ name: 'login' })
      }
    },
    setUserInfo() {
      if (!this.showUserInfo()) {
        // 获取userInfo
        const token = getToken()
        if (token != null && token.trim().length > 0) {
          // 用户登录过，从API请求用户信息
          this.$store.dispatch('user/getInfo')
        }
      }
    },
    showUserInfo() {
      return this.username != null && this.username.trim().length > 0
    }
  }
}
</script>

<style lang="scss" scoped>
  .van-swipe  {
    margin-top: 10px;

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
