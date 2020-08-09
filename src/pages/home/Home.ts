import { Vue, Component } from 'vue-property-decorator'

@Component({
  components: { }
})
export default class Home extends Vue {
  userName: string = '吴彦祖'
  phoneNum: string = '18852951656'

  // 呼叫联系人
  doCallPhone() {
    uni.makePhoneCall({
      phoneNumber: this.phoneNum
    });
  }

  // 保存联系人
  doSavePhone() {
    uni.addPhoneContact({
      nickName: this.userName,
      firstName: this.userName,
      mobilePhoneNumber: this.phoneNum,
      weChatNumber: 'wcp0923',
      success: function () {
        uni.showToast({ title: '保存成功' })
      }
    });
  }
}