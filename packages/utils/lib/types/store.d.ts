import { ErrorTypeEnum } from '../enums/exceptionEnum'
import { MenuModeEnum, MenuTypeEnum } from '../enums/menuEnum'

// Lock screen information
export interface LockInfo {
  // Password required
  pwd?: string | undefined
  // Is it locked?
  isLock?: boolean
}

// Error-log information
export interface ErrorLogInfo {
  // Type of error
  type: ErrorTypeEnum
  // Error file
  file: string
  // Error name
  name?: string
  // Error message
  message: string
  // Error stack
  stack?: string
  // Error detail
  detail: string
  // Error url
  url: string
  // Error time
  time?: string
}

export interface UserInfo {
  tenant_id: string
  user_id: string | number
  user_name: string
  nick_name: string
  role_name: string
  avatar: string
  // 角色id，逗号分隔
  role_id: string
  dept_id: string
  homePath?: string
}

export interface BeforeMiniState {
  menuCollapsed?: boolean
  menuSplit?: boolean
  menuMode?: MenuModeEnum
  menuType?: MenuTypeEnum
}
