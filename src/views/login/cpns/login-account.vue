<template>
  <div class="login-name">
    <el-form
      ref="accountFormRef"
      :model="accountForm"
      status-icon
      :rules="rules"
    >
      <el-form-item label="账号" prop="name">
        <el-input
          v-model="accountForm.name"
          autocomplete="off"
          placeholder="请输入账号"
        />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
          v-model="accountForm.password"
          type="password"
          placeholder="请输入密码"
          autocomplete="off"
          show-password
        />
      </el-form-item>
    </el-form>
    <div class="additional">
      <el-checkbox v-model="isKeepPassword" label="记住密码" />
      <el-link type="primary" :underline="false">忘记密码</el-link>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive } from 'vue'
import type { FormInstance } from 'element-plus'
import rules from '../config/account-rules'
import useLocalStorage from '@/utils/cache'
import { useStore } from 'vuex'

export default defineComponent({
  setup() {
    const store = useStore()
    const accountForm = reactive({
      name: useLocalStorage.getCache('name') ?? '',
      password: useLocalStorage.getCache('password') ?? ''
    })
    const accountFormRef = ref<FormInstance>()
    const isKeepPassword = ref(true)

    const accountLogin = async (formEl: FormInstance | undefined) => {
      if (!formEl) return
      await formEl.validate((valid, fields) => {
        if (valid) {
          if (isKeepPassword.value) {
            useLocalStorage.setCache('name', accountForm.name)
            useLocalStorage.setCache('password', accountForm.password)
          } else {
            useLocalStorage.deleteCache('name')
            useLocalStorage.deleteCache('password')
          }
          store.dispatch('login/accountLoginAction', accountForm).catch()
        }
      })
    }

    return {
      accountForm,
      rules,
      accountFormRef,
      isKeepPassword,
      accountLogin
    }
  }
})
</script>

<style lang="less" scoped>
.additional {
  display: flex;
  justify-content: space-between;
}
</style>
