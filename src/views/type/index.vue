<template>
  <div>
    <div>
      <van-search
        v-model="value"
        shape="round"
        placeholder="请输入搜索关键词"
        clearable
        @search="onSearch"
      />
    </div>
    <div style="margin-top: 55px">
      <div class="left">
        <van-sidebar v-model="activeKey">
          <template v-for="type in types">
            <van-sidebar-item :key="type.index" :title="type.title" />
          </template>
        </van-sidebar>
      </div>
      <div class="right">
        123
      </div>
      <div class="clear" />
    </div>
  </div>
</template>

<script>
import { Search, Sidebar, SidebarItem, Icon } from 'vant'

export default {
  name: 'Type',
  components: {
    [Search.name]: Search,
    [Sidebar.name]: Sidebar,
    [Icon.name]: Icon,
    [SidebarItem.name]: SidebarItem
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
        }
      ]
    }
  },
  methods: {
    onSearch(val) {
      console.log(val)
    },
    onCancel() {

    }
  }
}
</script>

<style lang="scss" scoped>
  .van-search {
    border-bottom: 1px #eee solid;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 1;
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
