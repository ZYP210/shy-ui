import axios from 'axios';

axios.interceptors.request.use((config) => {
  // config.headers['Content-type'] = 'application/json;charset=UTF-8';
  config.headers['Blade-Auth'] =
    'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJpc3N1c2VyIiwiYXVkIjoiYXVkaWVuY2UiLCJ0ZW5hbnRfaWQiOiIwMDAwMDAiLCJyb2xlX25hbWUiOiJhZG1pbmlzdHJhdG9yIiwicG9zdF9pZCI6IjExMjM1OTg4MTc3Mzg2NzUyMDEiLCJ1c2VyX2lkIjoiMTEyMzU5ODgyMTczODY3NTIwMSIsInJvbGVfaWQiOiIxMTIzNTk4ODE2NzM4Njc1MjAxIiwidXNlcl9uYW1lIjoiYWRtaW4iLCJuaWNrX25hbWUiOiLlubPlj7DnrqHnkIblkZgxMjMiLCJkZXRhaWwiOnsiY29va2llX3VzZXJfdGlja2V0IjoiNWE2NWNkMmYtMjBhYS00NjhkLTgzYTAtNzg2Mjc2YmM4ODViIiwidHlwZSI6IndlYiJ9LCJ0b2tlbl90eXBlIjoiYWNjZXNzX3Rva2VuIiwiZGVwdF9pZCI6IjExMjM1OTg4MTM3Mzg2NzUyMDEsMTY2MzQ1MDA1NzA4MzQyODg2NiIsImFjY291bnQiOiJhZG1pbiIsImNsaWVudF9pZCI6InNhYmVyIiwiZXhwIjoxNzAzNzI3NDI3LCJuYmYiOjE3MDM0NjgyMjd9.lkql-H9M8ByGHqa4e0pt_47Q5vdC9zAmrCkkGdyq4qoPkLzcd9xI9lgQGYXRS4jtvR6o_-BRk-FmAXi7uQ7New';
  config.headers['app-id'] = '200376';
  return config;
});

axios.interceptors.response.use((res) => {
  if (res.data.code !== 200) {
    return Promise.reject(res.data.data);
  }
  return res.data.data;
});

export default axios;
