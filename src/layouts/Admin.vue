<template>
  <el-container>
    <el-header>
      <Header/>
    </el-header>

    <el-container>
      <el-aside :width="$store.state.asideWidth">
        <Aside/>
      </el-aside>

      <el-main>
        <TagList/>
        <router-view v-slot="{Component}">
          <transition name="fade">
            <keep-alive :max="10">
              <component :is="Component"></component>
            </keep-alive>
          </transition>
        </router-view>
      </el-main>
    </el-container>

  </el-container>
</template>

<script setup>
import Header from "./components/Header.vue";
import Aside from "./components/Aside.vue";
import TagList from "./components/TagList.vue";


</script>

<style scoped>
.el-aside {
  transition: all 0.2s;
}



.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

.fade-enter-to, .fade-leave-from {
  opacity: 1;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.2s;
}

.fade-enter-active{
  transition-delay: 0.2s;
}


</style>