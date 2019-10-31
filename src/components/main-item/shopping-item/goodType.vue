<template>
  <div id="goodType">
    <el-row style="width:100%">
      <el-col :span="7">
        一级标题:
        <template>
          <el-select
            v-model="parentType"
            :filterable="true"
            :allow-create="true"
            :default-first-option="true"
            placeholder="商品父类型添加"
          >
            <el-option v-for="item in typeOptions" :key="item" :value="item"></el-option>
          </el-select>
        </template>
      </el-col>
      <el-col :span="7">
        二级标题:
        <template>
          <el-input placeholder="商品子类型添加" v-model="goodType" clearable style="width:220px;"></el-input>
        </template>
      </el-col>
      <el-col :span="2">
        <el-button type="primary" icon="el-icon-plus" circle @click="addType"></el-button>
      </el-col>
    </el-row>
    <!-- 商品类型table -->
    <el-table
      :data="goodTypeList.slice((currentPage-1)*pagesize,currentPage*pagesize)"
      :span-method="renderTable"
      border
      style="width: 58%; margin-top: 20px"
    >
      <el-table-column type="selection" min-width="12%"></el-table-column>
      <el-table-column type="index" label="序号" min-width="12%"></el-table-column>
      <el-table-column prop="pname" label="商品父类型" min-width="30%"></el-table-column>
      <el-table-column prop="cname" label="商品子类型" min-width="30%"></el-table-column>
      <el-table-column label="操作" width="203px">
        <template slot-scope="scope">
          <el-button type="primary" icon="el-icon-edit" circle></el-button>
          <el-button
            type="danger"
            icon="el-icon-delete"
            circle
            @click="deleteGoodType(goodTypeList[scope.$index+(currentPage-1)*10].id)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页控制 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="pagesize"
      layout="sizes, prev, pager, next"
      :total="total"
    ></el-pagination>
  </div>
</template>
<script>
export default {
  name: "goodType",
  data() {
    return {
      goodTypeTable: false,
      pos: "", //计算行列
      serchText: "", //搜索内容
      //管理商品类型选择器
      typeOptions: [],
      parentType: [],
      SpanArr: [], //获取表格合并行列数
      goodType: "", //商品子类型
      goodTypeList: [], //获取所有商品类型
      pagesize: 10,
      currentPage: 1,
      total: 1000
    };
  },

  methods: {
    //添加商品类型
    addType() {
      const that =this
      if (
        this.parentType != null &&
        this.parentType != "" &&
        this.parentType != undefined
      ) {
        for (var j = 0; j < this.goodTypeList.length; j++) {
          if (this.goodType == this.goodTypeList[j].cname) {
            alert("子类型已存在，请重新输入");
            return;
          }
        }
        var params = new URLSearchParams()
        params.append('cname',this.goodType)
        params.append('pname',this.parentType)
        this.$axios
          .post("/goods/addType",params)
          .then(response => {
            if (!response.data.isSuccess) {
              this.$error({
                type: "error",
                message: "提交失败!"
              });
              return;
            } else {
              this.$message({
                type: "success",
                message: "提交成功!"
              });
              this.showGoodType();
            }
          })
          .catch(err => {
            console.log(error);
          });
      } else {
        alert("请选择父类型");
      }
    },
    //计算要合并的行列
    getRowAndColumn(arr) {
      this.SpanArr = [];
      // for(var j = 0; j < arr.length; j++){
      for (var i = 0; i < arr.length; i++) {
        if (i === 0 ) {
          this.SpanArr.push(1);
          this.pos = 0;
        } else {
          //判断当前元素与上个元素是否相同
          if (i % 10 != 0) {
            if (arr[i].pname == arr[i - 1].pname) {
              this.SpanArr[this.pos] += 1;
              this.SpanArr.push(0);
            } else {
              this.SpanArr.push(1);
              this.pos = i;
            }
          }else{
            this.SpanArr.push(1);
            this.pos = i;
          }
        }
      }
      //   i = 0;
      // }
    },
    //合并行列
    renderTable({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 2) {
        const rows = this.SpanArr[rowIndex + (this.currentPage - 1) * 10];
        return {
          rowspan: rows,
          colspan: 1
        };
      }
    },
    //分页函数
    handleSizeChange(val) {
      this.pagesize = val;
    },
    handleCurrentChange(val) {
      this.currentPage = val;
    },
    //显示商品类型并计算要合并的行列数
    showGoodType() {
      this.$axios.get("/goods/showType").then(res => {
        this.goodTypeList = res.data.data;
        this.total = this.goodTypeList.length;
        this.getRowAndColumn(this.goodTypeList);

        //计算去重后的夫类型
        //数组去重方法
        let a = [];
        for (let value of this.goodTypeList) {
          a.push(value.pname);
        }
        for (var i = 0; i < a.length; i++) {
          if (this.typeOptions.indexOf(a[i]) === -1) {
            this.typeOptions.push(a[i]);
          }
        }
      });
    },
    //删除子类型
    deleteGoodType(id) {
      this.$confirm("此操作将删除该商品, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$axios
            .get("/goods/goodTypedelete", {
              params: {
                goodTypeId: id
              }
            })
            .then(response => {
              if (response.data.isSuccess) {
                this.$message({
                  type: "success",
                  message: "删除成功!"
                });
                this.showGoodType();
              } else {
                this.$message({
                  type: "error",
                  message: "删除失败"
                });
              }
            })
            .catch(function(error) {
              console.log(error);
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    }
  }
};
</script>

<style>
</style>