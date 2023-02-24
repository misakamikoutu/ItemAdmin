<template>
  <div id="AdminUser">
    <div id="Admin">
      <div v-if="token != null">
        <el-dropdown v-loading="loading" style="margin-left: 45px;" placement="bottom">
            <span class="el-dropdown-link">
                <el-avatar src="https://cn.gravatar.com/avatar/1514086847623053314?s=164&d=monsterid"></el-avatar>
            </span>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item @click.native="$router.push({ path: '/home' })">个人中心</el-dropdown-item>
                <el-dropdown-item @click.native="alert">设置中心</el-dropdown-item>
                <el-dropdown-item @click.native="exitUser">退出账号</el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
      </div>
      <div v-else style="width: 200px; text-align: left;">
        <el-button @click="login" type="primary" size="small" plain>登录</el-button>
        <el-button @click="register" type="primary" size="small" plain>注册</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'AdminUse',
  data() {
    return {
      loading: false
    }
  },
  created() {
  },
  computed: {
    ...mapState(['src', 'token'])
  },
  methods: {
    login() {
      console.log('登录')
      this.$router.push({
        path: '/login'
      })
    },
    register() {
      console.log('注册')
      this.$router.push({
        path: '/register'
      })
    },
    alert() {
      alert('暂无页面')
    },
    exitUser() {
      console.log('退出')
      this.$confirm('是否需要退出账户', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.loading = true
        this.$message({
          type: 'success',
          message: '退出账户成功',
          duration: 1500
        })
        setTimeout(() => {
          this.$router.push({
            path: '/login',
            query: {
              token: localStorage.removeItem('token')
            }
          })
          this.loading = false
        }, 1000)
      })
    }
  }
}
</script>

<style lang="less" scoped>
    #AdminUser {
        width: 100%;
        height: 100%;
        #Admin {
            width: 6%;
            padding: 8px 0;
            margin-right: 120px;
            float: right;
            .el-dropdown-link {
                cursor: pointer;
            }
        }
    }
</style>
