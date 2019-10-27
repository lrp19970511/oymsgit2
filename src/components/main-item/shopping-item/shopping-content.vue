<template>
  <div id="shoppingContent">
    <el-row>
      <el-col :span="12">
        <h3 id="shoppingTitle">{{shoppingTitle}}</h3>
      </el-col>
      <el-col :span="5" :offset="7" id="search">
        <el-input
          v-model="serchText"
          placeholder="请输入要搜索的商品名称"
          id="searchContent"
          type="text"
          prefix-icon="el-icon-search"
        ></el-input>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-button v-show="showGoodAddBtn" type="primary" round id="add_btn" @click="addGood()">添加商品</el-button>

        <el-button
          v-show="showGoodBtn"
          type="primary"
          round
          id="add_btn"
          @click="showGoodList()"
        >商品管理</el-button>

        <el-button type="primary" round id="add_btn" @click="manageGoodType">管理商品类型</el-button>
      </el-col>
    </el-row>
    <!-- 添加商品 -->
    <div v-if="type === 'addOrModify'">
      <el-form ref="goodform" :model="goodform" label-width="80px">
        <el-form-item label="商品名称" prop="goodname" :rules="nameRule">
          <el-input v-model="goodform.goodname" style="width:200px"></el-input>
        </el-form-item>
        <el-form-item label="商品类型" prop="goodtype" :rules="typeRule">
          <el-select v-model="goodform.goodtype" placeholder="请选择商品类型">
            <el-option label="女装" value="女装"></el-option>
            <el-option label="男装" value="男装"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商品价格" prop="goodprice" :rules="priceRule">
          <el-input v-model="goodform.goodprice" style="width:200px"></el-input>
        </el-form-item>
        <el-form-item label="商品数量" prop="goodnum" :rules="numRule">
          <el-input v-model="goodform.goodnum" style="width:200px"></el-input>
        </el-form-item>
        <el-form-item label="添加图片" prop="imageUrl">
          <el-upload
            class="avatar-uploader"
            action="http://localhost:8001/file/upload"
            name="imgUpload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
            :on-error="uploadError"
            :header="token"
          >
            <img v-if="goodform.goodImgUrl" :src="goodform.goodImgUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="商品描述">
          <el-input type="textarea" v-model="goodform.gooddesc" id="gooddesc"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit('goodform')">提交</el-button>
          <el-button @click="shutadd()">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- 商品类型管理 -->
    <div v-else-if="type === 'manageType'">
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
        style="width: 54%; margin-top: 20px"
      >
        <el-table-column type="index" label="ID" width="50px"></el-table-column>
        <el-table-column prop="goodType" label="商品父类型" width="200px" name></el-table-column>
        <el-table-column prop="subType" label="商品子类型" width="200px"></el-table-column>
        <el-table-column label="操作" width="203px">
          <template slot-scope="scope">
            <el-button
              type="primary"
              icon="el-icon-edit"
              circle
              @click="modifyGood(scope.$index+(currentPage-1)*10)"
            ></el-button>

            <el-button
              type="danger"
              icon="el-icon-delete"
              circle
              @click="deleteMessage(goodList[scope.$index+(currentPage-1)*10].id)"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 显示商品 -->
    <div v-else>
      <el-table
        style="width: 100%;"
        :data="goodList.slice((currentPage-1)*pagesize,currentPage*pagesize)"
      >
        <el-table-column type="index" width="50"></el-table-column>
        <el-table-column label="商品名称" prop="goodname" width="180"></el-table-column>
        <el-table-column label="商品类型" prop="goodtype" width="180"></el-table-column>
        <el-table-column label="商品价格" prop="goodprice" width="100"></el-table-column>
        <el-table-column label="商品数量" prop="goodnum" width="100"></el-table-column>
        <el-table-column label="商品图片" width="100">
          <template slot-scope="scope">
            <img
              style="width:40px;height:40px;"
              :src="goodList[scope.$index+(currentPage-1)*10].goodimgurl"
            />
          </template>
        </el-table-column>
        <el-table-column label="商品描述" prop="gooddesc" width="200"></el-table-column>
        <el-table-column label="操作" width="200">
          <template slot-scope="scope">
            <el-button
              type="primary"
              icon="el-icon-edit"
              circle
              @click="modifyGood(scope.$index+(currentPage-1)*10)"
            ></el-button>

            <el-button
              type="danger"
              icon="el-icon-delete"
              circle
              @click="deleteMessage(goodList[scope.$index+(currentPage-1)*10].id)"
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
  </div>
