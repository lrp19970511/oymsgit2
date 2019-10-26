<template>
  <div id="shoppingContent">
    <el-col :span="24">
      <el-button
        type="primary"
        round
        id="add_btn"
        @click="addGood()"
      >添加商品</el-button>
    </el-col>
    <!-- 添加商品 -->
    <div v-if="showAddGood">
      <el-form
        ref="goodform"
        :model="goodform"
        label-width="80px"
      >
        <el-form-item
          label="商品名称"
          prop="goodname"
          :rules="nameRule"
        >
          <el-input
            v-model="goodform.goodname"
            style="width:200px"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="商品类型"
          prop="goodtype"
          :rules="typeRule"
        >
          <el-select
            v-model="goodform.goodtype"
            placeholder="请选择商品类型"
            >
            <el-option
              label="女装"
              value="女装"
            ></el-option>
            <el-option
              label="男装"
              value="男装"
            ></el-option>
          </el-select>

        </el-form-item>
        <el-form-item
          label="商品价格"
          prop="goodprice"
          :rules="priceRule"
        >
          <el-input
            v-model="goodform.goodprice"
            style="width:200px"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="商品数量"
          prop="goodnum"
          :rules="numRule"
        >
          <el-input
            v-model="goodform.goodnum"
            style="width:200px"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="添加图片"
          prop="imageUrl"
        >
          <el-upload
            class="avatar-uploader"
            action="http://localhost:8001/file/upload"
            name="imgUpload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
            :header="token"
          >
            <img
              v-if="goodform.goodImgUrl"
              :src="goodform.goodImgUrl"
              class="avatar"
            />
            <i
              v-else
              class="el-icon-plus avatar-uploader-icon"
            ></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="商品描述">
          <el-input
            type="textarea"
            v-model="goodform.gooddesc"
            id="gooddesc"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            @click="onSubmit('goodform')"
          >添加</el-button>
          <el-button @click="shutadd()">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- 显示商品 -->
    <div v-else>

         <el-table style="width: 100%;" :data='goodList'
                    >
                        <el-table-column type="index" width="50">    
                        </el-table-column>
                        <el-table-column label="商品名称" prop="goodname" width="180">    
                        </el-table-column>
                        <el-table-column label="商品类型" prop="name" width="180">    
                        </el-table-column>
                        <el-table-column label="商品价格" prop="goodprice" width="100">    
                        </el-table-column>
                        <el-table-column label="商品数量" prop="goodnum" width="100">    
                        </el-table-column>
                        <el-table-column label="商品图片" prop="goodimgurl" width="200">    
                        </el-table-column>  
                         <el-table-column label="商品描述" prop="gooddesc" width="200">    
                        </el-table-column>  
                    </el-table>
                        <el-pagination
                            layout="total, sizes, prev, pager, next, jumper"
                            >    
                    </el-pagination>
    </div>
  </div>
</template>
<script>
export default {
  name: "shoppingContent",
  data() {
    return {
      token: "dasad",
      showAddGood: false,
      goodform: {
        goodname: "",
        goodtype: "",
        goodprice:"",
        goodnum:"",
        gooddesc: "",
        goodImgUrl:"",
      },
      goodList:[],
      pagesize:10,
      currentPage:1,
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
      nameRule: {required: true, message: "请输入商品名称"},
      numRule: [
        {required: true, message: "请输入商品数量", trigger: "blur"},
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
        typeRule:{required: true, message: "请选择商品类型"},
    }
  },
  methods: {
    //上传图片功能
      handleAvatarSuccess(res, file) {
      if(res.isSuccess){
      this.goodform.goodImgUrl = res.message;
      }else{
        alert("图片上传失败");
        return 
      }
    },
     beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg" || file.type === "image/png" ||file.type === "image/jpg";
      const isLt2M = file.size / 1024 / 1024 < 10;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 或者 png 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 10MB!");
      }
      return isJPG && isLt2M;
    },
    //切换增加和显示
    addGood() {
      console.log(this.goodList)
      this.showAddGood = !this.showAddGood;
    },
    //提交添加商品
    onSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$axios
              .post("/goods/add", {
                goodName: this.goodform.goodname,
                goodtype: this.goodform.goodtype,
                goodprice: this.goodform.goodprice,
                goodnum: this.goodform.goodnum,
                gooddesc: this.goodform.gooddesc,
                goodImgUrl: this.goodform.goodImgUrl,
              })
              .then((response) => {
                if(!response.data.isSuccess){
                  alert("添加商品失败")
                  return
                }else{
                  alert("添加成功")
                  this.showGoods()
                  this.shutadd();

                }
              })
              .catch(function(error) {
                console.log(error);
              });
        }else {
            console.log('error submit!!');
            return false;
          }
      })
    },
    //关闭增加商品
    shutadd() {
      this.$refs.goodform.resetFields();
      this.showAddGood = !this.showAddGood;
    },
    //请求所有商品数据
    showGoods() {
      this.$axios
              .get("/goods/show").then(res => {
                this.goodList = res.data.data
                console.log(this.goodList)
            })
    }
  },
  created(){
    this.showGoods()
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
</style>