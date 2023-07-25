export type Coordinate = [number, number]

export type PopupOption = {
  coordinate?: Coordinate
  text?: string
  html?: string
  closeOnClick?: boolean
}

export type AnchorOption = {
  coordinate?: Coordinate
  text?: string
  closeOnClick?: boolean
  html?: string
  img?: any
  markerHtml: string
}

export type PointOption = {
  minZoom: number
  maxZoom: number
  coordinate?: Coordinate
  style?: any
  onClick: any
  name: string
}

export type IconOption = {
  coordinate?: Coordinate
  url?: any
  iconType?: 'png' | 'gif'
  style?: any
  onClick?: any
}
