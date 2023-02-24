<template>
  <div id="crumbs">
    <div style="padding: 29px 0 29px 18px; border: 1px solid rgba(204, 204, 204, 1); border-top: 0;">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to ="{ path: '/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item v-if="$route.meta.value !== null">{{ $route.meta.value }}</el-breadcrumb-item>
        <el-breadcrumb-item v-if="$route.meta.value2 !== null">{{ $route.meta.value2 }}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MyCrubm'
}
</script>

<style lang="less" scoped>
</style>
