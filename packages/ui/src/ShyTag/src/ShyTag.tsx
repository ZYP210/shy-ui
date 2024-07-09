import { computed, defineComponent, unref } from 'vue'
import { useDesign } from '@shy-plugins/use'
import './style/tag.css'
import { Tag } from 'ant-design-vue'
import { shyTagBasicProps } from './props'

const ShyTag = defineComponent({
  props: shyTagBasicProps,
  setup(props) {
    const { prefixCls } = useDesign('tag')

    const fieldNames = computed(() => ({
      label: 'label',
      value: 'value',
      color: 'colorType',
      css: 'cssClass',
      ...props.fieldNames
    }))

    const tag = computed(
      () =>
        props.options.find(
          (item) => item[unref(fieldNames).value] == props.value
        ) ?? {
          [unref(fieldNames).label]: '-',
          [unref(fieldNames).color]: 'var(--gray-5)',
          [unref(fieldNames).css]: ''
        }
    )

    const renderTag = computed(() => {
      const [isTag, tagMode] = [props.isTag, props.tagMode]

      const label = unref(tag)[unref(fieldNames).label]
      const color = unref(tag)[unref(fieldNames).color]
      const css = unref(tag)[unref(fieldNames).css]

      const PointComp = (
        <div class={[prefixCls, css]} style={{ '--color': color }}>
          <div class={`${prefixCls}-pointer`}></div>
          <span class={`${prefixCls}-label`}>{label}</span>
        </div>
      )

      const TagComp = (
        <div class={[prefixCls, css]}>
          <Tag style={{ '--color': color }}>{label}</Tag>
        </div>
      )

      const TextComp = (
        <span class={[prefixCls, css]} style={{ '--color': color }}>
          {label}
        </span>
      )

      if (!isTag) {
        return unref(label)
      }

      switch (tagMode) {
        case 'point':
          return PointComp
        case 'tag':
          return TagComp
        case 'text':
          return TextComp
        default:
          return PointComp
      }
    })

    return () => unref(renderTag)
  }
})

export { ShyTag }
