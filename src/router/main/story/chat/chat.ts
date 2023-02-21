const chat = () =>
  import(/* webpackChunkName: "story" */ '@/views/main/story/chat/chat.vue')
export default {
  path: '/main/story/chat',
  name: 'chat',
  component: chat,
  children: []
}
