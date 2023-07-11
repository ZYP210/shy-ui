import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    label: {
      type: String,
      default: () => ''
    }
  },
  setup(props, { attrs }) {
    return () => <div class="shy-form-divider">{props.label}</div>
  }
})
