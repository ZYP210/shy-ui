import {
  ref,
  onMounted,
  shallowRef,
  defineComponent,
  h,
  Vue2,
  nextTick
} from 'vue-demi'
import { DEFAULT_COORDINATES } from './const'
import {
  usePoint,
  useLine,
  useCamera,
  usePopup,
  useStyle,
  useSearch
} from './hook'
import { getRandomCoordinates } from './utils'

export default defineComponent({
  props: {
    option: {
      type: Object,
      default: () => ({})
    }
  },
  emits: ['register', 'result'],
  setup(props, { emit }) {
    const wrapperRef = ref()
    const map = shallowRef()
    const layerList = []

    // 点方法
    const { setIcon, setPoint3D, setPoint2D, setMarker } = usePoint(map)
    // 线方法
    const { setLine } = useLine(map)
    // 视角移动
    const { panTo, flyTo, easeTo, jumpTo } = useCamera(map)
    // 信息窗体
    const { createPopup, setPopup, setAnchor } = usePopup(map)
    // 主题设置
    const { setTheme } = useStyle(map)
    //POI search
    const { getSearchResult } = useSearch(map, { emit })

    const renderMap = () => {
      map.value = new aimap.Map({
        container: 'ai-map',
        center: [111.663408, 34.390238],
        zoom: 3,
        minZoom: 4,
        maxZoom: 20,
        pitch: 0,
        bearing: 0,
        style: 'aimap://styles/aimap/darkblue-v4',
        localIdeographFontFamily: "'Microsoft YaHei'",
        ...props.option
      })
    }

    const removeMap = () => {
      map.value.remove()
    }

    return {
      map,
      renderMap,
      removeMap,
      setIcon,
      setPoint2D,
      setMarker,
      setLine,
      panTo,
      flyTo,
      easeTo,
      jumpTo,
      createPopup,
      setPopup,
      setTheme,
      getSearchResult,
      getRandomCoordinates,
      setAnchor
    }
  },
  render() {
    const attrs = Vue2
      ? {
          ref: 'aiMap',
          attrs: { id: 'ai-map' },
          staticClass: 'ai-map-wrapper'
        }
      : { id: 'ai-map', class: 'ai-map-wrapper' }
    return h('div', attrs)
  }
})
