<template>
  <van-sidebar v-model="activeKey">
    <template v-for="type in types">
      <van-sidebar-item :key="type.index" :title="type.title" />
    </template>
  </van-sidebar>
</template>

<script>
import { Sidebar, SidebarItem } from 'vant'

export default {
  name: 'VantSidebarScroll',
  components: {
    [Sidebar.name]: Sidebar,
    [SidebarItem.name]: SidebarItem
  },
  model: {
    prop: 'activeKey',
    event: 'change'
  },
  props: {
    types: {
      type: Array,
      default() {
        return []
      }
    },
    activeKey: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {

    }
  }
}
</script>

<style>

</style>
