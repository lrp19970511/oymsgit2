<template>
  <div id="header">
    <el-col>
      <el-col :span="8">
        <div class="title">OY智能商城后台管理系统</div>
      </el-col>
      <el-col :span="6" :offset="10">
        <el-row class="rightNav">
          <el-button type="success" plain>登录</el-button>
          <el-button type="success" plain>注册</el-button>
          <i class="el-icon-s-tools"></i>
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
.set  {
  display: inline-block;
  height: 60px;
  font-size: 24px;
  margin: 0 15px;
}
.title {
  font-size: 28px;
  text-align: center;
  font-weight: 600;
  color: rgb(194, 150, 150);
}
</style>