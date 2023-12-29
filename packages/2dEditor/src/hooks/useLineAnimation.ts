import { Pen } from '@meta2d/core'

const presetAnimationOne: Pen = {
  type: 1,
  name: 'line',
  anchors: [
    { x: 0, y: 0 },
    { x: 1, y: 1 }
  ],
  animateLineDash: [5, 10],
  color: '#478BFF00',
  borderColor: '#186DFF78',
  lineWidth: 4,
  borderWidth: 12,
  autoPlay: true,
  lineAnimateType: 1,
  animateSpan: 1,
  animateColor: '#478BFFFF',
  animateDotSize: 20,
  animateReverse: false
}
export const useLineAnimation = () => {
  const startLineAnimationPresetOne = (id: string) => {
    meta2d.startAnimate(id)
    meta2d.setValue({ id, ...presetAnimationOne })
    meta2d.render()
  }

  return { presetAnimationOne, startLineAnimationPresetOne }
}
