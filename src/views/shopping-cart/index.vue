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
          <van-swipe-cell v-for="item in goods" :key="item.id">
            <div class="shop-box">
              <van-checkbox checked-color="#f2270c" :name="item" />
              <van-card
                :price="item.price"
                :desc="item.description"
                :title="item.title"
                :thumb="item.cover"
              >
                <template #num>
                  <van-stepper v-model="item.num" integer />
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
      chooseAll: false,
      goods: [
        {
          id: 1,
          title: '小米手环5 NFC版',
          cover: 'https://img10.360buyimg.com/mobilecms/s234x234_jfs/t1/142719/12/444/104550/5ee1988cEd952bf51/74860b136a001168.jpg!q70.dpg.webp',
          description: '小米手环5 NFC版 石墨黑 动态彩屏  智能运动监测 内置小爱同学语音遥控手机 伸手即可刷卡磁吸式充电',
          price: '229.00',
          num: 1
        },
        {
          id: 2,
          title: 'iPhone 11',
          cover: 'https://img10.360buyimg.com/mobilecms/s234x234_jfs/t1/52252/35/10516/124064/5d7808e0E46202391/7100f3733a1c1f00.jpg!q70.dpg.webp',
          description: 'Apple iPhone 11 (A2223) 128GB 白色 移动联通电信4G手机 双卡双待',
          price: '5899.00',
          num: 1
        },
        {
          id: 3,
          title: 'MacBook Pro 2020 13.3寸',
          cover: 'https://img10.360buyimg.com/mobilecms/s234x234_jfs/t1/117402/40/5319/122863/5eb2c3fcEca38019c/15285049766a8f59.jpg!q70.dpg.webp',
          description: 'Apple 2020新款 MacBook Pro 13.3【带触控栏】十代i5 16G 512G 2.0GHz 深空灰 笔记本电脑 轻薄本 MWP42CH/A',
          price: '14499.00',
          num: 1
        },
        {
          id: 4,
          title: 'Java核心技术卷',
          cover: 'https://img10.360buyimg.com/mobilecms/s234x234_jfs/t24022/68/2243624893/69240/5c5590db/5b796da4N613400e0.jpg!q70.dpg.webp',
          description: '正版Java核心技术卷I基础知识（原书第10版）+Java核心技术卷II特性 原书第9版',
          price: '191.80',
          num: 1
        },
        {
          id: 5,
          title: '蒙牛纯甄',
          cover: 'https://img10.360buyimg.com/mobilecms/s234x234_jfs/t1/116471/3/15357/100053/5f3cd609E272b7dc9/a4dbce063b22dc9b.jpg!q70.dpg.webp',
          description: '蒙牛纯甄 常温风味酸牛奶 200g*24 礼盒装',
          price: '91.90',
          num: 1
        },
        {
          id: 6,
          title: '半小时漫画中国史系列+世界史（共5册）',
          cover: 'https://img10.360buyimg.com/mobilecms/s234x234_jfs/t1/149885/8/323/418651/5ee08162Eec627e78/4735ed25b576f081.jpg!q70.dpg.webp',
          description: '半小时漫画中国史系列+世界史（共5册）看半小时漫画，通五千年历史！专享赠送历史大事记！',
          price: '209.40',
          num: 1
        },
        {
          id: 7,
          title: '泉林本色卷纸',
          cover: 'https://img10.360buyimg.com/mobilecms/s234x234_jfs/t1/134724/2/9636/195487/5f59dee0E5a89b7e7/9acf959a8520af34.jpg!q70.dpg.webp',
          description: '泉林本色卷纸 不漂白3层280节*27卷（耐用高节数 本色卫生厕卷纸巾）整箱销售',
          price: '49.90',
          num: 1
        },
        {
          id: 8,
          title: '小米巨能写',
          cover: 'https://img10.360buyimg.com/mobilecms/s234x234_jfs/t1/142492/4/4493/43739/5f28c21eEd88c62fe/c190262c5df54c7e.jpg!q70.dpg.webp',
          description: '小米巨能写中性笔 10支装 黑色 0.5mm 商务办公学生中性笔会议笔',
          price: '9.99',
          num: 1
        }
      ]
    }
  },
  computed: {
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
      this.goods = this.goods.filter(item => item.id !== id)
      this.chose = this.chose.filter(item => item.id !== id)
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
