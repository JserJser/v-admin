import initialAuth from '@/auth'

export default {
  data() {
    return {
      initialAuth,
    }
  },
  methods: {
    getAuth() {
      console.log(this.$refs.authTree.getCheckedAndIndeterminateNodes())
    },
  },
}
