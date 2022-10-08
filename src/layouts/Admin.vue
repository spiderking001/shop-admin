<template>
  <el-container>
    <el-header>
      <Header />
    </el-header>

    <el-container>
      <el-aside :width="$store.state.asideWidth">
        <Aside/>
      </el-aside>

      <el-main>
        <Main/>
        <router-view></router-view>
      </el-main>
    </el-container>

  </el-container>
</template>

<script setup>
import Header from "./components/Header.vue";
import Aside from "./components/Aside.vue";
import Main from "./components/Main.vue";


</script>

<style scoped>
.el-aside{
  transition: all 0.2s;

}
</style>