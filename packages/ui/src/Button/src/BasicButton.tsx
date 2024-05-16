import { computed, defineComponent } from 'vue'
import { buttonProps } from './props'
import { Button, ConfigProvider } from 'ant-design-vue'
import { Icon } from '../../Icon'
import { getVarColor } from '../../style'
const BasicButton = defineComponent({
  props: buttonProps,
  setup(props, { attrs, slots }) {
    const getBindValue = computed(() => {
      return {
        ...attrs,
        ...props,
        type: ['danger', 'waring', 'success', 'message'].includes(props.type)
          ? 'primary'
          : props.type
      }
    })

    const renderButton = () => {
      const isDanger = () => {
        return props.type === 'danger' ? { type: undefined, danger: true } : {}
      }

      const getColor = () => {
        let colorPrimary: string
        switch (props.type || props.color) {
          case 'danger':
            colorPrimary = getVarColor('--red-6')
            break

          case 'waring':
            colorPrimary = getVarColor('--yellow-5')
            break

          case 'success':
            colorPrimary = getVarColor('--green-5')
            break

          case 'message':
            colorPrimary = getVarColor('--blue-6')
            break

          default:
            colorPrimary = getVarColor('--primary-5')
            break
        }

        return colorPrimary
      }

      const getTypeToken = () => {
        return {
          token: {
            colorPrimary: getColor()
          }
        }
      }

      const isLinkColorStyle = () => {
        return props.type === 'link' ? { color: getColor() } : {}
      }

      return (
        <ConfigProvider theme={getTypeToken()}>
          <Button
            {...getBindValue.value}
            {...isDanger()}
            onClick={props.onClick}
            style={isLinkColorStyle()}
          >
            {{
              default: (data) => {
                return (
                  <>
                    {props.preIcon ? (
                      <Icon icon={props.preIcon} size={props.iconSize} />
                    ) : null}
                    {slots?.default?.(data)}
                    {props.postIcon ? (
                      <Icon icon={props.postIcon} size={props.iconSize} />
                    ) : null}
                  </>
                )
              }
            }}
          </Button>
        </ConfigProvider>
      )
    }

    return () => {
      return renderButton()
    }
  }
})

export default BasicButton
