import {reactive, ref} from "vue";
import {logout, updatePassword} from "@/api/manager";
import {showModal, toast} from "@/composables/util";
import {useRouter} from "vue-router";
import {useStore} from "vuex";

export function useRepassword() {

    const router = useRouter();
    const store = useStore();
    const formDrawerRef = ref(null)


    const form = reactive({
        oldPassword: '',
        password: '',
        rePassword: ''
    })

    const rules = {
        oldpassword: [
            {required: true, message: '旧密码不能为空', trigger: 'blur'},

        ],
        password: [
            {required: true, message: '新密码不能为空', trigger: 'blur'},
        ],
        repassword: [
            {required: true, message: '确认密码不能为空', trigger: 'blur'},
        ]
    }

    const fromRef = ref(null)

    const onSubmit = () => {
        fromRef.value.validate((valid) => {
            if (!valid) {
                return false
            }
            formDrawerRef.value.showLoading()
            updatePassword(form).then(res => {
                toast('修改成功,请重新登录')
                store.dispatch("logout")
                router.push('/login')
            }).finally(() => {
                formDrawerRef.value.hideLoading()
            })
        })
    }
    const openRePasswordForm = () => {
        formDrawerRef.value.open()
    }
    return {
        formDrawerRef,
        form,
        rules,
        fromRef,
        onSubmit,
        openRePasswordForm
    }
}

export function useLogout() {
    const router = useRouter();
    const store = useStore();
    function btnLogout() {
        showModal('是否要退出登录').then(() => {
            logout().finally(() => {
                //清除用户token
                //清除当前用户状态
                store.dispatch("logout")
                //跳转回登录页
                router.push('/login')
                //提示退出成功
                toast('退出成功')
            })
        })
    }
    return{
        btnLogout
    }
}