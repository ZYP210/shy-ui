import { ref } from 'vue-demi'
import png from '../1.png'
import type { Coordinate, IconOption, PointOption } from '../types'

export const usePoint = (map) => {
  const setPoint2D = (option: PointOption = {} as PointOption) => {
    const {
      onClick = (e) => {},
      style = {},
      coordinate = [121.612946, 31.205494],
      name = ''
    } = option

    const MassMarkerLayer = ref()

    MassMarkerLayer.value = new aimap.MassMarkerLayer({
      map: map.value,
      data: [
        {
          coordinates: coordinate,
          name
        }
      ],
      style: {
        'text-field': '{name}{id}',
        'text-offset': [0, 1.5],
        'text-color': '#e3e3ff',
        'text-size': 12,
        'circle-color': '#cc8ce8',
        'circle-radius': 6,
        'circle-stroke-color': '#ffff00',
        'circle-stroke-opacity': 0.5,
        'circle-stroke-width': 1,
        blink: {
          'circle-color': '#ff6600',
          'circle-radius': 60,
          'circle-opacity': 0.6,
          visibility: 'none'
        },
        ...style
      }
    })

    MassMarkerLayer.value.on('click', (e) => {
      console.log(onClick)
      onClick(e)
    })

    return MassMarkerLayer
  }

  const setPoint3D = (option = {}) => {
    const { data, style, onClick = () => {} } = option

    map.value.on('load', () => {
      const MassMarkerLayer = new aimap.MassMarkerLayer({
        map: map.value,
        minZoom: 12,
        mode: '3d',
        data: data || [
          {
            id: 1,
            name: 'A',
            height: 100,
            coordinates: [121.612846, 31.205494]
          },
          {
            id: 2,
            name: 'B',
            height: 150,
            coordinates: [121.614946, 31.205494]
          },
          {
            id: 3,
            name: 'C',
            height: 200,
            coordinates: [121.611746, 31.205494]
          },
          {
            id: 4,
            name: 'D',
            height: 300,
            coordinates: [121.610646, 31.205494]
          }
        ],
        style: style || {
          'circle-color': '#ffc100',
          'circle-radius': 10,
          height: ['get', 'height']
        }
      })
      MassMarkerLayer.on('click', (e) => {
        onClick(e)
      })
    })
  }

  const setIcon = (option: IconOption = {}) => {
    const {
      style = {},
      url = png,
      iconType = undefined,
      coordinate = [121.613946, 31.205494],
      onClick = () => {}
    } = option

    const iconId = generateRandomId(8)
    const MassMarkerLayer = new aimap.MassMarkerLayer({
      map: map.value,
      data: [
        {
          id: 1,
          name: 'png',
          icon: iconId,
          coordinates: coordinate
        }
      ],
      images: [
        {
          id: iconId,
          url,
          type: iconType
        }
      ],
      style: {
        'text-field': '',
        'text-color': '#00ff00',
        'text-anchor': 'bottom',
        'text-offset': [0, -5],
        'icon-anchor': 'bottom',
        'icon-size': 1,
        ...style,
        'icon-image': ['get', 'icon'] //获取data中的icon属性值来配置图标
      }
    })

    MassMarkerLayer.on('click', (e) => {
      onClick(e)
    })

    return MassMarkerLayer
  }

  const setMarker = (coordinate: Coordinate = [121.499096, 31.239864]) => {
    // 创建一个默认的 Marker
    const marker = new aimap.Marker().setLngLat(coordinate).addTo(map.value)
    return marker
  }

  return {
    setPoint2D,
    setPoint3D,
    setIcon,
    setMarker
  }
}

function generateRandomId(length) {
  let result = ''
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length)
    result += characters.charAt(randomIndex)
  }

  return result
}
