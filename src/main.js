import Vue from 'vue'
import moment from 'vue-moment'
import App from './App'
import router from './router'
import store from './store'
import AxiosPlugin from './AxiosPlugin'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import iView from 'iview'
import 'iview/dist/styles/iview.css'

//Vue.prototype.$http = axios
Vue.prototype.$token=function(param) { return store.state.apiPath + param + "?" }
Vue.prototype.$tokenadmin=function(param) { return store.state.adminUrl + param + "?" }
Vue.prototype.$tokenes=function(param) { return store.state.esPath + param + "?" }
Vue.prototype.$tokenup=function() { return store.state.uploadUrl + "?" }
Vue.use(AxiosPlugin)
Vue.use(ElementUI)
Vue.use(iView)
Vue.use(moment)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
