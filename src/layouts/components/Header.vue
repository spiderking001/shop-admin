<template>
  <div class="f-header">
        <span class="logo ">
           <el-icon class="mr-1"><HelpFilled/></el-icon>
          three编程
        </span>
    <el-icon class="icon-btn" @click="$store.commit('handleAside')">
      <Fold v-if="$store.state.asideWidth=='250px'"/>
      <Expand v-else/>
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
               <el-avatar class="mr-4" :size="25" :src="$store.state.myImg"/>
                {{ $store.state.user.username }}
            <el-icon class="el-icon--right"><arrow-down/></el-icon>
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

  <FormDrawer ref="formDrawerRef" title="修改密码" destroy-on-close @submit="onSubmit">
    <el-form ref="fromRef" :rules="rules" :model="form" label-width="80px">
      <el-form-item prop="oldpassword" label="旧密码">
        <el-input v-model="form.oldpassword"
                  placeholder="请输入旧密码">
        </el-input>
      </el-form-item>

      <el-form-item prop="password" label="新密码">
        <el-input v-model="form.password"
                  placeholder="请输入密码"
                  show-password
        >
        </el-input>
      </el-form-item>
      <el-form-item prop="repassword" label="确认密码">
        <el-input v-model="form.repassword"
                  placeholder="请输入确认密码"
                  show-password
        >

        </el-input>
      </el-form-item>

    </el-form>
    <!--  <div style="height: 1000px"></div>-->
  </FormDrawer>

</template>

<script setup>
import FormDrawer from "@/components/FormDrawer.vue";
import {useFullscreen} from '@vueuse/core'
import {useRepassword, useLogout} from "@/composables/useManager";

const {
  //是否全屏
  isFullscreen,
  //切换全屏
  toggle
} = useFullscreen()

const {
  formDrawerRef,
  form,
  rules,
  fromRef,
  onSubmit,
  openRePasswordForm,
} = useRepassword()

const {
  btnLogout
} = useLogout()


const handCommand = (c) => {
  switch (c) {
    case "logout":
      btnLogout()
      break;
    case "rePassword":
      // showDrawer.value = true
      openRePasswordForm()
      break
  }
}

//刷新
const refresh = () => location.reload()

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