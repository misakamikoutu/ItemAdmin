<template>
  <div id="registener">
    <el-row id="layout" :gutter="6">
      <el-col :span="12" :offset="4" style="bcckground-color: #fff">
        <div style="margin-left: 75px;">
          <h2>注册</h2>
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
          <el-form-item label="确认密码" prop="password2">
            <el-input
              style="width: 220px;"
              type="password"
              v-model="form.password2"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="registerForm('ruleForm')"
              >注册</el-button
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
  register
} from '@/api/UserApi'

export default {
  name: 'MyRegister',
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
    var password2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次确认密码'))
      } else if (value !== this.form.password) {
        callback(new Error('两次密码不一致'))
      } else {
        callback()
      }
    }
    return {
      loading: false,
      form: {
        username: '',
        password: '',
        password2: ''
      },
      rules: {
        username: [
          { required: true, validator: username, trigger: 'change' }
        ],
        password: [
          { required: true, validator: password, trigger: 'change' },
          { min: 6, max: 18, message: '密码必须在6-18位', trigger: 'change' }
        ],
        password2: [
          { required: true, validator: password2, trigger: 'change' }
        ]
      }
    }
  },
  methods: {
    registerForm(formName) {
      console.log(formName)
      this.$refs[formName].validate((valid) => {
        if (valid) {
          register(this.form).then(res => {
            if (res.code === 200) {
              this.$message({
                type: 'success',
                message: '注册成功',
                duration: 1500
              })
              setTimeout(() => {
                this.$router.push({
                  path: '/login'
                })
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
    }
  }
}
</script>

<style lang="less" scoped>
  #registener {
  width: 100%;
  height: 100%;
}

#layout {
  width: 40%;
  height: 60%;
  background-color: #fff;
  position: relative;
  top: 18%;
  left: 27%;
  border-radius: 3px;
  box-shadow: 1px 1px 5px rgba(204, 204, 204, 0.8);
}
</style>
