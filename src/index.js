// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import _ from 'lodash'
import VueI18n from 'vue-i18n'

import iView from 'iview'
import 'iview/dist/styles/iview.css'

require('normalize.css')
require('./assets/css/reset.less')
require('./assets/css/lib.less')

import directive from './utils/directive'

import App from './app'
import router from './router'
import store from './store'

directive(Vue)

// add lodash 插件
Object.defineProperty(Vue.prototype, '_', { value: _, enumerable: false })

Vue.use(iView)
Vue.use(VueI18n)
Vue.config.productionTip = false

const i18n = new VueI18n({
  locale: 'en', // set locale
})

/* eslint-disable no-new */

new Vue({
  el: '#app',
  i18n,
  router,
  store,
  template: '<App/>',
  components: {
    App,
  },
})
