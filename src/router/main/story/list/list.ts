const list = () =>
  import(/* webpackChunkName: "story" */ '@/views/main/story/list/list.vue')
export default {
  path: '/main/story/list',
  name: 'list',
  component: list,
  children: []
}
