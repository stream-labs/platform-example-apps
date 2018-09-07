import Vue from 'vue'
import Settings from './components/Settings'

Vue.config.productionTip = false

new Vue({
  render: h => h(Settings)
}).$mount('#app')
