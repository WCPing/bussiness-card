import Vue from 'vue'
import App from './App.vue'
import store from './store'
import Filter from './common/Filter'
import Prototype from './common/Prototype'

Vue.config.productionTip = false
Filter.init()
Prototype.init()

uni.onNetworkStatusChange(res => {
  if(!res.isConnected){
    // 跳转无网络页面
    uni.navigateTo({ url: '/subPagesB/noNetWork/index' })
  }
})

new App({ store }).$mount()
