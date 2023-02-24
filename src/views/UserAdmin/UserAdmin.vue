<template>
  <div id="user">
    <el-row>
      <el-col>
        <div style="padding: 5px 0;background-color: #fff; height: 50px;">
          <el-form
            ref="form"
            :model="form"
            inline
            style="float: left; margin: 5px 0 0 10px"
          >
            <el-form-item>
              <!-- <el-input-search></el-input-search> -->
              <el-input placeholder="请输入用户名" style="margin: 0;display: block;width: 220px;" v-model="form.username"></el-input>
            </el-form-item>
            <el-form-item>
              <!-- <el-input-search></el-input-search> -->
              <el-input placeholder="请输入用户名" style="display: block;width: 220px;" v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item>
              <!-- <el-input-search></el-input-search> -->
              <el-button type="primary" @click="userAdmin" size="small">查询</el-button>
            </el-form-item>
            <el-form-item>
              <!-- <el-input-search></el-input-search> -->
              <el-button type="success" size="small" @click="reset">重置</el-button>
            </el-form-item>
            <el-form-item>
              <!-- <el-input-search></el-input-search> -->
              <el-button @click="dialogVisible = true" type="primary" size="small">新增</el-button>
            </el-form-item>
          </el-form>
        </div>
        <div style="width: 100%;overflow: auto;margin-top: 2px;padding: 5px 0 0px 0;background-color: #fff; height: 420px;">
          <el-table
            v-loading="loading"
            :data="tableData.slice((currentPage-1)*size,currentPage*size)"
            border
            style="margin-left: 5px;width: 99%">
            <el-table-column
              fixed
              prop="id"
              label="ID"
              align="center"
              width="120">
            </el-table-column>
            <el-table-column
              prop="username"
              label="用户名"
              align="center"
              width="180">
            </el-table-column>
            <el-table-column
              prop="name"
              label="姓名"
              align="center"
              width="180">
            </el-table-column>
            <el-table-column
              prop="age"
              label="年龄"
              align="center"
              width="120">
            </el-table-column>
            <el-table-column
              prop="sex"
              label="性别"
              align="center"
              width="120"
              >
              <template slot-scope="scope">
                <el-tag
                  :type="scope.row.sex === '男' ? 'primary' : 'success'"
                  disable-transitions>{{scope.row.sex}}</el-tag>
              </template>
            </el-table-column>
            <el-table-column
              prop="actor"
              label="身份"
              align="center"
              width="150"
              >
              <template slot-scope="scope">
                <el-tag
                  :type="scope.row.actor === '管理员' ? 'primary' : 'success'"
                  disable-transitions>{{scope.row.actor}}</el-tag>
              </template>
            </el-table-column>
             <el-table-column
              prop="phone"
              label="电话"
              align="center"
              width="220">
            </el-table-column>
            <el-table-column
              fixed="right"
              label="操作"
              width="180">
              <template slot-scope="scope">
                <el-button @click="updateUser(scope.row)" type="success" size="mini">编辑</el-button>
                <el-button type="danger" size="mini" @click="remove(scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div style="margin-top: 2px;padding: 5px 0 0px 50px;background-color: #fff; height: 50px;">
          <div style="margin: 5px 0 0 0; padding-right: 50px; float: right;">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="currentPage4"
              :page-size="10"
              background
              layout="total, sizes, prev, pager, next, jumper"
              :total="total">
            </el-pagination>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-dialog
      title="新增用户"
      :visible.sync="dialogVisible"
      width="40%"
      >
      <el-form
        :model="userForm"
        :rules="rules"
        ref="userForm"
        inline
      >
        <el-form-item label="用户名">
          <el-input placeholder="请输入用户名" v-model="userForm.username" type="text" style="width: 220px;"></el-input>
        </el-form-item>
        <el-form-item label="姓名">
          <el-input placeholder="请输入姓名" v-model="userForm.name" type="text" style="width: 220px;"></el-input>
        </el-form-item>
        <el-form-item label="年龄">
          <el-input placeholder="请输入年龄" v-model="userForm.age" type="text" style="width: 220px;"></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-select v-model="userForm.sex" placeholder="请选择">
            <el-option
              label="男"
              value="男">
            </el-option>
            <el-option
              label="女"
              value="女">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="身份">
          <el-select v-model="userForm.actor" placeholder="请选择">
            <el-option
              label="管理员"
              value="管理员">
            </el-option>
            <el-option
              label="员工"
              value="员工">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="电话">
          <el-input placeholder="请输入电话" v-model="userForm.phone" type="text" style="width: 220px;"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="add">新增</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="编辑用户"
      :visible.sync="dialogVisible2"
      width="40%"
      :before-close="handleClose">
      <el-form
        :model="userForm2"
        :rules="rules"
        ref="userForm2"
        inline
      >
        <el-form-item label="用户名">
          <el-input v-model="userForm2.username" type="text" style="width: 220px;"></el-input>
        </el-form-item>
        <el-form-item label="姓名">
          <el-input v-model="userForm2.name" type="text" style="width: 220px;"></el-input>
        </el-form-item>
        <el-form-item label="年龄">
          <el-input v-model="userForm2.age" type="text" style="width: 220px;"></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-select v-model="userForm2.sex" placeholder="请选择">
            <el-option
              label="男"
              value="男">
            </el-option>
            <el-option
              label="女"
              value="女">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="身份">
          <el-select v-model="userForm2.actor" placeholder="请选择">
            <el-option
              label="管理员"
              value="管理员">
            </el-option>
            <el-option
              label="员工"
              value="员工">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="电话">
          <el-input v-model="userForm2.phone" type="text" style="width: 220px;"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible2 = false">取 消</el-button>
        <el-button type="primary" @click="update(userForm2.id)">编辑</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  userAdmin,
  userAdminInsert,
  userAdminUpdate,
  userAdminDelete
} from '@/api/userAdminApi'

