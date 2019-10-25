<template>
  <div id="header">
    <el-col>
      <el-col :span="15">
        <div class="title">OY智能商城后台管理系统</div>
      </el-col>
      <el-col :span="9">
        <el-row>
          <el-row v-if="showBtn != null" class="userContent">
            <div id="settingIcon">
              <i class="el-icon-s-tools"></i>
            </div>
            <h2 class="name" >{{showBtn}}</h2>
            <div class="user_avatar">
              <img :src="userUrl" class="avatar" style="width:40px;height:40px;" />
            </div>
          </el-row>
          <div v-else class="rightNav">
            <router-link to="/login" tag="div">
              <el-button type="success" plain>登录</el-button>
            </router-link>
            <router-link to="/register" tag="div">
              <el-button type="success" plain>注册</el-button>
            </router-link>
          </div>
        </el-row>
      </el-col>
    </el-col>
  </div>
</template>

<script>
export default {
  name: "Head",
  data() {
    return {
      showBtn: localStorage.getItem("username"),
      userUrl: localStorage.getItem("userImg")
    };
  }
};
</script>

<style>
.name {
  width: 100px;
  text-align: left;
  height: 60px;
  line-height: 60px;
  float: right;
  font-size: 18px;
  color: #67c23a;
  font-weight: 600;
}
.user_avatar {
  float: right;
  height: 60px;
  line-height: 60px;
  width: 76px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.rightNav .el-button--success.is-plain {
  background: rgb(95, 99, 104);
  height: 40px;
  width: 80px;
  margin-top: 10px;
  margin-right: 20px;
  border: none;
}
#settingIcon {
  font-size: 30px;
  float: right;
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