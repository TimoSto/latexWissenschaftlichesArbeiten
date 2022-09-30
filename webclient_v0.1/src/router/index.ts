import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import WelcomeView from '../views/WelcomeView.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'welcome',
    component: WelcomeView
  },
  {
    path: '/pdf/*',
    name: 'pdf',
    component: () => import(/* webpackChunkName: "about" */ '../views/PDFView.vue')
  },
  {
    path: '/project/*',
    name: 'project',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/ProjectView.vue')
  },
  {
    path: '/new',
    name: 'new',
    component: () => import(/* webpackChunkName: "about" */ '../views/NewView.vue')
  },
  {
    path: '/changelog',
    name: 'changelog',
    component: () => import(/* webpackChunkName: "about" */ '../views/ChangelogView.vue')
  },
  {
    path: '/config',
    name: 'config',
    component: () => import(/* webpackChunkName: "about" */ '../views/ConfigView.vue')
  }
]

const router = new VueRouter({
  mode: 'hash',
  routes
})

export default router