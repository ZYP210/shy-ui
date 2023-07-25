export function getRandomCoordinates() {
  const minLat = 3.86 //中国最南端纬度
  const maxLat = 53.55 //中国最北端纬度
  const minLng = 73.66 //中国最西端经度
  const maxLng = 135.05 //中国最东端经度

  const lat = Math.random() * (maxLat - minLat) + minLat
  const lng = Math.random() * (maxLng - minLng) + minLng

  return [lng, lat]
}
