import { BasicButton } from '../../Button'
import { FlagFilled } from '@ant-design/icons-vue'
import { defineComponent, computed, unref } from 'vue'
import { shyContainerProps } from './props'
import { useDesign } from '@shy-plugins/use'
import './style/container.less'
import { Breadcrumb, PageHeader } from 'ant-design-vue'
const BreadcrumbItem = Breadcrumb.Item

export default defineComponent({
  name: 'ShyTable',
  components: {
    BasicButton,
    Breadcrumb,
    BreadcrumbItem
  },
  props: shyContainerProps,
  emits: ['submit', 'cancel', 'save', 'route-change'],
  setup(props, { slots, emit }) {
    const { prefixCls } = useDesign('container')

    const cancelAlignRef = computed(() => {
      return `${prefixCls}-footer-cancel-${props.cancelAlign}`
    })

    const footerAlignRef = computed(() => {
      return `${prefixCls}-footer-${props.footerAlign}`
    })

    const toUpper = (str: string) => {
      return str[0].toUpperCase() + str.slice(1)
    }

    const getNavBar = () => {
      return (
        <Breadcrumb class={`${prefixCls}-nav`}>
          {props.navBars.map((item: any) => {
            return (
              <BreadcrumbItem>
                {item.path ? (
                  <router-link
                    to={item.path}
                    onClick={() => emit('route-change', item)}
                  >
                    {item.name}
                  </router-link>
                ) : (
                  <span>{item.name}</span>
                )}
              </BreadcrumbItem>
            )
          })}
        </Breadcrumb>
      )
    }

    const flagHeader = () => {
      return (
        <>
          {props.navBars.length ? getNavBar() : null}
          <div class={`${prefixCls}-header`}>
            <div class={`${prefixCls}-header-title`}>
              <FlagFilled class={`${prefixCls}-header-title-icon`} />
              <div class={`${prefixCls}-header-title-text`}>{props.title}</div>
            </div>
            <div class={`${prefixCls}-header-extra`}>{slots?.extra?.()}</div>
          </div>
        </>
      )
    }

    const getHeader = () => {
      if (slots?.header) return slots?.header()
      switch (props.pageHeader) {
        case 'flag':
          return flagHeader()
        case 'arrow':
          return (
            <PageHeader
              {...props}
              onBack={props.onCancel}
              v-slots={slots}
            ></PageHeader>
          )
        default:
          return null
      }
    }

    const getContent = () => {
      return <div class={`${prefixCls}-content`}>{slots?.default?.()}</div>
    }

    const optionBtnKeys = ['cancel', 'save', 'submit'] as const

    enum BtnTypeEnum {
      cancel = 'default',
      save = 'primary',
      submit = 'primary'
    }

    const Button = (key: 'cancel' | 'save' | 'submit') => {
      if (typeof key !== 'string') return

      return props[`isShow${toUpper(key)}Btn`] ? (
        <BasicButton
          type={BtnTypeEnum[key]}
          loading={props.loading}
          onClick={props[`on${toUpper(key)}`]}
        >
          {props[`${key}BtnText`]}
        </BasicButton>
      ) : null
    }

    const getFooter = () => {
      return (
        <div class={`${prefixCls}-footer ${unref(footerAlignRef)}`}>
          {slots?.footer ? (
            slots?.footer()
          ) : props.isShowBtn ? (
            <div class={`${prefixCls}-footer-buttons ${unref(cancelAlignRef)}`}>
              {optionBtnKeys.map((key) => {
                return Button(key)
              })}
              {slots?.buttons?.()}
            </div>
          ) : null}
        </div>
      )
    }

    return () => {
      return (
        <div class={prefixCls}>
          {props.isShowHeader && props.title ? getHeader() : null}
          {getContent()}
          {props.isShowFooter ? getFooter() : null}
        </div>
      )
    }
  }
})
