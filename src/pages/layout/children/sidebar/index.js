import { mapState } from 'vuex'

export default {
  name: 'sidebar',

  data() {
    return {
      activeName: '',
      openNames: '',

    }
  },
  created() {
    this.getCurrentRoute()
  },
  computed: {
    ...mapState([
      'permissionRoutes',
    ]),
  },
  methods: {
    getCurrentRoute() {
      const matched = this.$route.matched.filter(item => item.name) || []
      this.openNames = [matched[0] && matched[0].path]
      this.activeName = this.$route.path
    },

  },
}
