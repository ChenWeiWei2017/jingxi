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
            <template v-for="type in types">
              <van-sidebar-item :key="type.index" :title="type.title" />
            </template>
          </van-sidebar>
        </cube-scroll>
      </div>

      <div ref="typeRight" class="right-panel">
        <cube-scroll>
          <div>
            <h4>热门分类</h4>
            <van-grid :column-num="3" :gutter="5" clickable square>
              <van-grid-item v-for="item in 51" :key="item" icon="photo-o" text="文字" to="" />
            </van-grid>
          </div>
        </cube-scroll>
      </div>
    </div>
  </div>
</template>

<script>
import { NavBar, Search, Sidebar, SidebarItem, Icon, List, Grid, GridItem } from 'vant'

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
    [GridItem.name]: GridItem
  },
  data() {
    return {
      value: '',
      activeKey: 0,
      typeItemHeight: 0,
      panelHeight: 0,
      types: [
        {
          index: 0,
          title: '热门推荐',
          to: '' // 路由
        },
        {
          index: 1,
          title: '手机数码',
          to: '' // 路由
        },
        {
          index: 2,
          title: '电脑办公',
          to: '' // 路由
        },
        {
          index: 3,
          title: '家用电器',
          to: '' // 路由
        },
        {
          index: 4,
          title: '美妆护肤',
          to: ''
        },
        {
          index: 5,
          title: '京西超市',
          to: ''
        },
        {
          index: 6,
          title: '个护清洁',
          to: ''
        },
        {
          index: 7,
          title: '汽车生活',
          to: ''
        },
        {
          index: 8,
          title: '男装',
          to: ''
        },
        {
          index: 9,
          title: '男鞋',
          to: ''
        },
        {
          index: 10,
          title: '女装',
          to: ''
        },
        {
          index: 11,
          title: '女鞋',
          to: ''
        },
        {
          index: 12,
          title: '图书音像',
          to: ''
        },
        {
          index: 13,
          title: '零食',
          to: ''
        }
      ],
      typeItem: ''
    }
  },
  mounted() {
    this.setPanelHeight()
    this.countTypeItemHeight()
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
    countTypeItemHeight() {
      const itemHeight = document.querySelector('.van-sidebar-item').offsetHeight
      this.typeItemHeight = itemHeight
    },
    changeType(index) {
      if ((this.types.length - index + 1) * 59 > this.panelHeight) {
        this.$refs.leftScroll.scrollTo(0, -index * this.typeItemHeight, 500)
      }
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
</style>

<style lang="scss">
  .nav-search {
    .van-nav-bar__title {
      width: 75%;
      max-width: 75%;
    }
  }
</style>
