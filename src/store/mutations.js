import { SET_ROLE, SET_PERMISSION_ROUTES } from './mutation-types'

export default {
  [SET_ROLE](state, e) {
    state.roles = e
  },
  [SET_PERMISSION_ROUTES](state, e) {
    state.permissionRoutes = e
  },
}
