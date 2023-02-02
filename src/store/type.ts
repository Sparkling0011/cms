import { ILoginState } from './login/types'
import { ISystemState } from './main/system/type'
import { IAnalysisState } from './main/analysis/type'
export interface IRootState {
  entireDepartmentList: any[]
  entireRoleList: any[]
  entireMenuList: any[]
}

export interface IRootWithModule {
  login: ILoginState
  system: ISystemState
  analysis: IAnalysisState
}

export type IStoreType = IRootState & IRootWithModule
