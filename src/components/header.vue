<template>
  <div id="header">
    <el-col>
      <el-col :span="15">
        <div class="title">OY智能商城后台管理系统</div>
      </el-col>
      <el-col :span="9">
        <el-row class="rightNav">
          <el-button type="success" plain>登录</el-button>
          <router-link to="/register" tag="div">
            <el-button type="success" plain>注册</el-button>
          </router-link>
          <div id="settingIcon">
            <i class="el-icon-s-tools"></i>
          </div>
        </el-row>
      </el-col>
    </el-col>
  </div>
</template>

<script>
export default {
  name: "Head"
};
</script>

<style>
.rightNav .el-button--success.is-plain {
  background: rgb(95, 99, 104);
  height: 40px;
  width: 80px;
  margin-top: 10px;
  margin-right: 10px;
  border: none;
}
#settingIcon {
  font-size: 30px;
}
.rightNav {
  display: flex;
  float: right;
}
.title {
  font-size: 28px;
  text-align: left;
  margin-left: 60px;
  font-weight: 600;
  color: rgb(194, 150, 150);
}
</style>