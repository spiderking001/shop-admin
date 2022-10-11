<template>
  <el-aside width="220px" class="image-aside">
    <div class="top">

      <AsideList :active="activeId===item.id" v-for="(item,index) of list " :key="index">
        {{ item.name }}
      </AsideList>
    </div>
    <div class="bottom">
      <el-pagination background layout="prev, next"
                     :total="total"
                     :current-page="currentPage"
                     :page-size="limit"
                     @current-change="getData"
      />
    </div>
  </el-aside>
  <FormDrawer title="新增" ref="formDrawerRef" @submit="handleSubmit">
    <el-form :model="form"
             ref="formRef"
             :rules="rules"
             label-width="80px"
             :inline="false">


      <el-form-item label="分类名称" prop="name">
        <el-input v-model="form.name"/>
      </el-form-item>
      <el-form-item label="排序" prop="order">
        <el-input-number v-model="form.order" :min="0" :max="1000" />
      </el-form-item>
    </el-form>
  </FormDrawer>
</template>

<script setup>
import {ref} from "vue";
import AsideList from "@/components/AsideList.vue";
import {getClassList,createClassList} from "@/api/image_class.js";
import FormDrawer from "@/components/FormDrawer.vue";
import {toast} from "@/composables/util.js"

//加载东湖
const loading = ref(false)
const list = ref([])
const activeId = ref(0)



//分页
const currentPage = ref(1)
const total = ref(0)
const limit = ref(10)

//获取数据
function getData(p = null) {
  if (typeof p == "number") {
    currentPage.value = p
  }
  loading.value = true
  getClassList(currentPage.value).then(res => {
    // console.log(res)
    total.value = res.totalCount
    list.value = res.list
    let item = list.value[0]
    if (item) {
      activeId.value = item.id
    }
  }).finally(() => {
    loading.value = false
  })
}

getData()

const formDrawerRef = ref(null)
const handleCreate = () => {
  formDrawerRef.value.open()
}


const form=ref({
  name:'',
  order:0
})

const rules=ref({
  name:[{required:true,message:'请输入图库分类名称',trigger:'blur'}]
})

const handleSubmit = () => {
  formRef.value.validate((valid) => {
    if (!valid) {
      return false;
    } else {
      formDrawerRef.value.showLoading()
      createClassList(form.value).then(res=>{
        toast("新增成功")
        getData()
        formDrawerRef.value.close()
      }).finally(()=>{
        formDrawerRef.value.hideLoading()
      })
    }
  });
}

const formRef=ref(null)

defineExpose({
  handleCreate
})

</script>

<style scoped>
.image-aside {
  border-right: 1px solid #eeeeee;
  position: relative;

}

.image-aside .top {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 50px;
  overflow-y: auto;
}

.image-aside .bottom {
  position: absolute;
  bottom: 0;
  height: 50px;
  left: 0;
  right: 0;
  @apply flex items-center justify-center
}

</style>