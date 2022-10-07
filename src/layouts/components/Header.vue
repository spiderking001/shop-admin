<template>
  <div class="f-header">
        <span class="logo ">
           <el-icon class="mr-1"><HelpFilled/></el-icon>
          three编程
        </span>
    <el-icon class="icon-btn">
      <Fold/>
    </el-icon>
    <el-icon class="icon-btn" @click="refresh">
      <el-tooltip

          effect="dark"
          content="刷新"
          placement="bottom"
      >
        <Refresh/>
      </el-tooltip>
    </el-icon>


    <div class="ml-auto flex items-center">
      <el-icon class="icon-btn mr-8" @click="toggle">

        <el-tooltip
            effect="dark"
            content="全屏"
            placement="bottom"
        >
          <FullScreen v-if="!isFullscreen"/>
          <Aim v-else/>
        </el-tooltip>
      </el-icon>
      <el-dropdown class="dropdown mr-4" @command="handCommand">
            <span class="flex items-center text-light-50 mr-4">
               <el-avatar class="mr-4" :size="25" :src="$store.state.user.avater"/>
                {{ $store.state.user.username }}
          <el-icon class="el-icon--right ">
            <arrow-down/>
         </el-icon>
    </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="rePassword">修改密码</el-dropdown-item>
            <el-dropdown-item command="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>

</template>

<script setup>
import {showModal, toast} from "@/composables/util";
import {logout} from "@/api/manager";
import {useRouter} from "vue-router";
import {useStore} from "vuex";
import {useFullscreen} from '@vueuse/core'

const {
  //是否全屏
  isFullscreen,
  //切换全屏
  toggle
} = useFullscreen()


const router = useRouter();
const store = useStore();

const handCommand = (c) => {
  switch (c) {
    case "logout":
      btnLogout()
      break;
    case "rePassword":
      console.log('修改密码')
      break
  }
}

//刷新
const refresh = () => location.reload()


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
.f-header {
  @apply flex bg-indigo-700 text-light-50 fixed top-0 left-0 right-0 h-12 items-center justify-between px-4;
  height: 64px;
}

.logo {
  width: 250px;
  @apply flex items-center justify-center text-2xl font-thin;
}

.icon-btn {
  @apply item-center justify-center;
  width: 42px;
  height: 64px;
  cursor: pointer;
}

.icon-btn:hover {
  @apply bg-indigo-600;
}

.f-header .dropdown {
  width: 64px;
  cursor: pointer;
  @apply flex  justify-center items-center
}
</style>