<template>
  <div id="Register">
    <div class="bg_layout">
      <div class="form_layout">
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="用户名" prop="name">
            <el-input v-model="ruleForm.name"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model="ruleForm.password"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="isPassword">
            <el-input v-model="ruleForm.isPassword"></el-input>
          </el-form-item>
          <el-form-item label="上传头像" prop="imageUrl">
            <el-upload
              class="avatar-uploader"
              action="https://jsonplaceholder.typicode.com/posts/"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
            >
              <img v-if="imageUrl" :src=imageUrl class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>

          <el-row class="clickBtn">
            <el-button type="primary" @click="submitForm('ruleForm')">注册</el-button>
            <el-button @click="exitForm">取消</el-button>
         </el-row>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Register",
  data() {
    return {
      ruleForm: {
        name: "",
        password: "",
        isPassword: "",
        imageUrl: ""
      },
      rules: {
        name: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        password:[
            { required: true, message: "请输入密码", trigger: "blur" },
          { min: 8, max: 15, message: "长度在 8 到 15 个字符", trigger: "blur" }
        ],
        isPassword:[
            { required: true, message: "请输入确认密码", trigger: "blur" },
          { min: 8, max: 15, message: "长度在 8 到 15 个字符", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    exitForm() {
       this.$router.go(-1);//返回上一层
    }
  }
};
</script>

<style>
/* 透明层背景 */
.bg_layout {
  position: absolute;
  width: 100%;
  height: 1000px;
  z-index: 999;
  margin-top: -970px;
  background-color: rgba(0, 0, 0, 0.7);
}
/* 主要内容的容器 */
.form_layout {
  width: 400px;
  height: 500px;
  margin: 200px auto;
  background-color: #f5f5f5;
  border-radius: 10px;
}
.demo-ruleForm {
  padding-top: 33px;
  padding-right:50px ;
  padding-left:50px ;
}
/* 底部注册栏 */
.clickBtn{
  display: flex;
  justify-content: space-around;
}
.clickBtn .el-button{
  width: 200px;
}
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