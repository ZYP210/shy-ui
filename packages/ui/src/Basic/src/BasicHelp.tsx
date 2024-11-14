import type { CSSProperties, JSXComponent, PropType } from 'vue'
import { defineComponent, computed, unref } from 'vue'
import { Tooltip } from 'ant-design-vue'
import { QuestionCircleOutlined } from '@ant-design/icons-vue'
import { getPopupContainer } from '@shy-plugins/utils'
import { isString, isArray } from '@shy-plugins/utils'
import { getSlot } from '@shy-plugins/utils'
import '../style/index.less'
import { TooltipPlacement } from 'ant-design-vue/es/tooltip'
import { isFunction } from 'lodash-es'

const props = {
  /**
   * Help text max-width
   * @default: 600px
   */
  maxWidth: { type: String, default: '600px' },
  /**
   * Whether to display the serial number
   * @default: false
   */
  showIndex: { type: Boolean },
  /**
   * Help text font color
   * @default: #ffffff
   */
  color: { type: String, default: '#ffffff' },
  /**
   * Help text font size
   * @default: 14px
   */
  fontSize: { type: String, default: '14px' },
  /**
   * Help text list
   */
  placement: { type: String as PropType<TooltipPlacement>, default: 'right' },
  /**
   * Help text list
   */
  text: {
    type: [Array, String, Function] as PropType<
      string | string[] | JSXComponent | JSX.Element
    >
  },
  /**
   * Help text font size
   * @default: 14px
   */
  iconSize: { type: String, default: '14px' }
}

export default defineComponent({
  name: 'BasicHelp',
  components: { Tooltip },
  props,
  setup(props, { slots }) {
    // const { prefixCls } = useDesign('basic-help')
    const prefixCls = 'shy-basic-help'

    const getTooltipStyle = computed(
      (): CSSProperties => ({ color: props.color, fontSize: props.fontSize })
    )

    const getOverlayStyle = computed(
      (): CSSProperties => ({ maxWidth: props.maxWidth })
    )

    function renderTitle() {
      const textList = props.text

      if (isString(textList)) {
        return <p>{textList}</p>
      }

      if (isArray(textList)) {
        return textList.map((text, index) => {
          return (
            <p key={text}>
              <>
                {props.showIndex ? `${index + 1}. ` : ''}
                {text}
              </>
            </p>
          )
        })
      }

      if(isFunction(textList)) {
        return textList()
      }

      return textList
    }

    return () => {
      return (
        <Tooltip
          {...props}
          overlayClassName={`${prefixCls}__wrap`}
          title={<div style={unref(getTooltipStyle)}>{renderTitle()}</div>}
          autoAdjustOverflow={true}
          overlayStyle={unref(getOverlayStyle)}
          placement={props.placement}
          getPopupContainer={() => getPopupContainer()}
        >
          <span class={prefixCls}>
            {getSlot(slots) || (
              <QuestionCircleOutlined style={{ fontSize: props.iconSize }} />
            )}
          </span>
        </Tooltip>
      )
    }
  }
})
