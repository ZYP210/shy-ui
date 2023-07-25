const defaultLineData = [
  {
    name: '线段1',
    coordinates: [
      [121.61060194294635, 31.2062484735943],
      [121.61095320910283, 31.2057744124741],
      [121.6112679495655, 31.20536693544446]
    ]
  },
  {
    name: '线段2',
    coordinates: [
      [121.61125141051002, 31.20662944902567],
      [121.61159198396018, 31.20629378861193],
      [121.6124597363301, 31.205635374550013]
    ]
  }
]

export const useLine = (map) => {
  const setLine = (option = {}) => {
    const { data = defaultLineData, style = {} } = option
    // 初始化线图层
    const instanceLayer = new aimap.LineString({
      map: map.value,
      data,
      style: {
        'line-width': 3,
        'line-color': '#FF0000',
        ...style
      }
    })

    return instanceLayer
  }

  return { setLine }
}
