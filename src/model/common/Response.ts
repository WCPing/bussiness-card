export default class Response<T> {
  // 响应码
  code: number = 0
  // 结果信息
  msg: string = ''
  // 响应数据
  data: T
  // 总数
  total: number = 0
  // 
  more: any = null
  // 
  success: any = null
  // 提示信息
  fields: any
}