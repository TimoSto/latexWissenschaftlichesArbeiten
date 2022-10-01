import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import HomeView from "@/views/HomeView.vue";
import ProjectView from '@/views/ProjectView.vue';

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    component: HomeView
  },
  {
    path: '/project/*',
    component: ProjectView,
    props: true
  }
]

const router = new VueRouter({
  routes
})

export default router
