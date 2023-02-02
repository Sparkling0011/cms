import { IForm } from '@/base-ui/form'

export const SearchConfig: IForm = {
  labelWidth: '120px',
  itemStyle: { padding: '8px 10px' },
  colLayout: {
    xl: 6,
    lg: 8,
    md: 12,
    sm: 24,
    xs: 24
  },
  formItems: [
    {
      filed: 'id',
      type: 'input',
      label: 'ID',
      placeholder: '请输入ID'
    },
    {
      filed: 'name',
      type: 'input',
      label: '名字',
      placeholder: '请输入名字'
    },
    {
      filed: 'realname',
      type: 'input',
      label: '真实姓名',
      placeholder: '请输入真实姓名'
    },
    {
      filed: 'enable',
      type: 'select',
      label: '用户状态',
      placeholder: '请输入用户状态',
      options: [
        {
          label: '启用',
          value: 1
        },
        {
          label: '禁用',
          value: 0
        }
      ]
    },
    {
      filed: 'createAt',
      type: 'datapicker',
      label: '时间选择',
      otherOptions: {
        startPlaceholder: '开始时间',
        endPlaceholder: '结束时间',
        type: 'daterange'
      }
    }
  ]
}
