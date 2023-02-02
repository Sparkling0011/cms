import { IForm } from '@/base-ui/form'

export const DialogConfig: IForm = {
  labelWidth: '80px',
  colLayout: { span: 24 },
  formItems: [
    {
      filed: 'name',
      type: 'input',
      label: '角色名称',
      placeholder: '请输入角色名称'
    },
    {
      filed: 'intro',
      type: 'input',
      label: '权限名称',
      placeholder: '请输入权限名称'
    }
  ]
}