export default {
  name: 'MyUserAdmin',
  data() {
    return {
      loading: false,
      dialogVisible: false,
      dialogVisible2: false,
      currentPage: 1,
      size: 10,
      total: 10,
      form: {
        username: '',
        name: ''
      },
      userForm: {
        username: '',
        name: '',
        age: '',
        sex: '',
        actor: '',
        phone: ''
      },
      userForm2: {
        id: '',
        username: '',
        name: '',
        age: '',
        sex: '',
        actor: '',
        phone: ''
      },
      rules: {
      },
      tableData: []
    }
  },
  methods: {
    userAdmin() {
      this.loading = true
      userAdmin(this.form).then(res => {
        setTimeout(() => {
          this.loading = false
        }, 500)
        this.tableData = res
        this.total = res.length
        console.log(res)
      })
    },
    reset() {
      this.form.username = ''
      this.form.name = ''
    },
    updateUser(scope) {
      console.log(scope)
      this.userForm2.id = scope.id
      this.userForm2.username = scope.username
      this.userForm2.name = scope.name
      this.userForm2.age = scope.age
      this.userForm2.sex = scope.sex
      this.userForm2.actor = scope.actor
      this.userForm2.phone = scope.phone
      this.dialogVisible2 = true
    },
    update() {
      console.log()
      userAdminUpdate(this.userForm2).then(res => {
        console.log(res)
        if (res.code === 200) {
          this.$message({
            type: 'success',
            message: '修改成功'
          })
          this.dialogVisible2 = false
          this.userAdmin()
        }
      })
    },
    remove(id) {
      this.$confirm('是否删除该项, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        userAdminDelete({
          id: id.id
        }).then(res => {
          console.log(id.id)
          if (res.code === 200) {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            this.userAdmin()
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    handleCurrentChange(row) {
      this.currentPage = row
      console.log(row)
    },
    add(form) {
      userAdminInsert(this.userForm).then(res => {
        if (res.code === 200) {
          this.$message({
            type: 'success',
            message: '添加成功'
          })
          this.userAdmin()
        }
      })
      this.dialogVisible = false
    }
  },
  created() {
    this.userAdmin()
  }
}
</script>

<style leng="less" scoped>
</style>
