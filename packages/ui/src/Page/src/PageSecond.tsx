import { defineComponent } from 'vue'
import { ArrowLeftOutlined } from '@ant-design/icons-vue'
import { BasicButton } from '../../Button'
import { Space } from 'ant-design-vue'

const prefixCls = 'shy-basic-page-second'

export default defineComponent({
  props: {
    title: {
      type: String,
      default: () => 'Title'
    },
    isShowCancelButton: {
      type: Boolean,
      default: () => true
    },
    isShowConfirmButton: {
      type: Boolean,
      default: () => true
    },
    isShowFooter: {
      type: Boolean,
      default: () => false
    }
  },
  emits: ['click-return', 'confirm', 'cancel'],
  setup(props, { slots, emit }) {
    const handleClick = () => {
      emit('click-return')
    }

    const handleCancel = () => {
      emit('cancel')
    }

    const handleConfirm = () => {
      emit('confirm')
    }

    return () => (
      <div class={`${prefixCls}-wrapper`}>
        <div class={`${prefixCls}-header`}>
          <ArrowLeftOutlined
            class={`${prefixCls}-header-icon`}
            onClick={handleClick}
          />
          <div class={`${prefixCls}-header-title`}>
            <div style="margin-right:10px">
              {slots?.title ? slots?.title() : props.title}
            </div>
            {slots?.titleAfter ? slots?.titleAfter() : null}
          </div>
        </div>
        <div class={`${prefixCls}-body`}>{slots.default?.()}</div>

        {props.isShowFooter ? (
          <div class={`${prefixCls}-footer`}>
            <Space>
              {slots.beforeCancelButton?.()}

              {props.isShowCancelButton ? (
                <BasicButton onClick={handleCancel}>取消</BasicButton>
              ) : null}

              {slots.afterCancelButton?.()}

              {props.isShowConfirmButton ? (
                <BasicButton onClick={handleConfirm} type="primary">
                  确定
                </BasicButton>
              ) : null}

              {slots.beforeConfirmButton?.()}
            </Space>
          </div>
        ) : null}
      </div>
    )
  }
})
