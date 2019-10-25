<template>
  <div id="app">
    <el-container>
      <el-header class="header">
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
    <router-view name="reg"></router-view>
  </div>
</template>

<script>
import Head from "./components/header.vue";
import LeftNav from "./components/left_nav";
import Main from "./components/main_content";
import Foot from "./components/footer";
const Register = () => import("./components/function/register.vue");
export default {
  name: "app",
  components: {
    Head,
    LeftNav,
    Main,
    Foot,Register
  }
};
</script>

<style>
@import "./static/app.css";
</style>
