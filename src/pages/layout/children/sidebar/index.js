import { mapState } from 'vuex'
import { filter } from 'lodash'

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
    ...mapState({
      permissionRoutes({ permissionRoutes }) {
        return filter(permissionRoutes, item => !item.hidden && item.children.length)
      },
    }),
  },
  methods: {
    getCurrentRoute() {
      const matched = this.$route.matched.filter(item => item.name) || []
      this.openNames = [matched[0] && matched[0].path]
      this.activeName = this.$route.path
    },

  },
}
