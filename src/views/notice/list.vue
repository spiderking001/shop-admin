<template>
  <el-card shadow="never" class="border-0">
    <div class="flex justify-between items-center mb-4">
      <el-button type="primary" size="small" @click="addNotice">新增</el-button>
      <el-tooltip
          class="box-item"
          effect="dark"
          content="刷新数据"
          placement="top"
      >
        <el-button text @click="getData">
          <el-icon :size="20">
            <Refresh/>
          </el-icon>
        </el-button>
      </el-tooltip>

    </div>

    <el-table :data="tableData" stripe style="width: 100%" v-loading="loading">
      <el-table-column prop="title" label="公告标题"/>
      <el-table-column prop="create_time" label="发布时间" width="380"/>
      <el-table-column label="操作" width="180" align="center">
        <template #default="scope">
          <el-button text type="primary" size="small" @click="editNotice(scope.row)">修改</el-button>
          <el-popconfirm title="是否要删除该公告?"
                         confirm-button-text="确认"
                         cancel-button-text="取消"
                         @confirm="deleteNotice(scope.row.id)">
            <template #reference>
              <el-button text type="primary" size="small">删除</el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>

    <div class="flex items-center justify-center mt-5">
      <el-pagination background layout="prev,pager, next"
                     :total="total"
                     :current-page="currentPage"
                     :page-size="limit"
                     @current-change="getData"
      />
    </div>
    <FromDrawer ref="formDrawerRef" :title="drawerTitle" @submit="handleSubmit">
      <el-form :model="form" ref="formRef" :rules="rules" label-width="80px" :inline="false">
        <el-form-item label="公告标题" prop="title">
          <el-input v-model="form.title" placeholder="公告标题"/>
        </el-form-item>
        <el-form-item label="公告内容" prop="content">
          <el-input v-model="form.content" type="textarea" :row="5" placeholder="请输入公告内容"/>
        </el-form-item>
      </el-form>
    </FromDrawer>
  </el-card>
</template>

<script setup>
import {ref, reactive, computed} from "vue";
import {getNoticeList, addNoticeList, editNoticeList, deleteNoticeList} from "@/api/notice";
import FromDrawer from "@/components/FormDrawer.vue";
import {toast} from "@/composables/util";
import {useInitTable} from "@/composables/useCommon";
import {getAdminList} from "@/api/manager";


const {
  tableData,
  loading,
  currentPage,
  total,
  limit,
  getData
}
    = useInitTable(
    {
      getList: getNoticeList
    })


//表单部分
const formDrawerRef = ref(null)
const formRef = ref(null)
const form = reactive({
  title: "",
  content: ""
})

const rules = {
  title: [
    {required: true, message: '请输入公告标题', trigger: 'blur'},
  ],
  content: [
    {required: true, message: '请输入公告内容', trigger: 'blur'},
  ],
}

const editId = ref(0)
const drawerTitle = computed(() => {
  return editId.value ? "修改" :"新增"
})


//重置表单
const resetForm = (row = false) => {
  if (formRef.value) {
    formRef.value.clearValidate()
  }
  if (row) {
    form.title = row.title
    form.content = row.content
    editId.value = row.id
  } else {
    form.title = ""
    form.content = ""
    editId.value = 0
  }
}


//打开
const addNotice = () => {
  editId.value=0
  resetForm()
  formDrawerRef.value.open()
}

// 新增公告
const handleSubmit = () => {
  formRef.value.validate((valid) => {
    if (!valid) return
    formDrawerRef.value.showLoading()

    const fun=editId.value?editNoticeList(editId.value,form):addNoticeList(form)
    fun.then(res => {
      toast(drawerTitle.value+"成功")
      //修改刷新当前页.新增刷新第一页
      getData(editId.value?false:1)
      formDrawerRef.value.close()
    })
        .finally(() => {
          formDrawerRef.value.hideLoading()
        })

  })
}


//编辑公告
const editNotice = (row) => {
  editId.value = row.id
  resetForm(row)
  formDrawerRef.value.open()
}

//删除公告
const deleteNotice = (id) => {
  loading.value = true
  deleteNoticeList(id).then(res => {
    toast("删除成功")
    getData(1)
  }).finally(() => {
    loading.value = false
  })
}


</script>

<style scoped>

</style>