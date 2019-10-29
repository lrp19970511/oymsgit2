<template>
  <div id="goodType">
    <el-row :gutter="20">
      <el-col :span="6">
        一级标题:
        <template>
          <el-select
            v-model="goodType"
            :filterable="true"
            :allow-create="true"
            :default-first-option="true"
            placeholder="商品父类型添加"
          >
            <el-option v-for="item in typeOptions" :key="item.goodType" :value="item.goodType"></el-option>
          </el-select>
        </template>
      </el-col>
      <el-col :span="6">
        二级标题:
        <template>
          <el-input placeholder="商品子类型添加" v-model="subType" clearable style="width:220px;"></el-input>
        </template>
      </el-col>
      <el-col :span="2">
        <el-button type="primary" icon="el-icon-plus" circle @click="addType"></el-button>
      </el-col>
    </el-row>
    <!-- 商品类型table -->
    <el-table
      :data="goodTypeList"
      :span-method="renderTable"
      border
      style="width: 58%; margin-top: 20px"
    >
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column type="index" label="序号" width="50px"></el-table-column>
      <el-table-column prop="goodType" label="商品父类型" width="200px"></el-table-column>
      <el-table-column prop="subType" label="商品子类型" width="200px"></el-table-column>
      <el-table-column label="操作" width="203px">
        <template slot-scope="scope">
          <el-button type="primary" icon="el-icon-edit" circle></el-button>
          <el-button type="danger" icon="el-icon-delete" circle></el-button>
        </template>
      </el-table-column>
    </el-table>
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
      typeOptions: [
        {
          goodType: "衣服"
        },
        {
          goodType: "帽子"
        },
        {
          goodType: "鞋子"
        }
      ],
      goodType: [],
      SpanArr: [], //获取表格合并行列数
      subType: "", //商品子类型
      goodTypeList: [] //获取所有商品类型
    };
  },

  methods: {
    //添加商品类型
    addType() {
      this.$axios
        .post("/goods/addType", {
          subType: this.subType,
          goodType: this.goodType
        })
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
    }, 
    //计算要合并的行列
    getRowAndColumn(arr) {
      this.SpanArr = [];
      for (var i = 0; i < arr.length; i++) {
        if (i === 0) {
          this.SpanArr.push(1);
          this.pos = 0;
        } else {
          //判断当前元素与上个元素是否相同
          if (arr[i].goodType == arr[i - 1].goodType) {
            this.SpanArr[this.pos] += 1;
            this.SpanArr.push(0);
          } else {
            this.SpanArr.push(1);
            this.pos = i;
          }
        }
      }
    },
        //合并行列
    renderTable({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 2) {
        const rows = this.SpanArr[rowIndex];
        return {
          rowspan: rows,
          colspan: 1
        };
      }
    },
        //显示商品类型并计算要合并的行列数
    showGoodType() {
      this.$axios.get("/goods/showType").then(res => {
        this.goodTypeList = res.data.data;
        this.total = this.goodTypeList.length;
        this.getRowAndColumn(this.goodTypeList);
      });
    },
  },
  mounted() {
    this.showGoodType();
  }
};
</script>

<style>
</style>