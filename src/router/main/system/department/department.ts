const department = () =>
  import(
    /* webpackChunkName: "system" */ '@/views/main/system/department/department.vue'
  )
export default {
  path: '/main/system/department',
  name: 'department',
  component: department,
  children: []
}
