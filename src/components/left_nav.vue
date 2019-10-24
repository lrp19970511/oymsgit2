<template>
  <div id="LeftNav">
      <el-menu>
        <el-menu-item >
          <router-link to="/main/shopping"  tag="div">
          <i class="el-icon-s-shop" ></i>商品管理
          </router-link>
        </el-menu-item>
        <el-menu-item >
          <router-link to="/main/order" tag="div">
          <i class="el-icon-s-claim"></i>订单管理
          </router-link>
        </el-menu-item>
        <el-menu-item >
          <router-link to="/main/usermanager" tag="div">
          <i class="el-icon-s-custom"></i>用户管理
          </router-link>
        </el-menu-item>
      </el-menu>
  </div>
</template>

<script>
export default {
  name: "LeftNav"
};
</script>

<style>
#LeftNav .el-menu-item{
    background-color: rgb(41, 39, 40);
    font-size: 20px;
    font-weight: 600;
    color:teal;
}
.el-menu{
  border-right:solid 1px rgb(41, 39, 40) !important;
}

#LeftNav .el-menu-item:hover{
    background-color: rgb(83, 159, 226);
}
.el-menu-item:active{    
    background-color: rgb(83, 159, 226) !important;
}
</style>