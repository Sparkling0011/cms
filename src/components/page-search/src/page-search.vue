<template>
  <div class="page-search">
    <custom-form v-bind="SearchConfig" v-model="FormData" ref="customFormRef">
      <template #header><h1>高级检索</h1></template>
      <template #footer>
        <div class="btn-area">
          <el-button type="primary" plain @click="handleResetfileds">
            <el-icon class="el-icon--left"><Refresh /></el-icon> 重置
          </el-button>
          <el-button type="primary" @click="handleQuery"
            ><el-icon class="el-icon--left"><Search /></el-icon>搜索</el-button
          >
        </div>
      </template>
    </custom-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from 'vue'
import customForm from '@/base-ui/form'
import { IForm } from '@/base-ui/form'

export default defineComponent({
  components: { customForm },
  props: {
    SearchConfig: {
      type: Object as PropType<IForm>,
      required: true
    }
  },
  emits: ['handleResetfileds', 'handleQuery'],
  setup(props, { emit }) {
    const finalFormData: { [key: string]: any } = {}
    props.SearchConfig.formItems.forEach((formItem) => {
      finalFormData[formItem.filed] = ''
    })
    const FormData = ref(finalFormData)

    const handleResetfileds = () => {
      props.SearchConfig.formItems.forEach((formItem) => {
        FormData.value[formItem.filed] = finalFormData[formItem.filed]
      })
      emit('handleResetfileds')
    }

    const handleQuery = () => {
      emit('handleQuery', FormData.value)
    }

    return {
      FormData,
      handleResetfileds,
      handleQuery
    }
  }
})
</script>

<style lang="less" scoped>
.btn-area {
  text-align: right;
  padding: 10px 20px 5px 0;
}
</style>
