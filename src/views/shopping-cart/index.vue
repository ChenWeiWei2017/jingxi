<template>
  <div>
    <van-nav-bar
      title="购物车"
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
      <cube-scroll>
        <van-checkbox-group ref="checkboxGroup" v-model="chose">
          <van-swipe-cell v-for="item in shopcart" :key="item.id">
            <div class="shop-box">
              <van-checkbox checked-color="#f2270c" :name="item" />
              <van-card
                :price="item.price"
                :desc="item.description"
                :title="item.title"
                :thumb="item.cover"
              >
                <template #num>
                  <van-stepper v-model="item.num" integer :name="item.id" @change="changeNum" />
                </template>
              </van-card>
            </div>
            <template #right>
              <van-button square type="danger" text="删除" @click="deleteGoods(item.id)" />
              <van-button square type="primary" text="收藏" />
            </template>
          </van-swipe-cell>
        </van-checkbox-group>
      </cube-scroll>
      <van-submit-bar :price="totalPrice" button-text="提交订单" @submit="onSubmit">
        <van-checkbox v-model="chooseAll" checked-color="#f2270c" @change="chooseAllToggle">全选</van-checkbox>
      </van-submit-bar>
    </div>
  </div>
</template>

<script>
import { NavBar, Icon, Card, SwipeCell, Button, Checkbox, CheckboxGroup, Stepper, SubmitBar } from 'vant'
import { mapGetters } from 'vuex'

export default {
  name: 'ShoppingCart',
  components: {
    [NavBar.name]: NavBar,
    [Icon.name]: Icon,
    [Card.name]: Card,
    [SwipeCell.name]: SwipeCell,
    [Button.name]: Button,
    [Checkbox.name]: Checkbox,
    [CheckboxGroup.name]: CheckboxGroup,
    [Stepper.name]: Stepper,
    [SubmitBar.name]: SubmitBar
  },
  data() {
    return {
      chose: [],
      containerHeight: 0,
      chooseAll: false
    }
  },
  computed: {
    ...mapGetters([
      'shopcart'
    ]),
    totalPrice() {
      return this.chose.reduce((total, current) => {
        return total + current.price * current.num * 100
      }, 0)
    }
  },
  mounted() {
    this.setContainerHeight()
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1)
    },
    onClickRight() {

    },
    setContainerHeight() {
      const tabbarHeight = document.querySelector('.van-tabbar').offsetHeight
      const navbarHeight = document.querySelector('.van-nav-bar').offsetHeight
      const clientHeight = document.documentElement.clientHeight
      this.containerHeight = clientHeight - tabbarHeight - navbarHeight
      document.querySelector('.container').style.height = this.containerHeight + 'px'
      document.querySelector('.van-submit-bar').style.bottom = tabbarHeight + 'px'
    },
    onSubmit() {

    },
    chooseAllToggle(checked) {
      this.$refs.checkboxGroup.toggleAll(checked)
    },
    deleteGoods(id) {
      // 商品列表和已选择列表中都得移除
      this.$store.dispatch('shopcart/removecart', id).then(() => {
        this.chose = this.chose.filter(item => item.id !== id)
      })
    },
    changeNum(value, detail) {
      this.$store.dispatch('shopcart/changegoodsnum', { id: detail.name, num: value })
    }
  }
}
</script>

<style lang="scss" scoped>
  .container {

    .van-checkbox-group {
      padding-top: 10px;
      padding-bottom: 50px;
    }

    .van-swipe-cell {
      margin-bottom: 10px;

      .shop-box {
        background-color: #fff;
        display: flex;

        .van-checkbox {
          width: 14%;

          .van-checkbox__icon {
            margin: 0 auto;
          }
        }

        .van-card {
          width: 86%;
          background-color: #fff;
        }
      }

      .van-swipe-cell__right {
        .van-button {
          height: 100%;
        }
      }
    }

    .van-submit-bar {
      background: hsla(0,0%,100%,.95);
      border-top: 1px solid #ebedf0;
    }
  }
</style>
<style lang="scss">
  .van-checkbox__icon {
    margin: 0 auto;
  }
</style>
