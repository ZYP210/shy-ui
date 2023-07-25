export const useCamera = (map) => {
  const panTo = (option) => map.value.panTo(option)
  const flyTo = (option) => map.value.flyTo(option)
  const easeTo = (option) => map.value.easeTo(option)
  const jumpTo = (option) => map.value.jumpTo(option)

  return {
    panTo,
    flyTo,
    easeTo,
    jumpTo
  }
}
