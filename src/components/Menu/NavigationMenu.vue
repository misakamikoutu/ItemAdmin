<template>
  <div id="MenuLayout">
    <el-row style="height: 100%;">
      <el-col :span="3" style="float: left; height: 100%; background-color: #545c64;">
        <!-- <h3
          style="
            color: #fff;
            font-weight: normal;
            background-color: #545c64;
            margin: 0;
            padding: 8px 0;
          "
        >
          项目管理
        </h3> -->
        <el-menu
          mode="vertical"
          background-color="#545c64"
          text-color="#fff"
          class="el-menu-vertical-demo"
          router
        >
          <el-menu-item index="/home"><i class="el-icon-s-home"></i>主页</el-menu-item>
          <el-submenu
            v-for="(first, index) in menuList"
            :key="index"
            :index="first.index"
          >
            <template slot="title">
              <i :class="first.icon"></i>
              <span>{{ first.firstMenu }}</span>
            </template>
            <el-menu-item
              v-for="(second, index) in first.secondaryMenu"
              :key="index"
              :index="second.router"
            >{{ second.name }}</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-col>
      <el-col :span="21" style="float: left; border: 1px solid rgba(204, 204, 204, 1)">
        <admin-use></admin-use>
      </el-col>
      <el-col :span="21">
        <Crumb></Crumb>
      </el-col>
      <el-col :span="21" style="padding: 25px; height: 81%; background-color: rgba(204, 204, 204, .2)">
        <router-view></router-view>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import AdminUse from '@/components/TopAdmin/AdminUser.vue'
import Crumb from '@/components/Crumbs/Crumbs.vue'
import {
  menuData
} from '@/api/MenuApi'

export default {
  name: 'NavMenu',
  data() {
    return {
      menuList: []
    }
  },
  created() {
    this.menuData()
  },
  methods: {
    menuData() {
      menuData().then(res => {
        this.menuList = res
        console.log(this.menuList)
      })
    }
  },
  components: {
    AdminUse,
    Crumb
  }
}
</script>

<style lang="less" scoped>
/deep/.el-submenu .el-menu-item {
  min-width: 0;
  text-align: left;
  border: 0;
}

/deep/.el-menu-item {
  text-align: left;
}

/deep/.el-submenu__title {
    text-align: left;
}

#MenuLayout {
  width: 100%;
  height: 100%;
}

.el-menu {
  border: 0;
}
</style>
