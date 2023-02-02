<template>
  <div class="login-panel">
    <transition enter-active-class="animate__animated animate__bounce">
      <h1 class="title" v-if="isShow">后台管理系统</h1>
    </transition>

    <el-tabs type="border-card" stretch v-model="loginType">
      <el-tab-pane name="account">
        <template #label>
          <span class="custom-tabs-label">
            <i-ep-avatar />
            <span>账号登录</span>
          </span>
        </template>
        <login-account ref="accountRef"></login-account>
      </el-tab-pane>
      <el-tab-pane name="phone">
        <template #label>
          <span class="custom-tabs-label">
            <i-ep-phone />
            <span>手机号登录</span>
          </span>
        </template>
        <login-phone></login-phone
      ></el-tab-pane>

      <el-button type="primary" class="login-btn" @click="login"
        >登录</el-button
      >
    </el-tabs>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import loginAccount from './login-account.vue'
import loginPhone from './login-phone.vue'

export default defineComponent({
  components: {
    loginAccount,
    loginPhone
  },
  setup() {
    const accountRef = ref<InstanceType<typeof loginAccount>>()
    const phoneRef = ref<InstanceType<typeof loginPhone>>()
    const isShow = ref(false)
    const loginType = ref('account')

    const login = () => {
      const accountFormRef = accountRef.value?.accountFormRef
      if (loginType.value === 'account') {
        accountRef.value?.accountLogin(accountFormRef)
      } else {
        phoneRef.value?.phoneLogin()
      }
    }
    onMounted(() => {
      isShow.value = true
    })
    return {
      accountRef,
      isShow,
      loginType,
      login
    }
  }
})
</script>

<style lang="less">
.login-panel {
  margin-bottom: 150px;
  width: 320px;
  .title {
    text-align: center;
  }
  .login-btn {
    width: 100%;
    margin-top: 10px;
  }
}
</style>
