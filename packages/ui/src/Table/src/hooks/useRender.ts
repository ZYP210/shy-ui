import { DictTag } from '../../../DictTag'
// import Icon from '@/components/Icon'
import { Button, Tag } from 'ant-design-vue'
import dayjs from 'dayjs'
import { h } from 'vue'
import { TableImg } from '../..'
import { isArray } from '@shy-plugins/utils'
import { JsonPreview } from '../../../CodeEditor'

export const useRender = (useDictStore?: () => any) => {
  /**
   * 渲染图片
   * @param text 图片地址
   * @returns image标签
   */
  const renderImg = (text) => {
    if (text) {
      if (isArray(text)) {
        return h(TableImg, { imgList: text })
      } else {
        return h(TableImg, { imgList: text.split('') })
      }
    }
    return ''
  }
  /**
     * 渲染链接
     * @param url 链接地址
     * @param text 文字说明
     * @returns link 按钮
    //  */
  const renderLink = (url, text?) => {
    if (url) {
      return h(
        Button,
        { type: 'link', href: url, target: '_blank' },
        () => text || ''
      )
    }
    return ''
  }
  /**
   * 渲染文本，将text与val 拼接到一起
   * @param text 文本1
   * @param val 文本2
   * @returns 文本1 + 文本2
   */
  const renderText = (text, val) => {
    if (text) {
      return text + ' ' + val
    } else {
      return ''
    }
  }
  /**
   * 渲染标签
   * @param text 标签文本
   * @param color 标签颜色
   * @returns 标签
   */
  const renderTag = (text, color?) => {
    if (!color) {
      return h(Tag, { color }, () => text)
    } else {
      return h('span', text)
    }
  }
  /**
   * 渲染多标签
   * @param texts 文本
   * @returns 多标签
   */
  const renderTags = (texts: string[]) => {
    if (texts) {
      return h('div', null, [
        texts.map((text) => {
          return h(Tag, null, () => text)
        })
      ])
    }
    return ''
  }
  /**
   * 渲染日期
   * @param text 日期
   * @param format 格式化
   * @returns 格式化后日期
   */
  const renderDate = (text, format?) => {
    if (!text) {
      return ''
    }
    if (!format) {
      return dayjs(text).format('YYYY-MM-DD HH:mm:ss')
    } else {
      return dayjs(text).format(format)
    }
  }
  /**
   * 渲染字典
   * @param text 字典值
   * @param type 字典类型
   * @param dictType number | string | boolean
   * @returns 字典标签
   */
  const renderDict = (text, type, dictType?) => {
    if (type) {
      return h(DictTag, {
        type: type,
        value: text,
        dictType: dictType,
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        useDictStore: useDictStore!
      })
    }
    return ''
  }
  /**
   * 渲染图标icon
   * @param text icon
   * @returns icon
   */
  // renderIcon: (text) => {
  //   if (text) {
  //     return h(Icon { icon: text })
  //   }
  // }
  /**
   * 使用JsonPreview组件  方便预览JSON
   * @param json json字符串/obj
   * @returns 能转为json返回JsonPreview 否则返回自身
   */
  const renderJsonPreview = (json: any) => {
    if (!json) return ''
    if (typeof json === 'object') {
      return h(JsonPreview, { data: json })
    }
    if (typeof json === 'string') {
      try {
        const data = JSON.parse(json)
        return h(JsonPreview, { data })
      } catch (e) {
        return json
      }
    }
  }

  if (useDictStore) {
    return {
      renderImg,
      renderText,
      renderTag,
      renderTags,
      renderLink,
      renderDate,
      renderDict,
      renderJsonPreview
    }
  } else {
    return {
      renderImg,
      renderText,
      renderTag,
      renderTags,
      renderDate,
      renderLink,
      renderJsonPreview
    }
  }
}
