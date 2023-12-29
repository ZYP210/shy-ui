import type { App, Component } from 'vue'

export function mergeProps(target: any, resource: any) {
  for (const i in target) {
    if (['width', 'height', 'x', 'y'].includes(i)) {
      let rect = meta2d.getPenRect(resource)
      target[i] = rect[i]
      continue
    }
    if (resource[i]) {
      target[i] = resource[i]
    } else {
      target[i] = resource.calculative?.[i]
    }
    if (!target[i]) {
      switch (typeof target[i]) {
        case 'string':
          target[i] = ''
          break
        case 'number':
          target[i] = 0
          break
        case 'boolean':
          target[i] = false
          break
      }
    }
  }
}

type EventShim = {
  new (...args: any[]): {
    $props: {
      onClick?: (...args: any[]) => void
    }
  }
}

export type CustomComponent = Component & { displayName?: string }

export type WithInstall<T> = T & {
  install(app: App): void
} & EventShim

export const withInstall = <T extends CustomComponent>(
  component: T,
  alias?: string
) => {
  ;(component as Record<string, unknown>).install = (app: App) => {
    const compName = component.name || component.displayName
    if (!compName) return
    app.component(compName, component)
    if (alias) {
      app.config.globalProperties[alias] = component
    }
  }
  return component as WithInstall<T>
}
