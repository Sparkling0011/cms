import { RouteRecordRaw } from 'vue-router'
import { IBreadcrumb } from '../base-ui/breadcrumb'

let fristUrl: string
export function getRouterMap(userMenus: any): RouteRecordRaw[] {
  const routeMaps: RouteRecordRaw[] = []

  const allRoutes: RouteRecordRaw[] = []
  const paths = require.context('../router/main', true, /\.ts/)
  paths.keys().forEach((key) => {
    const route = require('../router/main' + key.slice(1))
    allRoutes.push(route.default)
  })

  function findMatchRoute(menus: any[]) {
    menus.forEach((menu: any) => {
      if (menu.type === 2) {
        const route = allRoutes.find((route) => route.path === menu.url)
        if (route) routeMaps.push(route)
        fristUrl = menu.url
      } else {
        findMatchRoute(menu.children)
      }
    })
  }
  findMatchRoute(userMenus)
  return routeMaps
}

export function mapbreadtoMenu(menus: any[], path: string) {
  const breadcrumb: IBreadcrumb[] = []
  mapUrlToMenu(menus, path, breadcrumb)
  return breadcrumb
}

export function mapUrlToMenu(
  menus: any[],
  path: string,
  breadcrumb?: IBreadcrumb[]
): any {
  for (const menu of menus) {
    if (menu.type === 1) {
      const resMenu = mapUrlToMenu(menu.children, path)
      if (resMenu) {
        breadcrumb?.push({ name: menu.name, path: menu.url })
        breadcrumb?.push({ name: resMenu.name, path: resMenu.url })
        return resMenu
      }
    } else if (menu.type === 2) {
      if (menu.url === path) return menu
    }
  }
}
export function mapMenuToPermission(menus: any[]) {
  const permission: any[] = []
  function _recurseMenu(menu: any[]) {
    menu.forEach((item) => {
      if (item.type === 1 || item.type === 2) {
        _recurseMenu(item.children ?? [])
      } else if (item.type === 3) {
        permission.push(item.permission)
      }
    })
  }
  _recurseMenu(menus)
  return permission
}
export function getLeaveList(menusList: any[]) {
  const leaveList: number[] = []
  function _recurseMenu(list: any) {
    if (list.children) {
      _recurseMenu(list.children)
    } else {
      leaveList.push(list.id)
    }
  }
  _recurseMenu(menusList)
  return leaveList
}
export { fristUrl }
