import {computed, reactive, ref} from "vue";
import {toast} from "@/composables/util";

//列表,分页,搜索
export function useInitTable(opt = {}) {


    let searchForm = null
    let resetSearchForm = null

    if (opt.searchForm) {
        searchForm = reactive({...opt.searchForm})
        resetSearchForm = () => {
            for (const key in opt.searchForm) {
                searchForm[key] = opt.searchForm[key]
            }
            getData()
        }
    }


    const tableData = ref([])
    const loading = ref(false)

    //分页
    const currentPage = ref(1)
    const total = ref(0)
    const limit = ref(10)

    //获得数据
    function getData(p = null) {
        if (typeof p == "number") {
            currentPage.value = p
        }
        opt.getList(currentPage.value, searchForm)
            .then(res => {
                if (opt.onGetListSuccess && typeof opt.onGetListSuccess == "function") {
                    opt.onGetListSuccess(res)
                } else {
                    tableData.value = res.list
                    total.value = res.totalCount
                }
            })
            .finally(() => {
                loading.value = false
            })
    }

    getData()

    //删除管理员
    const deleteNotice = (id) => {
        loading.value = true
        opt.delete(id).then(res => {
            toast("删除成功")
            getData(1)
        }).finally(() => {
            loading.value = false
        })
    }

    //修改状态
    const updateStatus = (status, row) => {
        // console.log(status)
        row.statusLoading = true
        opt.updateStatus(row.id, status).then(res => {
            toast("修改成功")
            getData()
        }).finally(() => {
            row.statusLoading = false
        })

    }

    return {
        searchForm,
        resetSearchForm,
        tableData,
        loading,
        currentPage,
        total,
        limit,
        getData,
        deleteNotice,
        updateStatus

    }
}


//新增,修改
export function useInitForm(opt = {}) {
    //表单部分

    const formDrawerRef = ref(null)
    const formRef = ref(null)
    const defaultForm = opt.form
    const form = reactive({})
    const rules = {}
    const editId = ref(0)

    const drawerTitle = computed(() => {return editId.value ? "修改" : "新增"})




    // 提交数据
    const handleSubmit = () => {
        formRef.value.validate((valid) => {
            if (!valid) return

            formDrawerRef.value.showLoading()


            const fun = editId.value ? opt.update(editId.value, form) : opt.create(form)
            fun.then(res => {
                toast(drawerTitle.value + "成功")
                //修改刷新当前页.新增刷新第一页
                opt.getData()
                formDrawerRef.value.close()
            })
                .finally(() => {
                    formDrawerRef.value.hideLoading()
                })

        })
    }


    //重置表单
    const resetForm = (row = false) => {
        if (formRef.value) formRef.value.clearValidate()

        for (const key in defaultForm) {
            form[key] = row[key]
        }

    }
    //新增
    const addNotice = () => {
        editId.value = 0
        resetForm(defaultForm)
        formDrawerRef.value.open()
    }


    //编辑
    const editNotice = (row) => {
        editId.value = row.id
        resetForm(row)
        formDrawerRef.value.open()
    }

    return {
        formDrawerRef,
        formRef,
        form,
        rules,
        editId,
        drawerTitle,
        resetForm,
        addNotice,
        handleSubmit,
        editNotice

    }
}

