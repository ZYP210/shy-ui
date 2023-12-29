import { InjectionKey, provide, inject, Ref, ComputedRef } from 'vue'

export interface AppProviderContextProps {
  api: Ref<any> | ComputedRef<any>
  deviceDataSource: Recordable
}

const key: InjectionKey<AppProviderContextProps> = Symbol()

export function createContext(context: any) {
  provide(key, context)
}

export function useContext(): any {
  return inject(key)
}
