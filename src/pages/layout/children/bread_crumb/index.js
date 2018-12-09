export default {
  created() {
    this.getBreadcrumb()
  },
  data() {
    return {
      levelList: null,
    }
  },
  methods: {
    getBreadcrumb() {
      const matched = this.$route.matched.filter(item => item.name)
      this.levelList = matched
    },
  },
  watch: {
    $route() {
      this.getBreadcrumb()
    },
  },
}
