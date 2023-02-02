import { ref } from 'vue'
import pageDialog from '@/components/page-dialog'

type callbackType = (items?: any) => void
export function getDialogForm(
  editCallback?: callbackType,
  addCallback?: callbackType
) {
  const dialogRef = ref<InstanceType<typeof pageDialog>>()

  const defaultConfig = ref({})

  const addListDialog = () => {
    defaultConfig.value = {}
    if (dialogRef.value) {
      dialogRef.value.centerDialogVisible = true
    }
    addCallback && addCallback()
  }
  const editListDialog = (items: any) => {
    defaultConfig.value = { ...items }
    if (dialogRef.value) {
      dialogRef.value.centerDialogVisible = true
    }
    editCallback && editCallback(items)
  }
  return [editListDialog, addListDialog, defaultConfig, dialogRef]
}
