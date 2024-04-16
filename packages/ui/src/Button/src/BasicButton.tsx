import { computed, defineComponent } from 'vue'
import { buttonProps } from './props'
import { Button, ConfigProvider } from 'ant-design-vue'
import { Icon } from '../../Icon'

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
            colorPrimary = '#CF222E'
            break

          case 'waring':
            colorPrimary = '#BF8700'
            break

          case 'success':
            colorPrimary = '#2DA44E'
            break

          case 'message':
            colorPrimary = '#0969DA'
            break

          default:
            colorPrimary = '#2DA44E'
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
