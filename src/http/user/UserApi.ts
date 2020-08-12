import ApiClient from 'http/ApiClient'
import Response from 'model/common/Response'
import User from 'model/User/User'

export default class UserApi {
  /**
   * 商品详情
   *
   */
  static getUser(uuid: string = ''): Promise<Response<User[]>> {
    return ApiClient.server().get(`/user/query`, {
      params: {
        uuid: uuid
      }
    }).then((res) => {
      return res.data
    })
  }

}
