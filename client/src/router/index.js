import Vue from 'vue'
import Router from 'vue-router'

import Users from '@/pages/Users'
import NewUser from '@/pages/NewUser'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/users',
      component: Users
    },
    {
      path: '/users/new',
      component: NewUser
    },
    {
      path: '*',
      redirect: '/users'
    }
  ]
})
