<template>
  <el-menu mode="vertical" :default-active="$route.path" :unique-opened="true" background-color="#304156" text-color="#bfcbd9" active-text-color="#409EFF">
    <sidebar-item :routes="permission_routers"></sidebar-item>
  </el-menu>
</template>

<script>
  import { mapGetters } from 'vuex'
  import SidebarItem from './sidebarItem'
  export default {
    components: {SidebarItem},
    computed: {
      ...mapGetters([
        'permission_routers'
      ])
    }
  }
</script>

<style scoped rel="stylesheet/scss" lang="scss">
  .el-menu {
    // min-height: 100%;
  }

</style>
