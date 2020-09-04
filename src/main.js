import Vue from 'vue'
import App from './App.vue'
import Axios from 'axios'

Vue.prototype.$axios = Axios
Axios.defaults.baseURL = '/elastic'
Axios.defaults.headers.post['Content-Type'] = 'application/json';

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
