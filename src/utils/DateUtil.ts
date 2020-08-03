/**
 * Created by jsama on 2020/2/20.
 */

export default class DateUtil {
  /**
   * 将日期格式化为指定格式
   * @param date
   * @param fmt
   * @returns {*|string}
   */
  static format(date, fmt = "yyyy-MM-dd HH:mm:ss") {
    date = date === undefined ? new Date() : date;
    date = typeof date === "number" ? new Date(date) : date;
    fmt = fmt || "yyyy-MM-dd HH:mm:ss";
    var obj = {
      y: date.getFullYear(), // 年份，注意必须用getFullYear
      M: date.getMonth() + 1, // 月份，注意是从0-11
      d: date.getDate(), // 日期
      q: Math.floor((date.getMonth() + 3) / 3), // 季度
      w: date.getDay(), // 星期，注意是0-6
      H: date.getHours(), // 24小时制
      h: date.getHours() % 12 === 0 ? 12 : date.getHours() % 12, // 12小时制
      m: date.getMinutes(), // 分钟
      s: date.getSeconds(), // 秒
      S: date.getMilliseconds() // 毫秒
    };
    var week = ["天", "一", "二", "三", "四", "五", "六"];
    for (var i in obj) {
      fmt = fmt.replace(new RegExp(i + "+", "g"), function (m) {
        var val = obj[i] + "";
        if (i === "w") return (m.length > 2 ? "星期" : "周") + week[val];
        for (var j = 0, len = val.length; j < m.length - len; j++)
          val = "0" + val;
        return m.length === 1 ? val : val.substring(val.length - m.length);
      });
    }
    return fmt;
  }

  static parseDate(text, format) {
    return new Date(Date.parse(text.replace(/-/g, "/")));
  }

  static parseDatePiker(text, format) {
    var newValue = text.replace(/-/g, "");
    if (+newValue && newValue.length > 7) {
      var year = +newValue.substr(0, 4);
      var month = +newValue.substr(4, 2);
      var day = +newValue.substr(6, 2);
      return new Date(Date.UTC(year, month - 1, day));
    } else {
      return new Date();
    }
  }

  static getFirstDayOfMonth(date) {
    const temp = new Date(date.getTime());
    temp.setDate(1);
    return temp.getDay();
  }

  static isDateObject(val) {
    return val instanceof Date;
  }

  static getDayCountOfMonth(year, month) {
    if (month === 3 || month === 5 || month === 8 || month === 10) {
      return 30;
    }

    if (month === 1) {
      if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) {
        return 29;
      } else {
        return 28;
      }
    }

