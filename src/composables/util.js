import {ElNotification} from 'element-plus'

//消息提示
export function toast(message, type = 'success') {
    ElNotification({
        message,
        type,
        duration: 3000
    })
}
