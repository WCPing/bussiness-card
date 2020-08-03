/**
 * Created by jsama on 2020/2/20.
 */
export default class NumberUtil {
    /**
     *  @link http://mottie.github.com/javascript-number-formatter/
     * @param value
     * @param format
     * @returns {*}
     */
    static format(value, format = '0.00') {
        if (!format || isNaN(+value)) {
            return value // return as it is.
        }

        var isNegative, result, decimal, group, posLeadZero, posTrailZero, posSeparator, part, szSep, integer

        // find prefix/suffix
        var len = format.length
        var start = format.search(/[0-9\-#]/)
        var prefix = start > 0 ? format.substring(0, start) : ''
        // reverse string: not an ideal method if there are surrogate pairs
        var str = format
            .split('')
            .reverse()
            .join('')
        var end = str.search(/[0-9\-#]/)
        var offset = len - end
        var substr = format.substring(offset, offset + 1)
        var indx = offset + (substr === '.' || substr === ',' ? 1 : 0)
        var suffix = end > 0 ? format.substring(indx, len) : ''

        // format with prefix & suffix removed
        format = format.substring(start, indx)

        // convert any string to number according to formation sign.
        value = format.charAt(0) === '-' ? -value : +value
        isNegative = value < 0 ? (value = -value) : 0 // process only abs(), and turn on flag.

        // search for separator for grp & decimal, anything not digit, not +/- sign, not #.
        result = format.match(/[^\d\-#]/g)
        decimal = (result && result[result.length - 1]) || '.' // treat the right most symbol as decimal
        group = (result && result[1] && result[0]) || ',' // treat the left most symbol as group separator

        // split the decimal for the format string if any.
        let newFormat = format.split(decimal)
        // Fix the decimal first, toFixed will auto fill trailing zero.
        value = value.toFixed(newFormat[1] && newFormat[1].length)
        value = +value + '' // convert number to string to trim off *all* trailing decimal zero(es)

        // fill back any trailing zero according to format
        posTrailZero = newFormat[1] && newFormat[1].lastIndexOf('0') // look for last zero in format
        part = value.split('.')
        // integer will get !part[1]
        if (!part[1] || (part[1] && part[1].length <= posTrailZero)) {
            value = (+value).toFixed(posTrailZero + 1)
        }
        szSep = newFormat[0].split(group) // look for separator
        newFormat[0] = szSep.join('') // join back without separator for counting the pos of any leading 0.

        posLeadZero = newFormat[0] && newFormat[0].indexOf('0')
        if (posLeadZero > -1) {
            while (part[0].length < newFormat[0].length - posLeadZero) {
                part[0] = '0' + part[0]
            }
        } else if (+part[0] === 0) {
            part[0] = ''
        }

        value = value.split('.')
        value[0] = part[0]

        // process the first group separator from decimal (.) only, the rest ignore.
        // get the length of the last slice of split result.
        posSeparator = szSep[1] && szSep[szSep.length - 1].length
        if (posSeparator) {
            integer = value[0]
            str = ''
            offset = integer.length % posSeparator
            len = integer.length
            for (indx = 0; indx < len; indx++) {
                str += integer.charAt(indx) // ie6 only support charAt for sz.
                // -posSeparator so that won't trail separator on full length
                if (!((indx - offset + 1) % posSeparator) && indx < len - posSeparator) {
                    str += group
                }
            }
            value[0] = str
        }
        value[1] = newFormat[1] && value[1] ? decimal + value[1] : ''

        // remove negative sign if result is zero
        result = value.join('')
        if (result === '0' || result === '') {
            // remove negative sign if result is zero
            isNegative = false
        }

        // put back any negation, combine integer and fraction, and add back prefix & suffix
        return prefix + ((isNegative ? '-' : '') + result) + suffix
    }

    static isNumber(val) {
        if (val === '' || val === null || (val && val.indexOf && val.indexOf(' ') >= 0)) {
            return false
        }
        if (!isNaN(val)) {
            return true
        } else {
            return false
        }
    }
    // 小数转百分比
    static toPercent(val) {
        if (val == 0) {
            return 0
        }
        let str = Number(val * 100).toFixed()
        str += '%'
        return str
    }

    // 大于某值返回某值+
    static toMax(val: number, max: number = 99) {
        return val > max ? `${max}+` : val
    }
}
