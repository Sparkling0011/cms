export const tableConfig = {
  propsData: [
    { prop: 'name', label: '商品名称', minWidth: '100px' },
    { prop: 'oldPrice', label: '原价', minWidth: '80px' },
    { prop: 'newPrice', label: '售价', minWidth: '80px' },
    { prop: 'status', label: '状态', minWidth: '100px', slotName: 'status' },
    { prop: 'imgUrl', label: '图片', minWidth: '100px', slotName: 'imgUrl' },
    { prop: 'address', label: '发货地', minWidth: '100px' },
    {
      prop: 'inventoryCount',
      label: '库存数量',
      minWidth: '100px'
    },
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
  isShowIndex: true,
  isShowSelection: true
}
