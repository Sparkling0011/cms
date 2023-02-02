import { ref } from 'vue'
import pageTable from '@/components/page-table'

export function getSearchResult() {
  const pageTableRef = ref<InstanceType<typeof pageTable>>()

  const handleQuery = (QueryParams: any) => {
    pageTableRef.value?.getData(QueryParams)
  }

  const handleResetfileds = () => {
    pageTableRef.value?.getData()
  }
  return [pageTableRef, handleQuery, handleResetfileds]
}
