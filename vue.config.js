const { defineConfig } = require('@vue/cli-service')
const AutoImport = require('unplugin-auto-import/webpack')
const Components = require('unplugin-vue-components/webpack')
const { ElementPlusResolver } = require('unplugin-vue-components/resolvers')
const IconsResolver = require('unplugin-icons/resolver')
const Icons = require('unplugin-icons/webpack')
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const BundleAnalyzerPlugin =
  require('webpack-bundle-analyzer').BundleAnalyzerPlugin

const path = require('path')
const pathSrc = path.resolve(__dirname, 'src')

module.exports = defineConfig({
  productionSourceMap: false,
  chainWebpack: (config) => {
    if (process.env.NODE_ENV === 'production') {
      config.devtool('eval-cheap-source-map')
      config.externals({
        echarts: 'echarts',
        vue: 'Vue',
        'vue-router': 'VueRouter',
        vuex: 'vuex',
        lodash: '_'
      })
      config.plugin('compress').use(
        new CompressionWebpackPlugin({
          algorithm: 'gzip',
          test: /\.js$|\.html$|\.json$|\.css/,
          threshold: 1024 * 100,
          minRatio: 0.8
        })
      )
      config.plugin('BundleAnalyzerPlugin').use(BundleAnalyzerPlugin)
    }
    config.resolve.alias.set('@', pathSrc).set('views', '@/views')
    config.plugin('AutoImport').use(
      AutoImport({
        resolvers: [
          // Auto import functions from Element Plus, e.g. ElMessage, ElMessageBox... (with style)
          // 自动导入 Element Plus 相关函数，如：ElMessage, ElMessageBox... (带样式)
          ElementPlusResolver({
            importStyle: 'css',
            exclude: new RegExp(/^(?!.*loading-directive).*$/)
          })

          // Auto import icon components
          // 自动导入图标组件,再手动注册组件。（不推荐）
          // IconsResolver({
          //   prefix: 'Icon'
          // })
        ],
        dts: path.resolve(pathSrc, 'auto-imports.d.ts')
      })
    )
    config.plugin('Components').use(
      Components({
        resolvers: [
          // Icon自动引入解析器
          IconsResolver({
            // 自动引入的Icon组件统一前缀，默认为 i，设置false为不需要前缀
            enabledCollections: ['ep']
            // 当图标集名字过长时，可使用集合别名
            // alias: {
            //   system: 'system-uicons'
            // }
          }),
          ElementPlusResolver()
        ],
        dts: path.resolve(pathSrc, 'components.d.ts')
      })
    )
    config.plugin('Icons').use(
      Icons({
        compiler: 'vue3',
        autoInstall: true
      })
    )
  }
})
