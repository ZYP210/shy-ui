import type { PopupOption, AnchorOption } from '../types'

export const usePopup = (map) => {
  const createPopup = (option) => {
    return new aimap.Popup(option)
  }

  const setPopup = (option: PopupOption = {}) => {
    const {
      text = '这是一个Popup',
      html,
      coordinate = [121.50547, 31.236532]
    } = option

    const popup = new aimap.Popup().setLngLat(coordinate)

    if (html) {
      popup.setHTML(html)
    } else {
      popup.setText(text)
    }
    popup.addTo(map.value)

    return { popup }
  }

  const setAnchor = (option: AnchorOption = {} as AnchorOption) => {
    const {
      coordinate = [121.50547, 31.236532],
      html = '<div>Hello world</div>',
      closeOnClick = false,
      img,
      markerHtml
    } = option

    const popup = new aimap.Popup({ closeOnClick }).setHTML(html)

    let marker
    if (img) {
      const el = document.createElement('div')
      el.className = 'marker'
      el.innerHTML = markerHtml
        ? markerHtml
        : `<div style="transform:translate(0px, 14px);"><img width="40px"  src="${img}"></div>`
      marker = new aimap.Marker({
        element: el
      })
    } else {
      marker = new aimap.Marker()
    }

    marker.setLngLat(coordinate).setPopup(popup).addTo(map.value).togglePopup()

    return { marker, popup }
  }

  return { setPopup, createPopup, setAnchor }
}
