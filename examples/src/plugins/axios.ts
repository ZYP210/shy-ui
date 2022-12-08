import axios from 'axios'
const token =
  'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJpc3N1c2VyIiwiYXVkIjoiYXVkaWVuY2UiLCJ0ZW5hbnRfaWQiOiIwMDAwMDAiLCJyb2xlX25hbWUiOiJhZG1pbmlzdHJhdG9yIiwicG9zdF9pZCI6IjExMjM1OTg4MTc3Mzg2NzUyMDEiLCJ1c2VyX2lkIjoiMTEyMzU5ODgyMTczODY3NTIwMSIsInJvbGVfaWQiOiIxMTIzNTk4ODE2NzM4Njc1MjAxIiwidXNlcl9uYW1lIjoiYWRtaW4iLCJuaWNrX25hbWUiOiLnrqHnkIblkZgiLCJkZXRhaWwiOnsidHlwZSI6IndlYiJ9LCJ0b2tlbl90eXBlIjoiYWNjZXNzX3Rva2VuIiwiZGVwdF9pZCI6IjExMjM1OTg4MTM3Mzg2NzUyMDEiLCJhY2NvdW50IjoiYWRtaW4iLCJjbGllbnRfaWQiOiJzYWJlciIsImV4cCI6MTY3MDQ5NDU2MCwibmJmIjoxNjcwNDkwOTYwfQ.PGlgxJl_OVMap8h8N46vpsrgoMKIsH5YP6Ro5L1vLPe376LVkhX85HBogditoBwChdMdDQpIKvqOvBGTvk2lkQ'
axios.interceptors.request.use(
  (config: { [propName: string]: any }) => {
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

export default axios
