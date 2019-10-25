<template>
  <div id="Register">
    <div class="bg_layout">
      <div class="form_layout">
        <!--  -->
        <div class="fun_head">登录</div>
      
          <el-form
            :model="ruleForm"
            :rules="rules"
            ref="ruleForm"
            label-width="100px"
            class="demo-ruleForm ab_parent"
          >
            <el-form-item label="用户名" prop="name">
              <el-input v-model="ruleForm.name" prefix-icon="el-icon-user" placeholder="请输入用户名"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input
                v-model="ruleForm.password"
                prefix-icon="el-icon-lock"
                placeholder="请输入密码"                
                 type="password"
              ></el-input>
            </el-form-item>
            <el-form-item label="验证码" prop="captcha_code">
               <el-input  placeholder="请输入验证码"></el-input>
            </el-form-item>
            <div class="clickBtn my_footer">
              <el-button type="success" plain @click="submitForm('ruleForm')">登录</el-button>
              <el-button type="success" plain @click="exitForm">取消</el-button>
            </div>
          </el-form>
        
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Login",
  data() {
    return {
      ruleForm: {
        name: "",
        password: ""
      },
      loginForm: {
        captcha_key: "",
        captcha_code: ""
      },
      rules: {
        name: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 8, max: 15, message: "长度在 8 到 15 个字符", trigger: "blur" }
        ]
      }
    };
  },

  methods: {
  
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
      this.$router.go(-1); //返回上一层
    }
  }
};
</script>

<style>
/* 透明层背景 */
.fun_head {
  margin: 0 auto;

  height: 60px;
  line-height: 60px;
  background-color: #67c23a;
  text-align: center;
  color: #fff;
  border-radius: 10px 10px 0 0;
}
.form_layout .el-container{}
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
  padding-top: 15px;
  padding-right: 50px;
  padding-left: 50px;
}
.ab_parent {
  height: 425px;
  position: relative;
}

/* 底部注册栏 */
.clickBtn {
}
.clickBtn .el-button {
  height: 40px;
  width: 145px !important;
}
.my_footer {
  position: absolute;
  bottom: 20px;
}
</style>