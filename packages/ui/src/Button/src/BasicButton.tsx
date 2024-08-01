import { computed, defineComponent, ref } from 'vue'
import { buttonProps } from './props'
import { Button, ConfigProvider } from 'ant-design-vue'
import { Icon } from '../../Icon'
import { useTheme } from '@shy-plugins/use'
import { isBoolean } from 'xe-utils'
import { omit } from 'lodash-es'

const BasicButton = defineComponent({
  props: buttonProps,
  setup(props, { attrs, slots }) {
    const { getVarColor } = useTheme()

    const loading = ref(false)

    const onClick = async (...args) => {
      if (!props.isContinuousClicks) {
        loading.value = true
        await props.onClick?.(...args)
        setTimeout(() => {
          loading.value = false
        }, 1000)
        return
      }

      props.onClick?.(...args)
    }

    const getBindValue = computed(() => {
      return omit({
        ...attrs,
        ...props,
        loading:
          isBoolean(props.loading) || props.isContinuousClicks
            ? props.loading
            : loading.value,
        type: ['danger', 'waring', 'success', 'message'].includes(props.type)
          ? 'primary'
          : props.type
      }, 'onClick')
    })

    const renderButton = () => {
      const isDanger = () => {
        return props.type === 'danger' ? { type: undefined, danger: true } : {}
      }

      const getColor = () => {
        let colorPrimary: string
        switch (props.type || props.color) {
          case 'danger':
            colorPrimary = getVarColor('--red-5')
            break

          case 'waring':
            colorPrimary = getVarColor('--yellow-5')
            break

          case 'success':
            colorPrimary = getVarColor('--green-5')
            break

          case 'message':
            colorPrimary = getVarColor('--blue-5')
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
            onClick={onClick}
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
