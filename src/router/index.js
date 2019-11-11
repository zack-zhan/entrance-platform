// 路由文件
import Vue from 'vue'
import Router from 'vue-router'
import { getCookie } from '@/utils/cookies'

import Login from '@/views/login/index' // 登录
import Verify from '@/views/login/verify' // 登录-验证手机号码

import Enroll from '@/views/enroll/index' // 确认录取
import Abandon from '@/views/enroll/abandon' // 确认录取-放弃入学

import ReplenishOne from '@/views/replenish/replenishOne' // 补充资料-1
import ReplenishTwo from '@/views/replenish/replenishTwo' // 补充资料-2
import ReplenishThree from '@/views/replenish/replenishThree' // 补充资料-2

import Affirm from '@/views/affirm/index' // 确认信息
import Accomplish from '@/views/affirm/accomplish' // 确认信息-完成信息录入

Vue.use(Router)

const router = new Router({
  routes: [
    { path: '/', name: 'Login', component: Login, meta: { allowBack: true, title: '入学平台登录' } },
    { path: '/verify', name: 'Verify', component: Verify, meta: { allowBack: true, title: '验证手机号码' } },

    { path: '/enroll', name: 'Enroll', component: Enroll, meta: { allowBack: false, title: '确认录取' } },
    { path: '/abandon', name: 'Abandon', component: Abandon, meta: { allowBack: false, title: '完成资料录入' } },

    { path: '/replenishOne', name: 'ReplenishOne', component: ReplenishOne, meta: { allowBack: false, title: '补充资料' } },
    { path: '/replenishTwo', name: 'ReplenishTwo', component: ReplenishTwo, meta: { allowBack: true, title: '补充资料' } },
    { path: '/replenishThree', name: 'ReplenishThree', component: ReplenishThree, meta: { allowBack: true, title: '补充资料' } },

    { path: '/affirm', name: 'Affirm', component: Affirm, meta: { allowBack: true, title: '确认信息' } },
    { path: '/accomplish', name: 'Accomplish', component: Accomplish, meta: { allowBack: false, title: '完成资料录入' } }
  ]
})

router.beforeEach((to, from, next) => {
  const token = getCookie('token')
  if (!token && to.name !== 'Login' && to.name !== 'Verify') {
    next({
      path: '/'
    })
  } else {
    next()
  }
})

export default router
