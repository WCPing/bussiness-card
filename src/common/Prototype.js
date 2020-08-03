import DateUtil from 'utils/DateUtil'

export default class Prototype {
  static init() {
    // eslint-disable-next-line no-extend-native
    Date.prototype.toJSON = function () {
      return DateUtil.format(this, 'yyyy-MM-dd HH:mm:ss')
    }
    // var template1="我是{0}，今年{1}了";
    // var result1=template1.format("loogn",22);
    // eslint-disable-next-line
    String.prototype.format = function (args) {
      var result = this
      if (arguments.length > 0) {
        if (arguments.length === 1 && typeof (args) === 'object') {
          for (let key in args) {
            if (args[key] !== undefined) {
              let reg = new RegExp('({' + key + '})', 'g')
              result = result.replace(reg, args[key])
            }
          }
        } else {
          for (let i = 0; i < arguments.length; i++) {
            if (arguments[i] !== undefined) {
              // var reg = new RegExp('({[' + i + ']})', 'g')//这个在索引大于9时会有问题，谢谢何以笙箫的指出
              let reg = new RegExp('({)' + i + '(})', 'g')
              result = result.replace(reg, arguments[i])
            }
          }
        }
      }
      return result
    }

    Number.prototype.scale = function (n) {
      var number = this;
      if (isNaN(number) || number >= Math.pow(10, 21)) {
        return number;
      }
      if (typeof(n) == 'undefined' || n == 0) {
        return Math.round(number);
      }
      return Math.round(number * Math.pow(10, n)) / Math.pow(10, n);
    }
  }
}
