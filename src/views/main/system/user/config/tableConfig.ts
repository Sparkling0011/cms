export const tableConfig = {
  propsData: [
    { prop: 'name', label: '名字', minWidth: '100px' },
    { prop: 'realname', label: '真实姓名', minWidth: '100px' },
    { prop: 'cellphone', label: '电话', minWidth: '100px' },
    { prop: 'enable', label: '状态', minWidth: '100px', slotName: 'enable' },
    {
      prop: 'createAt',
      label: '创建时间',
      minWidth: '100px',
      slotName: 'createAt'
    },
    {
      prop: 'updateAt',
      label: '更新时间',
      minWidth: '100px',
      slotName: 'updateAt'
    },
    {
      prop: 'handler',
      label: '操作',
      minWidth: '100px',
      slotName: 'handler'
    }
  ],
  isShowIndex: true,
  isShowSelection: true
}
