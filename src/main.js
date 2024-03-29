// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import _ from 'lodash'
import VueI18n from 'vue-i18n'

import iView from 'iview'
import 'iview/dist/styles/iview.css'


import directive from './utils/directive'
import './registerServiceWorker'

import App from './app'
import router from './router'
import store from './store'
import i18nMessages from './locales'

Vue.config.productionTip = false

directive(Vue)

// add lodash 插件
Object.defineProperty(Vue.prototype, '_', { value: _, enumerable: false })
Vue.use(VueI18n)
Vue.use(iView)
Vue.locale = () => { }

const i18n = new VueI18n({
  locale: 'zh', // set locale
  messages: i18nMessages,
})

iView.i18n((key, value) => i18n.t(key, value))

/* eslint-disable no-new */
new Vue({
  i18n,
  router,
  store,
  render: h => h(App),
}).$mount('#app')
