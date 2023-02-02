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
      filed: 'name',
      type: 'input',
      label: '查询1',
      placeholder: '请输入查询内容'
    },
    {
      filed: 'password',
      type: 'input',
      label: '查询2',
      placeholder: '请输入查询内容'
    }
  ]
}
