export const tableConfig = {
  propsData: [
    { prop: 'name', label: '名字', minWidth: '100px' },
    { prop: 'intro', label: '权限', minWidth: '100px' },
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
