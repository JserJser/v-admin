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
    return {
      selectedLang: 'zh',
      langList: [
        { value: 'zh', label: '中文' },
        { value: 'en', label: '英语' },
        { value: 'ja', label: '日语' },
      ],
    }
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
    onLangSelectChange(val) {
      this.selectedLang = val
      this.$i18n.locale = val
    },
    backToIndex() {
      this.$router.push({ path: '/' })
    },
    logout() {
      cookie.set('userToken', '')
      window.location.reload()
    },
  },
}
