import { login } from '@/service'
import { cookie } from 'cookie_js'
// import { SET_ROLE } from '@/store/mutation-types'
export default {
  data() {
    return {
      loginForm: {
        user: '',
        password: '',
      },
      loginFormRule: {
        user: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { type: 'string', min: 6, message: '密码最少是6位', trigger: 'blur' },
        ],
      },
    }
  },
  methods: {
    handleSubmit(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          login(this.loginForm).then((e) => {
            this.$Message.success('登录成功')
            cookie.set('userToken', e.userToken)
            this.$router.push({ path: '/' })
          })
        }
      })
    },
  },
}
