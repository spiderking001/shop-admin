<template>
  <div v-if="modelValue">
    <el-image :src="modelValue" fit="cover" class="w-[100px] h-[100px] rounded border mr-2"></el-image>

  </div>
  <div class="choose-image-btn" @click="open">
    <el-icon :size="25" class="text-gray-500">
      <Plus/>
    </el-icon>
  </div>
  <el-dialog
      v-model="dialogVisible"
      title="请选择图片"
      width="80%"
      top="5vh"
  >
    <el-container class="bg-white rounded" style="height:60vh">
      <el-header class="image-header">
        <el-button type="primary" size="small" @click="handleOpenCreate">新增图片分类</el-button>
        <el-button type="warning" size="small" @click="handleOpenLoad">上传图片</el-button>
      </el-header>

      <el-container>
        <ImageAside ref="imageAsideRef" @change="handleAsideChange"/>
        <ImageMain openChoose ref="imageMainRef" @choose="handleChoose"/>
      </el-container>
    </el-container>

    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="submit">确认</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import {ref} from "vue";
import ImageAside from "@/components/ImageAside.vue";
import ImageMain from "@/components/ImageMain.vue";


const dialogVisible = ref(false)
const submit = () => {
  if (urls.length){
    emit("update:modelValue",urls[0])
  }
  dialogVisible.value = false
}


const imageAsideRef = ref(null)
const imageMainRef = ref(null)

const handleOpenCreate = () => {
  imageAsideRef.value.handleCreate()
}

const handleAsideChange = (imageClassId) => {
  imageMainRef.value.loadData(imageClassId)
}
const handleOpenLoad = () => {
  imageMainRef.value.openUploadFile()
}

//打开
const open = () => {
  dialogVisible.value = true
}

const props=defineProps({
  modelValue:[String,Array]
})

const emit=defineEmits(["update:modelValue"])

let urls=[]
const handleChoose = (image) => {
 urls= image.map(item => item.url)

}
</script>

<style scoped>
.choose-image-btn {
  @apply w-[100px] h-[100px] rounded border flex items-center  justify-center cursor-pointer hover:bg-gray-100;
}


.image-header {
  border-bottom: 1px solid #eeeeee;
  @apply flex items-center
}

.image-aside {
  border-right: 1px solid #eeeeee;
  position: relative;

}

.image-main {
  position: relative;
}

.image-aside .top, .image-main .top {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 50px;
  overflow-y: auto;
}

.image-aside .bottom, .image-main .bottom {
  position: absolute;
  bottom: 0;
  height: 50px;
  left: 0;
  right: 0;
  @apply flex items-center justify-center

}
</style>