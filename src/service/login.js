import { GET } from '@/utils/fly'

const login = () => Promise.resolve({
  name: '333',
  userToken: '3333333333333',
})
const logout = () => GET({ url: 'api/logout' })
const getUserInfo = () => GET({ url: '/api/current/user' })


export {
  login,
  logout,
  getUserInfo,
}
