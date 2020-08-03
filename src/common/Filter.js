import Vue from 'vue'
import DateUtil from '@/utils/DateUtil'
import NumberUtil from '@/utils/NumberUtil'

/**
 * 过滤器定制
 */
export default class Filter {
  static init() {
    // 空值过滤
    Vue.filter('empty', function (value) {
      return value === null || value === undefined || value === '' ? '--' : value
    })

    // 数字过滤
    Vue.filter('fmt', function (value, format) {
      if (value != null) {
        return NumberUtil.format(value, format)
      }
      return value
    })

    // 百分比
    Vue.filter('percent', function (value, format) {
      if (typeof value === 'number') {
        return NumberUtil.format(value, format) + '%'
      } else {
        return value
      }
    })

    // 最大值 (超过该值返回'该值+')
    Vue.filter('toMax', function (value, max) {
      if (typeof value === 'number') {
        return NumberUtil.toMax(value, max)
      } else {
        return value
      }
    })

    // 时间过滤
    Vue.filter('date', function (value, fmt = 'yyyy-MM-dd') {
      if (value) {
        // new Date('2020-02-22 18:18:18') ios无效，所以用/替换-
        return DateUtil.format(new Date(value.toString().replace(/-/g, '/')), fmt)
      } else {
        return value
      }
    })
  }
}
