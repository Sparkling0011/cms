type IFormType = 'input' | 'select' | 'datapicker' | 'password'
interface IOption {
  label: any
  value: any
}
export interface ISearchForm {
  filed: string
  type: IFormType
  label: string
  placeholder?: any
  rules?: any[]
  options?: IOption[]
  otherOptions?: any
  isHidden?: boolean
}

export interface IForm {
  formItems: ISearchForm[]
  labelWidth?: string
  itemStyle?: object
  colLayout?: object
}
