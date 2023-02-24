<template>
  <div id="login">
    <el-row id="layout" :gutter="6">
      <el-col :span="12" :offset="4" style="bcckground-color: #fff">
        <div style="margin-left: 75px;">
          <h2>登录</h2>
        </div>
        <el-form
          v-loading="loading"
          :model="form"
          status-icon
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="账号" prop="username">
            <el-input style="width: 220px;" v-model="form.username" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input
              style="width: 220px;"
              type="password"
              v-model="form.password"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="loginForm('ruleForm')"
              >登录</el-button
            >
            <el-button @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import {
  user,
  userMessage
} from '@/api/UserApi'
import {
  mapMutations
} from 'vuex'

export default {
  name: 'MyUser',
  data() {
    var username = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入账号'))
      } else {
        callback()
      }
    }
    var password = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        callback()
      }
    }
    return {
      key: 0,
      loading: false,
      value: false,
      form: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          { required: true, validator: username, trigger: 'change' }
        ],
        password: [
          { required: true, validator: password, trigger: 'change' },
          { min: 6, max: 18, message: '密码必须在6-18位', trigger: 'change' }
        ]
      }
    }
  },
  methods: {
    ...mapMutations(['getToken']),
    loginForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          user(this.form).then(res => {
            console.log(res)
            if (res.code === 200) {
              this.$message({
                type: 'success',
                message: '登录成功',
                duration: 1500
              })
              this.userMessage({
                id: res.data.id
              })
              this.loading = true
              this.$store.commit('getToken', res.data.token)
              localStorage.setItem('token', res.data.token)
              setTimeout(() => {
                this.loading = false
                this.$router.push({
                  path: '/home',
                  query: {
                    token: localStorage.getItem('token')
                  }
                })
                console.log(this)
              }, 1000)
            }
          })
        } else {
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    userMessage(id) {
      console.log(id)
      userMessage(id).then(res => {
        this.$store.commit('imgData', res.data.src)
        console.log(res)
      })
    }
  },
  created() {
    this.$store.commit('getToken', localStorage.getItem('token'))
    console.log(this.$route)
  },
  computed: {
    ...mapMutations(['imgData'])
  }
}
</script>

<style lang="less" scoped>
#login {
  width: 100%;
  height: 100%;
}

#layout {
  width: 40%;
  height: 50%;
  background-color: #fff;
  position: relative;
  top: 18%;
  left: 27%;
  border-radius: 3px;
  box-shadow: 1px 1px 5px rgba(204, 204, 204, 0.8);
}
</style>