    return 31;
  }

  static getWeekNumber(src) {
    const date = new Date(src.getTime());
    date.setHours(0, 0, 0, 0);
    // Thursday in current week decides the year.
    date.setDate(date.getDate() + 3 - ((date.getDay() + 6) % 7));
    // January 4 is always in week 1.
    const week1 = new Date(date.getFullYear(), 0, 4);
    // Adjust to Thursday in week 1 and count number of weeks from date to week 1.
    // Rounding should be fine for Daylight Saving Time. Its shift should never be more than 12 hours.
    return (
      1 +
      Math.round(
        ((date.getTime() - week1.getTime()) / 86400000 -
          3 +
          ((week1.getDay() + 6) % 7)) /
        7
      )
    );
  }

  static getStartDateOfMonth(year, month) {
    const result = new Date(year, month, 1);
    const day = result.getDay();

    if (day === 0) {
      return DateUtil.prevDate(result, 7);
    } else {
      return DateUtil.prevDate(result, day);
    }
  }

  static prevDate(date, amount = 1) {
    return new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate() - amount
    );
  }

  static nextDate = function (date, amount = 1) {
    return new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate() + amount
    );
  };

  static addHour = function (date, amount = 1): Date {
    date = new Date(date.getTime() + amount * 60 * 60 * 1000);
    return date;
  };

  static addMinute = function (date, amount = 1): Date {
    date = new Date(date.getTime() + amount * 60 * 1000);
    return date;
  };

  static addDay = function (date, amount = 1) {
    date = new Date(date.getTime() + amount * 60 * 60 * 1000 * 24);
    return date;
  };

  static addYear = function (date, amount = 1) {
    const year = date.getFullYear();
    const month = date.getMonth();
    return DateUtil.changeYearMonthAndClampDate(date, year + amount, month);
  };

  static addMonth = function (date, amount = 1) {
    const year = date.getFullYear();
    const month = date.getMonth();
    return DateUtil.changeYearMonthAndClampDate(
      date,
      year + Math.floor((month + amount) / 11),
      Math.floor((month + amount) % 11)
    );
  };

  static isDate(date) {
    if (date === null || date === undefined) return false;
    if (isNaN(new Date(date).getTime())) return false;
    return true;
  }

  // static range = function (n) {
  //   // see https://stackoverflow.com/questions/3746725/create-a-javascript-array-containing-1-n
  //   return Array.apply(null, {
  //     length: n
  //   }).map((_, n) => n)
  // }

  static modifyDate = function (date, y, m, d) {
    return new Date(
      y,
      m,
      d,
      date.getHours(),
      date.getMinutes(),
      date.getSeconds(),
      date.getMilliseconds()
    );
  };

  static modifyTime = function (date, h, m, s) {
    return new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      h,
      m,
      s,
      date.getMilliseconds()
    );
  };

  static clearTime = function (date) {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
  };

  static prevYear(date, amount = 1) {
    return DateUtil.addYear(date, amount * -1);
  }

  static nextYear = function (date, amount = 1) {
    return DateUtil.addYear(date, amount);
  };

  static changeYearMonthAndClampDate = function (date, year, month) {
    // clamp date to the number of days in `year`, `month`
    // eg: (2010-1-31, 2010, 2) => 2010-2-28
    const monthDate = Math.min(
      date.getDate(),
      DateUtil.getDayCountOfMonth(year, month)
    );
    return DateUtil.modifyDate(date, year, month, monthDate);
  };

  static prevMonth = function (date) {
    const year = date.getFullYear();
    const month = date.getMonth();
    return month === 0
      ? DateUtil.changeYearMonthAndClampDate(date, year - 1, 11)
      : DateUtil.changeYearMonthAndClampDate(date, year, month - 1);
  };

  static nextMonth = function (date) {
    const year = date.getFullYear();
    const month = date.getMonth();
    return month === 11
      ? DateUtil.changeYearMonthAndClampDate(date, year + 1, 0)
      : DateUtil.changeYearMonthAndClampDate(date, year, month + 1);
  };

  static getDayCountOfYear = function (year) {
    const isLeapYear = year % 400 === 0 || (year % 100 !== 0 && year % 4 === 0);
    return isLeapYear ? 366 : 365;
  };

  // 计算相差的天数、时、分
  static differTime = function (date) {
    const now = new Date();
    const differTime = date.getTime() - now.getTime();
    //计算出相差天数
    var days = Math.floor(differTime / (24 * 3600 * 1000));
    //计算出小时数
    var leave1 = differTime % (24 * 3600 * 1000); //计算天数后剩余的毫秒数
    var hours = Math.floor(leave1 / (3600 * 1000));
    //计算相差分钟数
    var leave2 = leave1 % (3600 * 1000); //计算小时数后剩余的毫秒数
    var minutes = Math.floor(leave2 / (60 * 1000));
    // //计算相差秒数
    // var leave3=leave2%(60*1000)      //计算分钟数后剩余的毫秒数
    // var seconds=Math.round(leave3/1000)
    var string = "";
    if (days > 0) {
      string += days + "天";
    }
    if (hours > 0 || days > 0) {
      string += hours + "时";
    }
    if (minutes > 0 || hours > 0 || days > 0) {
      string += minutes + "分";
    }
    // return days + "天" + hours + "时" + minutes + "分";
    return days;
  };

  // 计算相差的时、分、秒数组
  static getDifferTimeArr = function (date) {
    const now = new Date();
    const differTime = date.getTime() - now.getTime();
    if (differTime <= 0) {
      return []
    }
    //计算出相差天数
    var days = Math.floor(differTime / (24 * 3600 * 1000));
    // 3天内才显示倒计时，大于3天直接返回空数组
    if (days >= 3) {
      return []
    }
    //计算出小时数
    var leave1 = differTime % (24 * 3600 * 1000); //计算天数后剩余的毫秒数
    var hours = Math.floor(differTime / (3600 * 1000));
    //计算相差分钟数
    var leave2 = leave1 % (3600 * 1000); //计算小时数后剩余的毫秒数
    var minutes = Math.floor(leave2 / (60 * 1000));
    //计算相差秒数
    var leave3 = leave2 % (60 * 1000)      //计算分钟数后剩余的毫秒数
    var seconds = Math.round(leave3 / 1000)
    var timeArr: any[] = []
    timeArr = [hours, minutes, seconds]
    return timeArr
  };

  // /// 判断距离自动确认到期是否为3天内
  // static isInThreeDays = function (date) {
  //   const now = new Date()
  //   // console.log(now, ',' ,date)
  //   const differTime = date.getTime() - now.getTime()
  //   //计算出相差天数
  //   var days = Math.floor(differTime / (24 * 3600 * 1000))
  //   if (days > 3) {
  // 		wx.showToast({ title: '距离自动确认收货到期前3天方可申请哦', icon: 'none' })
  // 		return false
  //   } else {
  // 		return true
  // 	}
  // }

  static getDayDetail(dateStr) {
    const now = new Date()
    const date = new Date(dateStr.replace(/-/g, "/"))

    let weekStr = DateUtil.getWeekDayByDate(date)

    var td: any = new Date();
    td = new Date(td.getFullYear(), td.getMonth(), td.getDate());
    var od: any = new Date(dateStr.replace(/-/g, "/"));
    od = new Date(od.getFullYear(), od.getMonth(), od.getDate());
    var xc: any = (od - td) / 1000 / 60 / 60 / 24;

    if (xc == 0) {
      return `今天 (${weekStr})`;
    } else if (xc < 2 && xc > 0) {
      return `明天 (${weekStr})`;
    } else if (xc < 3 && xc > 0) {
      return `后天 (${weekStr})`;
    } else {
      return DateUtil.format(date, "yyyy.MM.dd")
    }
  }

  // 获取今天是周几
  static getWeekDayByDate(date) {
    let d = date
    if (d.getDay() === 1) {
      return '星期一'
    }
    if (d.getDay() === 2) {
      return '星期二'
    }
    if (d.getDay() === 3) {
      return '星期三'
    }
    if (d.getDay() === 4) {
      return '星期四'
    }
    if (d.getDay() === 5) {
      return '星期五'
    }
    if (d.getDay() === 6) {
      return '星期六'
    }
    if (d.getDay() === 0) {
      return '星期日'
    }
  }

  // 获取当月第一天
  static getFirstDayOfNow() {
    let date = new Date();
    date.setDate(1);
    return date;
  }
  // 获取当月最后一天
  static getLastDayOfNow() {
    let date = new Date();
    let currentMonth = date.getMonth();
    let nextMonth = ++currentMonth;
    let nextMonthFirstDay = new Date(date.getFullYear(), nextMonth, 1);
    var oneDay = 1000 * 60 * 60 * 24;
    return new Date(nextMonthFirstDay.getTime() - oneDay);
  }

  // 判断日期与今天是否为同一周
  static isSameWeek(date: string) {
    let old = new Date(date).setHours(0, 0, 0, 0);
    let now = new Date().setHours(0, 0, 0, 0);
    var oneDayTime = 1000 * 60 * 60 * 24;
    var old_count = old / oneDayTime;
    var now_other = now / oneDayTime;
    return parseInt(((old_count + 4) / 7).toString()) === parseInt(((now_other + 4) / 7).toString());
  }
}
