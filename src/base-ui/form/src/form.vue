<template>
  <div class="form">
    <div class="header">
      <slot name="header"></slot>
    </div>
    <el-form :label-width="labelWidth">
      <el-row>
        <template v-for="formItem in formItems" :key="formItem.filed">
          <el-col v-bind="colLayout">
            <el-form-item
              :label="formItem.label"
              :style="itemStyle"
              v-if="!formItem.isHidden"
            >
              <template
                v-if="formItem.type === 'input' || formItem.type === 'password'"
              >
                <el-input
                  :label="formItem.label"
                  :placeholder="formItem.placeholder"
                  v-model="FormData[`${formItem.filed}`]"
                  :show-password="formItem.type === 'password' ? true : false"
                >
                </el-input>
              </template>
              <template v-else-if="formItem.type === 'select'">
                <el-select
                  :label="formItem.label"
                  :placeholder="formItem.placeholder"
                  style="width: 100%"
                  v-model="FormData[`${formItem.filed}`]"
                >
                  <el-option
                    v-for="option in formItem.options"
                    :key="option.value"
                    :value="option.value"
                    :label="option.label"
                    v-model="FormData[`${formItem.filed}`]"
                  ></el-option>
                </el-select>
              </template>
              <template v-else-if="formItem.type === 'datapicker'">
                <el-date-picker
                  :label="formItem.label"
                  v-model="FormData[`${formItem.filed}`]"
                  v-bind="formItem.otherOptions"
                >
                </el-date-picker>
              </template>
            </el-form-item>
          </el-col>
        </template>
      </el-row>
    </el-form>
    <div class="footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, watch } from 'vue'
import { ISearchForm } from '../types'

export default defineComponent({
  props: {
    modelValue: {
      type: Object,
      required: true
    },
    formItems: {
      type: Array as PropType<ISearchForm[]>,
      required: true
    },
    labelWidth: {
      type: String,
      default: '100px'
    },
    itemStyle: {
      type: Object,
      default: () => ({ padding: '10px 40px' })
    },
    colLayout: {
      type: Object,
      default: () => ({
        xl: 6,
        lg: 8,
        md: 12,
        sm: 24,
        xs: 24
      })
    }
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const FormData = ref({ ...props.modelValue })
    watch(
      FormData,
      (newValue) => {
        emit('update:modelValue', newValue)
      },
      { deep: true }
    )

    return {
      FormData
    }
  }
})
</script>

<style lang="less" scoped>
.form {
  padding: 10px;
}
</style>
