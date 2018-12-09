import { mapState } from 'vuex'
import screenfull from 'screenfull'
import { cookie } from 'cookie_js'
// import { TOGGLE_SIDEBAR } from '@/store/mutation-types'
import Breadcrumb from '../bread_crumb/index.vue'


export default {
  name: 'navBar',
  components: {
    Breadcrumb,
  },
  data() {
    return {}
  },
  computed: {
    ...mapState([
      'permissionRoutes',
    ]),
  },
  methods: {
    toggleFullScreen() {
      if (!screenfull.enabled) {
        this.$Notice.info({
          desc: 'you browser can not work',
        })
        return false
      }
      screenfull.toggle()
    },
    logout() {
      cookie.set('userToken', '')
      window.location.reload()
    },
  },
}
