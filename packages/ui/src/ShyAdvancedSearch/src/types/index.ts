import { ComponentProps, ComponentType } from "../../../ShyForm"

export type AdvancedSearchType = 'number' | 'string' | 'date' | 'equal' | 'contain'

export type SchemasAdvancedSearch = {
  label: string
  field: string
  type: AdvancedSearchType,
  component: ComponentType
  componentProps?: ComponentProps
  globalShow?: boolean
  advancedShow?: boolean
}
