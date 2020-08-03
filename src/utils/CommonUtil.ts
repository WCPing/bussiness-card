/**
 * Created by jsama on 2020/2/20.
 */

export default class CommonUtil {
    static copy(object) {
        return JSON.parse(JSON.stringify(object))
    }

    static uuid() {
        return (
            this.s4() +
            this.s4() +
            this.s4() +
            this.s4() +
            this.s4() +
            this.s4() +
            this.s4() +
            this.s4()
        )
    }

    static s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1)
    }

  // 检验手机号
  static checkMobile(mobile: string){
    return RegExp(/^1[34578]\d{9}$/).test(mobile);
  }

  // 手机号中间4位替换为***
  static replaceMobile(mobile: string) {
     return mobile.substring(0, 3) + '****' + mobile.substring(7)
  }

  // 深层取值 getIn(['province', 'city', 'district', 'name'], address)
  static getter(p, o) {
    return p.reduce(function(xs, x) {
      return (xs && xs[x]) ? xs[x] : null;
    }, o);
  }

}
