import Entity from 'model/common/Entity'

export default class User extends Entity {
  // 姓名
  name: string = ''
  // 职位
  position: string = ''
  // 电话
  phone: string = ''
  // 邮箱
  email: string = ''
  // 微信号
  weiXin: string = ''
  // 住址
  address: string = ''
}