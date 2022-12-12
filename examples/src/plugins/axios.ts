import axios from 'axios'
const token =
  'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJpc3N1c2VyIiwiYXVkIjoiYXVkaWVuY2UiLCJ0ZW5hbnRfaWQiOiIwMDAwMDAiLCJyb2xlX25hbWUiOiJhZG1pbmlzdHJhdG9yIiwicG9zdF9pZCI6IjExMjM1OTg4MTc3Mzg2NzUyMDEiLCJ1c2VyX2lkIjoiMTEyMzU5ODgyMTczODY3NTIwMSIsInJvbGVfaWQiOiIxMTIzNTk4ODE2NzM4Njc1MjAxIiwidXNlcl9uYW1lIjoiYWRtaW4iLCJuaWNrX25hbWUiOiLnrqHnkIblkZgiLCJkZXRhaWwiOnsidHlwZSI6IndlYiJ9LCJ0b2tlbl90eXBlIjoiYWNjZXNzX3Rva2VuIiwiZGVwdF9pZCI6IjExMjM1OTg4MTM3Mzg2NzUyMDEiLCJhY2NvdW50IjoiYWRtaW4iLCJjbGllbnRfaWQiOiJzYWJlciIsImV4cCI6MTY3MDgxNzMyMywibmJmIjoxNjcwODEzNzIzfQ.tH0T3KIAYSSPXhMhvgoo1WYClXFWVXlu_FGUcBxfarMyxf-cJV9mYUO3MPcwKjjOu-l8SF_Gbs1kfN-v0tCUoQ'

const getToken = async () => {
  const res = await axios({
    headers: {
      Authorization: `Basic c2FiZXI6c2FiZXJfc2VjcmV0`
    },
    method: 'post',
    url: '/api/blade-auth/oauth/token?tenantId=000000&password=21232f297a57a5a743894a0e4a801fc3&username=admin&grant_type=password&scope=all&deptId=&roleId=&type=account&key=d7e87ad6-412f-462a-95a7-41da009446f0&code=undefined'
  })
  console.log('token', token)
  return token
}

// console.log('getToken()', )
getToken()

const request = axios.create()

request.interceptors.request.use(
  (config: { [propName: string]: any }) => {
    const meta = config.meta || {}
    config.headers['Authorization'] = `Basic c2FiZXI6c2FiZXJfc2VjcmV0`
    config.headers['Blade-Auth'] = 'bearer ' + token

    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

export default request
