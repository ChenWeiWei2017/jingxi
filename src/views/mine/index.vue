<template>
  <div>
    <van-nav-bar
      title="我的"
      right-text="按钮"
      :fixed="true"
      :placeholder="true"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
    >
      <template #right>
        <van-icon name="ellipsis" size="20" />
      </template>
    </van-nav-bar>
    <div class="container">
      <div class="info-head">
        <div class="avatar">
          <van-image :src="userAvatar" round width="80" />
        </div>
        <div class="name">
          {{ username }}
        </div>
      </div>
      <van-cell title="商品收藏" is-link />
      <van-cell title="我的足迹" is-link />
      <van-cell title="店铺收藏" is-link />
      <van-cell title="我的订单" is-link />
      <van-cell title="退出登录" is-link @click="logout" />
    </div>
  </div>
</template>

<script>
import { NavBar, Icon, Col, Row, Image as VanImage, Cell } from 'vant'
import { mapGetters } from 'vuex'
import { getToken } from '@/utils/auth'

export default {
  name: 'Mine',
  components: {
    [NavBar.name]: NavBar,
    [Icon.name]: Icon,
    [Col.name]: Col,
    [Row.name]: Row,
    [VanImage.name]: VanImage,
    [Cell.name]: Cell
  },
  data() {
    return {

    }
  },
  computed: {
    ...mapGetters([
      'username',
      'userAvatar'
    ])
  },
  created() {
    this.initUserInfo()
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1)
    },
    onClickRight() {

    },
    initUserInfo() {
      const token = getToken()
      if ((this.username == null || this.username.trim() === '') && (token != null && token.trim() !== '')) {
        this.$store.dispatch('user/getInfo')
      }
    },
    async logout() {
      await this.$store.dispatch('user/logout')
      await this.$store.dispatch('shopcart/clearcart')
      this.$router.push({ name: 'home' })
    }
  }
}
</script>

<style lang="scss" scoped>
  .container {
    padding-top: 10px;

    .info-head {
      display: flex;
      margin: 0 20px 20px;

      .avatar {
        width: 80px;
        height: 80px;
      }

      .name {
        margin-left: 20px;
        font-size: 24px;
        height: 80px;
        line-height: 80px;
      }
    }
  }
</style>
