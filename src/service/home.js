import { GET } from '@/utils/fly'


const logout3 = () => GET({ url: 'api/logout' })


export {
  logout3,
}
