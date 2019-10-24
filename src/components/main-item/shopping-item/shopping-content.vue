<template>
  <div id="shoppingContent">
      <el-col :span="24"><el-button type="primary" round id="add_btn">添加商品</el-button></el-col>
  </div>
</template>
<script>
export default {
  name: "shoppingContent"
};
</script>

<style>
#add_btn{
    margin-left: 25px;
}

</style>