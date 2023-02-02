<template>
  <div class="login-phone">
    <el-form :model="phoneForm" ref="phoneFormRef">
      <el-form-item label="手机号">
        <el-input v-model="phoneForm.phonenumber"></el-input>
      </el-form-item>
      <el-form-item label="验证码" class="checkcode-area">
        <div class="checkcode">
          <el-input v-model="phoneForm.checkcode"></el-input>
          <el-button type="primary" class="post-btn">获取验证码</el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import { FormInstance } from 'element-plus'

export default defineComponent({
  setup() {
    const phoneForm = reactive({
      phonenumber: '',
      checkcode: ''
    })
    const phoneFormRef = ref<FormInstance>()

    const phoneLogin = () => {
      console.log('')
    }
    return {
      phoneForm,
      phoneFormRef,
      phoneLogin
    }
  }
})
</script>

<style lang="less" scoped>
.checkcode-area {
  align-items: center;
  .checkcode {
    display: flex;
    align-items: center;
  }
  .post-btn {
    margin: 8px;
  }
}
</style>
