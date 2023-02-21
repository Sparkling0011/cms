const overview = () =>
  import(
    /* webpackChunkName: "analysis" */ '@/views/main/analysis/overview/overview.vue'
  )
export default {
  path: '/main/analysis/overview',
  name: 'overview',
  component: overview,
  children: []
}
