// 封装cookie文件
import VueCookies from 'vue-cookies'

export function getCookie (name) {
  return VueCookies.get(name)
}

export function setCookie (name, value) {
  const seconds = 1800000
  const time = new Date()
  time.setTime(time.getTime() + seconds * 1000)
  VueCookies.set(name, value, time)
}

export function removeCookie (name) {
  return VueCookies.remove(name)
}
