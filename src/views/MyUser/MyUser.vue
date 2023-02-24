<template>
  <div id="user">
    <el-row>
      <el-col :span="8">
        <div style="background-color: rgba(255, 255, 255, 1); padding: 0 0;box-shadow: -1px 1px 1px rgba(204, 204, 204, .2); border-radius: 2px;">
          <div style="padding: 10px 0 10px 0;">
            <el-avatar src="https://cn.gravatar.com/avatar/1514086847623053314?s=164&d=monsterid" :size="80"></el-avatar>
            <div>
              <p>admin</p>
            </div>
            <div>
              <hr style="border-bottom: 0; border-left: 0; border-right: 0; border-top: 1px solid rgba(204, 204, 204, .5)"/>
            </div>
            <div style="text-align:left; margin: 25px 0 25px 15px;">
              <span style="font-size: .9em;">入驻时间:<span style="margin-left: 20px;">2023/01/01 11:04:29</span></span>
            </div>
            <div style="text-align:left; margin: 25px 0 25px 15px;">
              <span style="font-size: .9em;">个人简介:<span style="margin-left: 20px;">您没有个人简介哦~</span></span>
            </div>
          </div>
        </div>
        <div style="margin-top: 25px;background-color: rgba(255, 255, 255, 1); padding: 0 0;box-shadow: 0px 0px 1px 1px rgba(204, 204, 204, .2); border-radius: 2px;">
          <el-table
            :data="tableData"
            style="width: 100%">
            <el-table-column
              prop="username"
              label="用户"
              width="100">
            </el-table-column>
            <el-table-column
              prop="itemname"
              label="购买的物品"
              width="140">
            </el-table-column>
            <el-table-column
              prop="price"
              label="价格">
            </el-table-column>
            <el-table-column
              prop="num"
              label="购买次数">
            </el-table-column>
          </el-table>
        </div>
      </el-col>
      <el-col :span="16">
        <div style="margin-left: 25px;background-color: rgba(255, 255, 255, 1); padding: 0 0;box-shadow: 0px 0px 1px 1px rgba(204, 204, 204, .2); border-radius: 2px;">
          <div id="myuser" style="width: 820px;height: 270px;"></div>
        </div>
        <div style="width: 46.5%; margin-left: 20px; display: inline-block; margin-top: 25px;background-color: rgba(255, 255, 255, 1); padding: 0 0;box-shadow: 0px 0px 1px 1px rgba(204, 204, 204, .2); border-radius: 2px;">
          <div id="myuser2" style="width: 400px; height: 240px;"></div>
        </div>
        <div style="width: 47%; display: inline-block;margin-left: 25px; margin-top: 25px;background-color: rgba(255, 255, 255, 1); padding: 0 0;box-shadow: 0px 0px 1px 1px rgba(204, 204, 204, .2); border-radius: 2px;">
          <div id="myuser3" style="width: 400px; height: 240px;"></div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import {
  getItem
} from '@/api/ItemApi'

export default {
  name: 'MyUser',
  data() {
    return {
      echarts: this.$echarts,
      tableData: []
    }
  },
  methods: {
    getItem() {
      getItem().then(res => {
        this.tableData = res
        console.log(res)
      })
    },
    myUser() {
      var chartData = document.getElementById('myuser')
      var myChart = this.echarts.init(chartData)
      var option = {
        title: {
          text: '用户活跃信息表'
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['张三', '赵强', '一只', '李四', 'Search Engine']
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: ['一月', '二月', '三月', '四月', '五月', '六月']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name: '张三',
            type: 'line',
            stack: 'Total',
            data: [120, 102, 101, 134, 90, 230, 210]
          },
          {
            name: '李四',
            type: 'line',
            stack: 'Total',
            data: [220, 12, 191, 234, 290, 330, 30]
          },
          {
            name: '赵强',
            type: 'line',
            stack: 'Total',
            data: [150, 232, 201, 14, 190, 330, 40]
          },
          {
            name: '一只',
            type: 'line',
            stack: 'Total',
            data: [50, 32, 31, 334, 390, 330, 200]
          }
        ]
      }
      myChart.setOption(option)
    },
    myUser2() {
      var chartDom = document.getElementById('myuser2')
      var myChart = this.echarts.init(chartDom)
      var option = {
        xAxis: {
          type: 'category',
          data: ['一月', '二月', '三月', '四月', '五月', '六月']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            data: [
              120,
              {
                value: 500,
                itemStyle: {
                  color: '#a90000'
                }
              },
              150,
              80,
              70,
              110,
              130
            ],
            type: 'bar'
          }
        ]
      }
      myChart.setOption(option)
    },
    myUser3() {
      var chartDom = document.getElementById('myuser3')
      var myChart = this.echarts.init(chartDom)
      var option = {
        title: {
          text: '物品售出量',
          left: 'center'
        },
        tooltip: {
          trigger: 'item'
        },
        series: [
          {
            name: 'Access From',
            type: 'pie',
            radius: '50%',
            data: [
              { value: 1048, name: '茶币' },
              { value: 735, name: '篮球' },
              { value: 580, name: '足球' },
              { value: 484, name: '洗衣机' },
              { value: 300, name: '桌椅' }
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      }
      myChart.setOption(option)
    }
  },
  created() {
    this.getItem()
  },
  mounted() {
    this.myUser()
    this.myUser2()
    this.myUser3()
  }
}
</script>

<style>
  #user {
    /* background-color: rgba(204, 204, 204, .3); */
    height: 100%;
  }
</style>
