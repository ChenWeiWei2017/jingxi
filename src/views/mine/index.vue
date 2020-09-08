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
  </div>
</template>

<script>
import { NavBar, Icon } from 'vant'

export default {
  name: 'Mine',
  components: {
    [NavBar.name]: NavBar,
    [Icon.name]: Icon
  },
  data() {
    return {

    }
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1)
    },
    onClickRight() {

    }
  }
}
</script>

<style>

</style>
