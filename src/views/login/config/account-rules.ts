import { reactive } from 'vue'
import { FormRules } from 'element-plus'

const rules = reactive<FormRules>({
  name: [
    {
      required: true,
      message: '为账号必传信息~',
      trigger: 'blur'
    },
    {
      pattern: /[a-z0-9]{5,10}$/,
      message: '账号必须为5-10个数字或字母~',
      trigger: 'blur'
    }
  ],
  password: [
    { required: true, message: '密码为必传信息~', trigger: 'blur' },
    {
      pattern: /[a-z0-9]{3,}$/,
      message: '密码必须为三个以上的数字或密码',
      trigger: 'blur'
    }
  ]
})

export default rules
