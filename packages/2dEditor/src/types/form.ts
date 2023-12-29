import type { Component } from 'vue'

export type FormSchema = {
  component: Component
  field: string
  label: string
  componentProps: Recordable
  col?: number
  ifShow?: boolean | Function
}
