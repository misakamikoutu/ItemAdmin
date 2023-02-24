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
              <el-input placeholder="请输入物品名" style="margin: 0;display: block;width: 220px;" v-model="form.itemname"></el-input>
            </el-form-item>
            <el-form-item>
              <!-- <el-input-search></el-input-search> -->
              <el-input placeholder="请输入保质期" style="display: block;width: 220px;" v-model="form.itemtime"></el-input>
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
              prop="trademark"
              label="商品商标"
              align="center"
              width="120">
            </el-table-column>
            <el-table-column
              prop="itemname"
              label="商品名"
              align="center"
              width="180">
            </el-table-column>
            <el-table-column
              prop="itemtime"
              label="商品保质期"
              align="center"
              width="180">
            </el-table-column>
            <el-table-column
              prop="price"
              label="商品价格"
              align="center"
              width="120">
            </el-table-column>
            <el-table-column
              prop="time"
              label="生产时间"
              align="center"
              width="180"
              :formatter="dateFormat"
              >
            </el-table-column>
            <el-table-column
              prop="sold"
              label="销售量"
              align="center"
              width="150"
              >
            </el-table-column>
             <el-table-column
              label="评分"
              align="center"
              width="180">
              <template slot-scope="scope">
                <el-rate @change="rate" disabled v-model="scope.row.grade"></el-rate>
              </template>
            </el-table-column>
            <el-table-column
              fixed="right"
              label="操作"
              align="center"
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
      title="新增商品"
      :visible.sync="dialogVisible"
      width="40%"
      >
      <el-form
        :model="userForm"
        :rules="rules"
        ref="userForm"
        inline
      >
        <el-form-item label="商品名">
          <el-input placeholder="请输入商品名" v-model="userForm.itemname" type="text" style="width: 220px;"></el-input>
        </el-form-item>
        <el-form-item label="保质期">
          <el-input placeholder="请输入保质期" v-model="userForm.itemtime" type="text" style="width: 220px;"></el-input>
        </el-form-item>
        <el-form-item label="价格">
          <el-input placeholder="请输入价格" v-model="userForm.price" type="text" style="width: 220px;"></el-input>
        </el-form-item>
        <el-form-item label="时间">
          <el-date-picker
            v-model="userForm.time"
            type="datetime"
            placeholder="请选择日期"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="销售量">
          <el-input placeholder="请输入销售量" v-model="userForm.sold" type="text" style="width: 220px;"></el-input>
        </el-form-item>
        <el-form-item label="评分">
          <!-- <el-rate v-model="userForm.grade" style="width: 220px;"></el-rate> -->
          <el-input placeholder="请输入评分" v-model="userForm.grade" type="text" style="width: 220px;"></el-input>
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
         <el-form-item label="商品名">
          <el-input placeholder="请输入商品名" v-model="userForm2.itemname" type="text" style="width: 220px;"></el-input>
        </el-form-item>
        <el-form-item label="保质期">
          <el-input placeholder="请输入保质期" v-model="userForm2.itemtime" type="text" style="width: 220px;"></el-input>
        </el-form-item>
        <el-form-item label="价格">
          <el-input placeholder="请输入价格" v-model="userForm2.price" type="text" style="width: 220px;"></el-input>
        </el-form-item>
        <el-form-item label="时间">
          <el-date-picker
            v-model="userForm2.time"
            type="datetime"
            placeholder="请选择日期"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="销售量">
          <el-input placeholder="请输入销售量" v-model="userForm2.sold" type="text" style="width: 220px;"></el-input>
        </el-form-item>
        <el-form-item label="评分">
          <!-- <el-rate v-model="userForm.grade" style="width: 220px;"></el-rate> -->
          <el-input placeholder="请输入评分" v-model="userForm2.grade" type="text" style="width: 220px;"></el-input>
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
  articleData,
  articleDelete,
  articleInsert,
  articleUpdate
} from '@/api/ArticleApi'

export default {
  name: 'MyCommodity',
  data() {
    return {
      dialogVisible: false,
      dialogVisible2: false,
      currentPage: 1,
      size: 10,
      total: 10,
      form: {
        itemname: '',
        itemtime: ''
      },
      userForm: {
        trademark: '',
        itemname: '',
        itemtime: '',
        price: '',
        time: '',
        sold: '',
        grade: ''
      },
      userForm2: {
        trademark: '',
        itemname: '',
        itemtime: '',
        price: '',
        time: '',
        sold: '',
        grade: ''
      },
      rules: {
      },
      tableData: [],
      loading: false
    }
  },
  methods: {
    dateFormat(row, column) {
      // 获取单元格数据
      const data = row[column.property]
      if (data === null) {
        return null
      }

      const dt = new Date(data)
      return dt.getFullYear() + '-' + (dt.getMonth() + 1) + '-' + dt.getDate() + ' ' + dt.getHours() + ':' + dt.getMinutes() + ':' + dt.getSeconds()
    },
    reset() {
      this.form.itemname = ''
      this.form.itemtime = ''
    },
    userAdmin() {
      this.loading = true
      articleData(this.form).then(res => {
        setTimeout(() => {
          this.loading = false
        }, 500)
        this.tableData = res
        this.total = res.length
        console.log(res)
      })
    },
    updateUser(scope) {
      console.log(scope)
      this.userForm2.trademark = scope.trademark
      this.userForm2.itemname = scope.itemname
      this.userForm2.itemtime = scope.itemtime
      this.userForm2.price = scope.price
      this.userForm2.time = scope.time
      this.userForm2.sold = scope.sold
      this.userForm2.grade = scope.grade
      this.dialogVisible2 = true
    },
    update() {
      console.log()
      articleUpdate(this.userForm2).then(res => {
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
    rate(id) {
      console.log(id)
    },
    remove(id) {
      this.$confirm('是否删除该项, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        articleDelete({
          trademark: id.trademark
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
      articleInsert(this.userForm).then(res => {
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
