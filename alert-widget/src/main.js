import Vue from 'vue'
import Widget from './components/Widget'

Vue.config.productionTip = false

new Vue({
  render: h => h(Widget)
}).$mount('#app')
