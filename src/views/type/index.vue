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
    <div>
      <vant-sidebar-scroll :active="activeKey" :types="types" @change="changeType" />
      <!-- <van-sidebar v-model="activeKey">
        <template v-for="type in types">
          <van-sidebar-item :key="type.index" :title="type.title" />
        </template>
      </van-sidebar> -->
    </div>
  </div>
</template>

<script>
import { NavBar, Search, Sidebar, SidebarItem, Icon, List } from 'vant'
import VantSidebarScroll from '@/components/VantSidebarScroll/index'

export default {
  name: 'Type',
  components: {
    [NavBar.name]: NavBar,
    [Search.name]: Search,
    [Sidebar.name]: Sidebar,
    [Icon.name]: Icon,
    [SidebarItem.name]: SidebarItem,
    [List.name]: List,
    VantSidebarScroll
  },
  data() {
    return {
      value: '',
      activeKey: 0,
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
      ]
    }
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
    changeType(key) {
      if (key !== this.activeKey) {
        this.activeKey = key
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
  .left {
    float: left;
  }
  .right {
    float: left;
  }
  .clear {
    clear: both;
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
