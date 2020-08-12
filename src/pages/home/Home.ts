import { Vue, Component } from 'vue-property-decorator'
import UserApi from 'http/user/UserApi'
import User from 'model/User/User'

@Component({
  components: { }
})
export default class Home extends Vue {
  user: User = new User()

  onShareAppMessage(res) {
    return {
      title: '很高兴认识你',
      path: '/pages/mine/Mine'
    }
  }

  onLoad() {
    this.getUser()
  }

  getUser() {
    uni.showLoading({ title: '加载中' })
    UserApi.getUser('').then((res) => {
      uni.hideLoading()
      this.user = res.data[0]
      console.log(this.user)
    }).catch(e => {
      uni.hideLoading()
    })
  }

  // 呼叫联系人
  doCallPhone() {
    uni.makePhoneCall({
      phoneNumber: this.user.phone
    });
  }

  // 保存联系人
  doSavePhone() {
    uni.addPhoneContact({
      nickName:  this.user.name,
      firstName: this.user.name,
      mobilePhoneNumber: this.user.phone,
      weChatNumber: 'wcp0923',
      success: function () {
        uni.showToast({ title: '保存成功' })
      }
    });
  }
}