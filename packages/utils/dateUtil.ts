/**
 * Independent time operation tool to facilitate subsequent switch to dayjs
 */
import dayjs from 'dayjs'

const DATE_TIME_FORMAT = 'YYYY-MM-DD HH:mm:ss'
const DATE_FORMAT = 'YYYY-MM-DD'

export function formatToDateTime(
  date?: dayjs.ConfigType,
  format = DATE_TIME_FORMAT
): string {
  return dayjs(date).format(format)
}

export function formatToDate(
  date?: dayjs.ConfigType,
  format = DATE_FORMAT
): string {
  return dayjs(date).format(format)
}

export const dateUtil = dayjs

export const calcDate = (date1, date2) => {
  const date3 = date2 - date1

  const days = Math.floor(date3 / (24 * 3600 * 1000))

  const leave1 = date3 % (24 * 3600 * 1000) //计算天数后剩余的毫秒数
  const hours = Math.floor(leave1 / (3600 * 1000))

  const leave2 = leave1 % (3600 * 1000) //计算小时数后剩余的毫秒数
  const minutes = Math.floor(leave2 / (60 * 1000))

  const leave3 = leave2 % (60 * 1000) //计算分钟数后剩余的毫秒数
  const seconds = Math.round(date3 / 1000)
  return {
    leave1,
    leave2,
    leave3,
    days: days,
    hours: hours,
    minutes: minutes,
    seconds: seconds
  }
}
