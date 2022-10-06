<template>
  <h2>后台首页
    {{ $store.state.user.username }}
    <el-button @click="btnLogout">退出登录</el-button>
  </h2>

</template>

<script setup>
import {showModal, toast} from "@/composables/util";
import {logout} from "@/api/manager";
import {useRouter} from "vue-router";
import {useStore} from "vuex";

const router = useRouter();
const store = useStore();

function btnLogout() {
  showModal('是否要退出登录').then(() => {
    logout().finally(() => {
      //清除用户token
      //清除当前用户状态
      store.dispatch("logout")
      //跳转回登录页
      router.push('/login')
      //提示退出成功
      toast('退出成功')
    })
  })
}
</script>

<style scoped>

</style>