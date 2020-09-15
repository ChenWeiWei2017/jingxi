<template>
  <cube-scroll>
    <div style="padding-top: 5px;">
      <van-grid :column-num="2" :gutter="5" clickable square>
        <van-grid-item v-for="item in goods" :key="item.id" @click="addtocart(item)">
          <template #icon>
            <van-image :src="item.cover" width="80" />
          </template>
          <template #text>
            <span class="van-grid-item__text goods-title">{{ item.title }}</span>
          </template>
        </van-grid-item>
      </van-grid>
    </div>
  </cube-scroll>
</template>

<script>
import { Grid, GridItem, Image as VanImage, Icon } from 'vant'

export default {
  name: 'GoodsPanel',
  components: {
    [Grid.name]: Grid,
    [GridItem.name]: GridItem,
    [VanImage.name]: VanImage,
    [Icon.name]: Icon
  },
  props: {
    goods: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {

    }
  },
  methods: {
    addtocart(goods) {
      this.$store.dispatch('shopcart/addtocart', goods).then(() => {
        this.$toast('添加成功')
      })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
