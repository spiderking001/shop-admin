<template>
  <el-card shadow="never">
    <template #header>
      <div class="flex justify-between">
        <span>{{ title }}</span>
        <el-tag type="danger" effect="plain">
          {{ tip }}
        </el-tag>
      </div>
    </template>

    <el-row :gutter="20" >
      <el-col :span="6" :offset="0" v-for="(item,index) of btns" :key="index">
        <el-card shadow="hover" class="border-0 bg-light-400">
          <div class="flex flex-col items-center justify-center">
              <span class="text-xl mb-2">{{item.value}}</span>
              <span class="text-xs text-gray-500">{{ item.label }}</span>
          </div>
        </el-card>
      </el-col>



    </el-row>
  </el-card>

</template>

<script setup>
import {ref} from "vue";

defineProps({
  title: String,
  tip: String,
  btns: Array
})


</script>

<style scoped>

</style>