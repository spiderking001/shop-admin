<template>
  <el-row class="login-container">
    <el-col :lg="16" :md="12" class="left">
      <div class="huanying">欢迎光临</div>
    </el-col>
    <el-col :lg="8" :md="12" class="right">
      <h2 class="huanying2 ">欢迎回来</h2>
      <div class="login">
        <span class="line"></span>
        <span>账号密码登录</span>
        <span class="line"></span>
      </div>

      <el-form ref="fromRef"
               :rules="rules"
               :model="form"
               class="w-[250px]">
        <el-form-item prop="username">
          <el-input v-model="form.username" placeholder="请输入用户名">
            <template #prefix>
              <el-icon class="el-input__icon">
                <search/>
              </el-icon>
            </template>
          </el-input>
        </el-form-item>

        <el-form-item prop="password">
          <el-input v-model="form.password"
                    placeholder="请输入密码"
                    type="password"
                    show-password
          >
            <template #prefix>
              <el-icon>
                <Lock/>
              </el-icon>
            </template>
          </el-input>
        </el-form-item>

        <el-form-item>
          <el-button round color="" class="w-[250px]" type="primary" @click="onSubmit" :loading="loading">登录
          </el-button>
        </el-form-item>
      </el-form>

    </el-col>
  </el-row>
</template>

<script setup>
import {reactive, ref,onMounted,onBeforeUnmount} from 'vue'
import {useRouter} from "vue-router";
import {useStore} from "vuex";
import {toast} from "@/composables/util";

const router = useRouter()
const store = useStore()


// do not use same name with ref
const form = reactive({
  username: '',
  password: ''
})

const rules = {
  username: [
    {required: true, message: '请输入用户名', trigger: 'blur'},

  ],
  password: [
    {required: true, message: '请输入密码', trigger: 'blur'},

  ]
}

const fromRef = ref(null)
const loading = ref(false)


const onSubmit = () => {
  fromRef.value.validate((valid) => {
    if (!valid) {
      return false
    }
    loading.value = true
    store.dispatch("login", form).then(res => {
      toast("登录成功")
      router.push("/")
    }).finally(() => {
      loading.value = false
    })
  })
}
//监听回车事件
function onKeyup(e) {
  if (e.key=="Enter") {
    onSubmit()
  }
}

onMounted(() => {
  document.addEventListener('keyup', onKeyup)
})

onBeforeUnmount(() => {
  document.removeEventListener('keyup', onKeyup)
})
//添加键盘监听
// window.addEventListener('keyup', onKeyup)
</script>

<style scoped>
.login-container {
  @apply min-h-screen bg-purple-500;
}

.login-container .left, .login-container .right {
  @apply flex items-center justify-center
}

.login-container .right {
  @apply flex-col bg-light-100
}

.login-container .huanying {
  @apply font-bold text-5xl text-light-50
}

.login-container .huanying2 {
  @apply font-bold text-3xl text-gray-800
}

.login-container .login {
  @apply flex items-center justify-center my-5 text-gray-300 space-x-2
}

.login-container .login .line {
  @apply h-[1px] w-16 bg-gray-200
}


</style>