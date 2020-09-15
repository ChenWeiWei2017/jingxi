<template>
  <div>
    <van-nav-bar
      right-text="按钮"
      :fixed="true"
      :placeholder="true"
      left-arrow
      class="nav-search"
      @click-left="onClickLeft"
      @click-right="onClickRight"
    >
      <template #title>
        <van-search
          v-model="value"
          shape="round"
          placeholder="请输入搜索关键词"
          clearable
          @search="onSearch"
        />
      </template>
      <template #right>
        <van-icon name="ellipsis" size="20" />
      </template>
    </van-nav-bar>
    <div class="panel-box">
      <div class="left-panel">
        <cube-scroll ref="leftScroll">
          <van-sidebar v-model="activeKey" @change="changeType">
            <template v-for="(type, index) in types">
              <van-sidebar-item :key="index" :title="type.title" />
            </template>
          </van-sidebar>
        </cube-scroll>
      </div>

      <div ref="typeRight" class="right-panel">
        <cube-scroll>
          <div style="padding-top: 5px;">
            <van-grid :column-num="2" :gutter="5" clickable square>
              <van-grid-item v-for="item in goods" :key="item.id" :text="item.title" @click="addtocart($event, item)">
                <template #icon>
                  <van-image :src="item.cover" width="80" />
                </template>
              </van-grid-item>
            </van-grid>
          </div>
        </cube-scroll>
      </div>
      <!-- 动画 -->
      <div class="ball-wrap">
        <transition
          @before-enter="beforeEnter"
          @enter="enter"
          @afterEnter="afterEnter"
        >
          <div v-if="ball.show" class="ball">
            <div class="inner">
              <van-icon name="gift" size="16" />
            </div>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import { NavBar, Search, Sidebar, SidebarItem, Icon, List, Grid, GridItem, Image as VanImage } from 'vant'
import { getAllTypes, getGoodsByType } from '@/api/type'
import { getToken } from '@/utils/auth'

export default {
  name: 'Type',
  components: {
    [NavBar.name]: NavBar,
    [Search.name]: Search,
    [Sidebar.name]: Sidebar,
    [Icon.name]: Icon,
    [SidebarItem.name]: SidebarItem,
    [List.name]: List,
    [Grid.name]: Grid,
    [GridItem.name]: GridItem,
    [VanImage.name]: VanImage
  },
  data() {
    return {
      value: '',
      activeKey: 0,
      typeItemHeight: 59,
      panelHeight: 0,
      types: [],
      typeItem: '',
      goods: [],
      ball: {
        show: false,
        el: ''
      }
    }
  },
  async created() {
    const typeRes = await getAllTypes()
    this.types = typeRes.data
    if (this.types.length) {
      const goodsRes = await getGoodsByType(this.types[this.activeKey].id)
      this.goods = goodsRes.data
    }
  },
  mounted() {
    this.setPanelHeight()
  },
  methods: {
    onSearch(val) {
      console.log(val)
    },
    onCancel() {

    },
    onClickLeft() {

    },
    onClickRight() {

    },
    setPanelHeight() {
      const tabbarHeight = document.querySelector('.van-tabbar').offsetHeight
      const navbarHeight = document.querySelector('.van-nav-bar').offsetHeight
      const clientHeight = document.documentElement.clientHeight
      this.panelHeight = clientHeight - tabbarHeight - navbarHeight
      document.querySelector('.left-panel').style.height = this.panelHeight + 'px'
      document.querySelector('.right-panel').style.height = this.panelHeight + 'px'
    },
    changeType(index) {
      if ((this.types.length - index + 1) * this.typeItemHeight > this.panelHeight) {
        this.$refs.leftScroll.scrollTo(0, -index * this.typeItemHeight, 500)
      }
      getGoodsByType(this.types[index].id).then((res) => {
        this.goods = res.data
      })
    },
    addtocart(event, goods) {
      const token = getToken()
      if (token != null && token.trim() !== '') {
        this.$store.dispatch('shopcart/addtocart', goods).then(() => {
          this.ball.show = true
          this.ball.el = event.target
        })
      } else {
        this.$toast.fail('请先登录')
      }
    },
    beforeEnter(el) {
      const dom = this.ball.el
      const rect = dom.getBoundingClientRect()
      const x = (rect.left - window.innerWidth * 0.6)
      const y = -(window.innerHeight - rect.top)
      el.style.display = 'block'
      el.style.transform = `translate3d(0,${y}px,0)`
      const inner = el.querySelector('.inner')
      inner.style.transform = `translate3d(${x}px,0,0)`
    },
    enter(el, done) {
      // 触发重绘
      document.body.offsetHeight
      // 小球移动回到原点，就是购物车的位置
      el.style.transform = `translate3d(0,0,0)`
      const inner = el.querySelector('.inner')
      inner.style.transform = `translate3d(0,0,0)`
      // 过渡完成后执行的事件
      el.addEventListener('transitionend', done)
    },
    afterEnter(el) {
      // 结束隐藏小球
      this.ball.show = false
      el.style.display = 'none'
    }
  }
}
</script>

<style lang="scss" scoped>
  .nav-search{
    .van-search {
      padding: 5px;
    }
  }

  .panel-box {
    display: flex;

    .left-panel {
      width: 25%;
      margin-right: 1px;

      .van-sidebar {
        height: 100%;
        width: 100%;
      }
    }

    .right-panel {
      width: 75%;
      overflow: auto;
      background-color: #fff;

      h4 {
        font-size: 14px;
        color: #333;
        line-height: 1em;
        font-weight: 700;
        text-align: left;
        margin: 20px 0 10px 6px;
      }
    }
  }

  .ball-wrap {
    .ball {
      position: fixed;
      left: 60%;
      bottom: 40px;
      z-index: 999;
      color: red;
      transition: all 1s cubic-bezier(0.49,-0.29,0.75,0.41);

      .inner {
        width: 16px;
        height: 16px;
        transition: all 1s linear
      }
    }
  }
</style>

<style lang="scss">
  .nav-search {
    .van-nav-bar__title {
      width: 75%;
      max-width: 75%;
    }
  }
</style>
