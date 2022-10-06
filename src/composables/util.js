import {ElNotification,ElMessage, ElMessageBox} from 'element-plus'
import nprogress from 'nprogress'

//消息提示
export function toast(message, type = 'success') {
    ElNotification({
        message,
        type,
        duration: 3000
    })
}
//删除提示
export function showModal(content="提示内容",type="warning",title=""){
     return ElMessageBox.confirm(
        content,
        title,
        {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type,
        }
    )
}


//显示全屏loading
export function showLoading() {
   nprogress.start()
}


//隐藏全屏loading
export function hideLoading() {
    nprogress.done()
}