<template>
  <div id="app">
    <el-container>
      <el-header style="text-align: right; font-size: 12px" class="header">
        <Head></Head>
      </el-header>
      <el-container id="mainContent">
        <el-aside>
        <left-nav></left-nav>
        </el-aside>
        <el-main>
          <Main></Main>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import Head from "./components/header.vue";
import LeftNav from "./components/left_nav";
import Main from "./components/main_content";
import Foot from "./components/footer";
export default {
  name: "app",
  components: {
    Head,
    LeftNav,
    Main,
    Foot
  }
};
</script>

<style>
#app {
  width: 100%;
  height: 1000px;
}
.el-header {
  background-color: rgb(55, 55, 55);
  color: #333;
  line-height: 60px;
}
.header{
     width: 100%;
     height: 100%;
}
#mainContent{
  
  background-color: rgb(71, 71, 71);
}
.el-aside {
  border-radius: 4px;
  margin: 5px 0 5px 5px;
  color: #333;
  background-color: rgb(41, 39, 40);
  height:900px;
  width:250px !important;
}
.el-main{
  background-color:rgb(245, 245, 245);
  margin: 5px;
}
</style>
