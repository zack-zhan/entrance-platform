// api接口文件
import axios from 'axios'
import qs from 'qs'
import { getCookie } from '@/utils/cookies'

// 通过axios.defaults.baseURL设置全局的基准路径
// axios.defaults.baseURL = '//localhost:8000'
axios.defaults.baseURL = '//sc.zhiytech.com:8000'

// 设置请求拦截
axios.interceptors.request.use(function (config) {
  // 拦截到请求后，首先判断是否有token，如果有的话，就将它取出来，放进config.headers里面
  const token = getCookie('token')
  if (token) {
    config.headers['Authorization'] = token
  } else {
    return config
  }
  return config
}, function (error) {
  return Promise.reject(error)
})
export const getcaptcha = () => axios.get('/auth/oauth/getcaptcha').then(res => res.data)
// 登录
export const verifycode = (obj) => axios.get(`/auth/oauth/verifycode?${qs.stringify(obj)}`).then(res => res.data)

export const token = (obj) => axios.get(`/auth/oauth/token?client_id=b15b3d3d-876d-11e9-920c-00163e0a0a3d&client_secret=SDFSDF21635&granted_type=verifycode&verify_code_id=${obj.codeId}&verify_code=${obj.code}`).then(res => res.data)

// 获取学生信息
export const getStudentByExamineeCode = (param) => axios.get(`/school/student/getStudentByExamineeCode?examineeCode=${param.examineeCode}&corpId=${param.corpId}`).then(res => res.data)

export const getOriginStudentById = (id) => axios.get(`/school/originstudent/one?originstudentid=${id}`).then(res => res.data)

// 录入学生信息
export const updateStudentByEntrance = (obj) => axios.post('/school/student/updateStudentByEntrance', obj).then(res => res.data)

export const getProcess = (corpId) => axios.get('/school/process/list?corpId=' + corpId).then(res => res.data)

export const getCorporation = (id) => axios.get('/school/corporation/one?corpid=' + id).then(res => res.data)

export const refuseentry = (param) => axios.get(`/school/student/refusalEnroll?examineeCode=${param.examineeCode}&corpId=${param.corpId}`).then(res => res.data)
