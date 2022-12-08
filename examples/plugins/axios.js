import axios from 'axios'
const token =
  'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJpc3N1c2VyIiwiYXVkIjoiYXVkaWVuY2UiLCJ0ZW5hbnRfaWQiOiIwMDAwMDAiLCJyb2xlX25hbWUiOiJhZG1pbmlzdHJhdG9yIiwicG9zdF9pZCI6IjExMjM1OTg4MTc3Mzg2NzUyMDEiLCJ1c2VyX2lkIjoiMTEyMzU5ODgyMTczODY3NTIwMSIsInJvbGVfaWQiOiIxMTIzNTk4ODE2NzM4Njc1MjAxIiwidXNlcl9uYW1lIjoiYWRtaW4iLCJuaWNrX25hbWUiOiLnrqHnkIblkZgiLCJkZXRhaWwiOnsidHlwZSI6IndlYiJ9LCJ0b2tlbl90eXBlIjoiYWNjZXNzX3Rva2VuIiwiZGVwdF9pZCI6IjExMjM1OTg4MTM3Mzg2NzUyMDEiLCJhY2NvdW50IjoiYWRtaW4iLCJjbGllbnRfaWQiOiJzYWJlciIsImV4cCI6MTY3MDQxNjg5MSwibmJmIjoxNjcwNDEzMjkxfQ.ZzJ_NM_lOZu9SIoR__5V0eGgwhYxjszo8uDKP0jwlKBSgUowAgI32tocQoYyL3C72k6vsfmx30JX3girKTHvbw'

axios.interceptors.request.use(
  (config) => {
    //开启 progress bar

    const meta = config.meta || {}
    config.headers['Authorization'] = `Basic c2FiZXI6c2FiZXJfc2VjcmV0`
    config.headers['Blade-Auth'] = 'bearer ' + token

    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

console.log('run axios')

export default axios
