<template>
  <div class="page-dialog">
    <el-dialog
      v-model="centerDialogVisible"
      title="新增"
      width="30%"
      center
      destroy-on-close
    >
      <custom-form v-bind="dialogConfig" v-model="FormData"></custom-form>
      <slot></slot>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="centerDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handleConfirm">确认</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import customForm from '@/base-ui/form'
import store from '@/store'

export default defineComponent({
  components: {
    customForm
  },
  props: {
    dialogConfig: {
      type: Object,
      required: true
    },
    defaultConfig: {
      type: Object,
      default: () => ({})
    },
    listType: {
      type: String,
      required: true
    },
    otherInfo: {
      type: Object,
      default: () => ({})
    }
  },
  setup(props) {
    const centerDialogVisible = ref(false)
    const FormData = ref<any>({})

    watch(
      () => props.defaultConfig,
      (newValue) => {
        for (const item of props.dialogConfig.formItems) {
          FormData.value[`${item.filed}`] = newValue[`${item.filed}`]
        }
      }
    )

    const handleConfirm = () => {
      if (!Object.keys(props.defaultConfig).length) {
        store.dispatch('system/addList', {
          listType: props.listType,
          formData: { ...FormData.value, ...props.otherInfo }
        })
      } else {
        store.dispatch('system/updateList', {
          listType: props.listType,
          id: props.defaultConfig.id,
          formData: { ...FormData.value, ...props.otherInfo }
        })
      }
      centerDialogVisible.value = false
    }
    return {
      centerDialogVisible,
      FormData,
      handleConfirm
    }
  }
})
</script>

<style lang="less" scoped></style>
