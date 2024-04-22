import { BasicButton } from '../../Button/index'
import { FlagFilled } from '@ant-design/icons-vue'
import { defineComponent, computed, unref } from 'vue'
import { shyContainerProps } from './props'
import { useDesign } from '@shy-plugins/use'
import './style/container.less'
import { Breadcrumb } from 'ant-design-vue'
const BreadcrumbItem = Breadcrumb.Item

export default defineComponent({
  name: 'ShyTable',
  components: {
    BasicButton,
    Breadcrumb,
    BreadcrumbItem
  },
  props: shyContainerProps,
  emits: ['submit', 'cancel', 'save'],
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

    const getHeader = () => {
      return (
        <div class={`${prefixCls}-header`}>
          <div class={`${prefixCls}-header-title`}>
            <FlagFilled class={`${prefixCls}-header-title-icon`} />
            <div class={`${prefixCls}-header-title-text`}>{props.title}</div>
          </div>
          <div class={`${prefixCls}-header-extra`}>{slots?.extra?.()}</div>
        </div>
      )
    }

    const getContent = () => {
      return <div class={`${prefixCls}-content`}>{slots?.default?.()}</div>
    }

    const optionBtnKeys = ['cancel', 'save', 'submit'] as const

    enum BtnTypeEnum {
      cancel = 'danger',
      save = 'primary',
      submit = 'primary'
    }

    const Button = (key: 'cancel' | 'save' | 'submit') => {
      if (typeof key !== 'string') return
      return props[`isShow${toUpper(key)}Btn`] ? (
        <BasicButton
          type={BtnTypeEnum[key]}
          loading={props.loading}
          onClick={() => emit(key)}
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

    const getNavBar = () => {
      return props.navBars.length ? (
        <Breadcrumb class={`${prefixCls}-nav`}>
          {props.navBars.map((item: any) => {
            return (
              <BreadcrumbItem>
                <a href={item.href}>{item.name}</a>
              </BreadcrumbItem>
            )
          })}
        </Breadcrumb>
      ) : null
    }

    return () => {
      return (
        <div class={prefixCls}>
          {getNavBar()}
          {props.isShowHeader ? getHeader() : null}
          {getContent()}
          {props.isShowFooter ? getFooter() : null}
        </div>
      )
    }
  }
})
