import fly from 'flyio'
import { BASE_URL } from '@/config'


// 添加请求拦截器
fly.interceptors.request.use((request) => {
  // 给所有请求添加自定义header
  request.headers['X-from'] = 'kokiy'
  request.baseURL = BASE_URL
  request.withCredentials = true
  request.timeout = 90000
  return request
})

// 添加响应拦截器，响应拦截器会在then/catch处理之前执行
fly.interceptors.response.use(
  (res) => {
    if ((res.status >= 200 && res.status <= 300) || res.status === 304) {
      return res.data
    }
    throw new Error(res)
  },
  (err) => {
    const errMessage = ['网络错误', '请求超时']

    this.$Notice.error({
      // title: 'Notification title',
      desc: errMessage[err.status] || err.message,
    })
    return Promise.reject(err)
  },
)


const GET = async ({ url, param }) => {
  try {
    const response = await fly.get(url, param)
    return Promise.resolve(response)
  } catch (error) {
    throw new Error(error)
  }
}


const POST = async ({ url, param = {} }) => {
  try {
    const response = await fly.post(url, param, {})
    return Promise.resolve(response)
  } catch (error) {
    throw new Error(error)
  }
}


export {
  GET, POST,
}
