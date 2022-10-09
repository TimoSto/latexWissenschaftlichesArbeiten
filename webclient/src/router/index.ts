import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import HomeView from "@/views/HomeView.vue";
import ProjectView from '@/views/ProjectView.vue';
import CVView from '@/views/CVView.vue';
import ChangelogView from '@/views/ChangelogView.vue';

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
  },
  {
    path: '/cv',
    component: CVView
  },
  {
    path: '/changelog',
    component: ChangelogView
  }
]

const router = new VueRouter({
  routes
})

export default router
