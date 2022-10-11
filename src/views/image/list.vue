<template>
  <el-container class="bg-white rounded" :style="{height:(h+'px')}">
    <el-header class="image-header">
      <el-button type="primary" size="small" @click="handleOpenCreate">新增图片分类</el-button>
    </el-header>
    <el-container>
      <ImageAside ref="imageAsideRef"/>
      <ImageMain/>
    </el-container>
  </el-container>

</template>

<script setup>
import ImageAside from "@/components/ImageAside.vue";
import ImageMain from "@/components/ImageMain.vue";
import {ref} from "vue";
const widowHeight = window.innerHeight||document.body.clientHeight
const h=widowHeight-64-44

const imageAsideRef=ref(null)

const handleOpenCreate=()=>{
  imageAsideRef.value.handleCreate()
}
</script>

<style scoped>
.image-header{
  border-bottom: 1px solid #eeeeee;
  @apply flex items-center
}

.image-aside{
  border-right: 1px solid #eeeeee;
  position: relative;
 
}
.image-main{
  position: relative;
}

.image-aside .top,.image-main .top{
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 50px;
  overflow-y: auto;
}
.image-aside .bottom,.image-main .bottom{
  position: absolute;
  bottom:0;
  height: 50px;
  left: 0;
  right: 0;
  @apply flex items-center justify-center

}

</style>