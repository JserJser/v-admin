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
  watch: {
    $route() {
      this.getCurrentRoute()
    },
    openNames(newName, oldName) {
      if (!_.isEqual(newName, oldName)) {
        this.$nextTick(() => this.$refs.menus.updateOpened())
      }
    },
  },
  methods: {
    getCurrentRoute() {
      const { matched, path } = this.$route
      const matchedNames = matched.filter(item => item.name) || []
      this.openNames = [matchedNames[0] && matchedNames[0].path]
      this.activeName = path
    },

  },
}
