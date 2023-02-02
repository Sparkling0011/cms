import * as Echarts from 'echarts'

function createEchartsInstance(El: HTMLElement) {
  const echartsInstance = Echarts.init(El)

  const setOptions = (options: echarts.EChartsOption) => {
    echartsInstance.setOption(options)
  }
  window.addEventListener('resize', () => {
    echartsInstance.resize()
  })
  const updateSize = () => {
    echartsInstance.resize()
  }
  return { echartsInstance, setOptions, updateSize }
}
export default createEchartsInstance
