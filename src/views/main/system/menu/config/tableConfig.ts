export const tableConfig = {
  propsData: [
    { prop: 'name', label: '菜单名称', minWidth: '100px' },
    { prop: 'type', label: '类型', minWidth: '80px' },
    { prop: 'icon', label: '图标', minWidth: '80px' },
    { prop: 'permission', label: '权限', minWidth: '80px' },
    {
      prop: 'createAt',
      label: '创建时间',
      minWidth: '100px',
      slotName: 'createAt'
    },
    {
      prop: 'handler',
      label: '操作',
      minWidth: '120px',
      slotName: 'handler'
    }
  ],
  isShowIndex: false,
  isShowSelection: false,
  tableProps: {
    'row-key': 'id',
    treeProps: {
      children: 'children'
    }
  },
  showPagination: false
}