</template>

<script>
export default {
  name: "shoppingContent",
  data() {
    return {
      pos:"",//计算行列
      showGoodAddBtn: true,
      showGoodBtn: false,
      shoppingTitle: "商品管理",
      type: "", //根据状态选择看见特点组件
      serchText: "",
      modifyId: "",
      total: 1000,
      token: "dasad",
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
      SpanArr:[],
      subType: "",
      // showAddGood: false,
      goodform: {
        goodname: "",
        goodtype: "",
        goodprice: "",
        goodnum: "",
        gooddesc: "",
        goodImgUrl: ""
      },
      goodTypeList:[],
      goodList: [],
      FgoodList: [],
      pagesize: 10,
      currentPage: 1,
      //价格规则限制
      priceRule: [
        { required: true, message: "请输入价格", trigger: "blur" },
        {
          validator(rule, value, callback) {
            var reg = /^-?\d{1,5}(?:\.\d{1,2})?$/;
            if (reg.test(value)) {
              callback();
            } else {
              callback(new Error("请输入大于零小于十万不超过两位小数的数字"));
            }
          },
          trigger: "blur"
        }
      ],
      nameRule: { required: true, message: "请输入商品名称" },
      numRule: [
        { required: true, message: "请输入商品数量", trigger: "blur" },
        {
          validator(rule, value, callback) {
            var reg = /^([1-9]\d{0,3}|1000)$/;
            if (reg.test(value)) {
              callback();
            } else {
              callback(new Error("请输入1到10000的整数"));
            }
          },
          trigger: "blur"
        }
      ],
      typeRule: { required: true, message: "请选择商品类型" }
    };
  },
  methods: {
    //上传图片功能
    handleAvatarSuccess(res, file) {
      if (res.isSuccess) {
        this.goodform.goodImgUrl = res.message;
      } else {
        alert("图片上传失败");
        return;
      }
    },
    beforeAvatarUpload(file) {
      const isJPG =
        file.type === "image/jpeg" ||
        file.type === "image/png" ||
        file.type === "image/jpg";
      const isLt2M = file.size / 1024 / 1024 < 1;

      if (!isJPG) {
        this.$message.error("上传图片只能是 JPG 或者 png 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传图片大小不能超过 1MB!");
      }
      return isJPG && isLt2M;
    },
    uploadError(err, file) {
      console.log(err);
    },
    //切换增加和显示
    addGood() {
      (this.goodform.goodname = ""),
        (this.goodform.goodtype = ""),
        (this.goodform.goodnum = ""),
        (this.goodform.goodprice = ""),
        (this.goodform.goodImgUrl = ""),
        (this.goodform.gooddesc = ""),
        (this.modifyId = ""),
        (this.type = "addOrModify");
      this.shoppingTitle = "添加商品";
    },
    //显示列表
    showGoodList() {
      this.showGoodBtn = false;
      this.showGoodAddBtn = true;
      this.shoppingTitle = "商品管理";
      this.type = "";
    },
    //显示商品类型
    showGoodType() {
      this.$axios.get("/goods/showType").then(res => {
        console.log(res)
        this.goodTypeList = res.data.data;
        this.total = this.goodTypeList.length;
         for(var i = 0;i<this.goodTypeList.length;i++){
        if (i === 0){
          this.SpanArr.push(1);
          this.pos = 0
        }else{
          //判断当前元素与上个元素是否相同
          if(this.goodTypeList[i].goodType == this.goodTypeList[i-1].goodType){
            this.SpanArr[this.pos] += 1;
            this.SpanArr.push(0);
          }else{
            this.SpanArr.push(1);
            this.pos = i;
          }
        }
      }
      });
    },
    //管理商品类型
    manageGoodType() {
      this.showGoodAddBtn = false;
      this.showGoodBtn = true;
      this.type = "manageType";
      this.shoppingTitle = "商品类型管理";
      this.showGoodType()
    },
    //添加类型
    addType() {
      this.$axios
        .post("/goods/addType", {
          subType: this.subType,
          goodType: this.goodType
        })
        .then(response => {
          if (!response.data.isSuccess) {
            alert("添加商品类型失败");
            return;
          } else {
            alert("提交成功");
            this.showGoodType();
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    //合并行列
    renderTable({ row, column, rowIndex, columnIndex }) {
      console.log(this.SpanArr[3])
        if(columnIndex === 1){
          const rows = this.SpanArr[rowIndex];
        return{
          rowspan:rows,
          colspan:1
        }
        }
        
    },
    //提交添加商品
    onSubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$axios
            .post("/goods/add", {
              goodName: this.goodform.goodname,
              goodtype: this.goodform.goodtype,
              goodprice: this.goodform.goodprice,
              goodnum: this.goodform.goodnum,
              gooddesc: this.goodform.gooddesc,
              goodImgUrl: this.goodform.goodImgUrl,
              modifyId: this.modifyId
            })
            .then(response => {
              console.log(this.modifyId);
              if (!response.data.isSuccess) {
                alert("提交商品失败");
                return;
              } else {
                alert("提交成功");
                this.showGoods();
                this.shutadd();
              }
            })
            .catch(function(error) {
              console.log(error);
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    //关闭增加商品
    shutadd() {
      (this.goodform.goodname = ""),
        (this.goodform.goodtype = ""),
        (this.goodform.goodnum = ""),
        (this.goodform.goodprice = ""),
        (this.goodform.goodImgUrl = ""),
        (this.goodform.gooddesc = ""),
        (this.modifyId = ""),
        this.$refs.goodform.resetFields();
      this.type = "";
    },
    //请求所有商品数据
    showGoods() {
      this.$axios.get("/goods/show").then(res => {
        this.FgoodList = res.data.data;
        this.goodList = res.data.data;
        this.total = this.goodList.length;
        console.log(this.goodList);
        console.log(this.total);
      });
    },
    
    //分页函数
    handleSizeChange(val) {
      this.pagesize = val;
    },
    handleCurrentChange(val) {
      this.currentPage = val;
    },
    //删除信息
    deleteMessage(id) {
      this.$confirm("此操作将删除该商品, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$axios
            .get("/goods/isdelete", {
              params: {
                goodId: id
              }
            })
            .then(response => {
              console.log(response);
              if (response.data.isSuccess) {
                this.$message({
                  type: "success",
                  message: "删除成功!"
                });
                this.showGoods();
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
    },
    modifyGood(index) {
      (this.goodform.goodname = this.goodList[index].goodname),
        (this.goodform.goodtype = this.goodList[index].goodtype),
        (this.goodform.goodnum = this.goodList[index].goodnum),
        (this.goodform.goodprice = this.goodList[index].goodprice),
        (this.goodform.goodImgUrl = this.goodList[index].goodimgurl),
        (this.goodform.gooddesc = this.goodList[index].gooddesc),
        (this.modifyId = this.goodList[index].id),
        (this.type = "addOrModify");
    }
  },
  watch: {
    serchText(val) {
      this.goodList = this.FgoodList;
      this.goodList = this.goodList.filter(
        value => value.goodname.indexOf(this.serchText) !== -1
      );
    }
  },
  created() {
    this.showGoods();
  }
};
</script>

<style>
#add_btn {
  margin: 10px 0 18px 25px;
}
#gooddesc {
  width: 40%;
  line-height: 3.5;
}
/* 头像 */
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
#shoppingTitle {
  margin-top: 0;
  margin-left: 30px;
  font-family: Microsoft YaHei;
  font-weight: 700;
  font-size: 35px;
  color: rgb(36, 133, 230);
}
#search {
  width: 20%;
}
/*
#searchContent {
  width: 40%;
  float: right;
  margin-right: 30px;
} */
.cell {
  text-align: center;
}
</style>