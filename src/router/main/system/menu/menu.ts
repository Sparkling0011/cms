const menu = () =>
  import(/* webpackChunkName: "system" */ '@/views/main/system/menu/menu.vue')
export default {
  path: '/main/system/menu',
  name: 'menu',
  component: menu,
  children: []
}
