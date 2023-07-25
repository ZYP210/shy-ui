import { defineComponent, h } from 'vue-demi'

export default defineComponent({
  render() {
    return h('div', {}, [h('div', { staticClass: 'a' })])
  }
})
