import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'

const DATE_TIME_FORMAT = 'YYYY-MM-DD HH:mm:ss'

dayjs.extend(utc)

export function formatTimeUtc(
  value: string,
  format: string = DATE_TIME_FORMAT
) {
  return dayjs.utc(value).utcOffset(8).format(format)
}
