// import { getUserInfo } from '@/service/login'
import { SET_ROLE } from './mutation-types'

export default {
  GetUserInfo({ commit }) {
    return new Promise((resolve) => {
      commit(SET_ROLE, ['admin'])
      resolve()
      // getUserInfo().then(e => {
      //   commit(SET_ROLE, e.data.role)
      //   resolve(e)
      // })
    })
  },
}
