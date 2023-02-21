const role = () =>
  import(/* webpackChunkName: "system" */ '@/views/main/system/role/role.vue')
export default {
  path: '/main/system/role',
  name: 'role',
  component: role,
  children: []
}
