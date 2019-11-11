// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'

// 引入全局样式
import '@/styles/index.scss'

// 引入mint-ui
import Mint from 'mint-ui'
import 'mint-ui/lib/style.css'

Vue.use(Mint)

router.beforeEach((to, from, next) => {
  /* 路由发生变化修改页面title */
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})

Vue.config.productionTip = false

Vue.directive('focus', {
  inserted (el, binding) {
    if (binding.value) {
      el.focus()
    }
  },
  update (el, binding) {
    if (binding.value) {
      // console.log(binding)
      el.focus()
    }
  }
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
