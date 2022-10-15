import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import HomeView from "@/views/HomeView.vue";
import ProjectsView from "@/views/ProjectsView.vue";
import ConfigView from "@/views/ConfigView.vue";

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/projects*',
    name: 'projects',
    component: ProjectsView
  },
  {
    path: '/config',
    name: 'config',
    component: ConfigView
  },
]

const router = new VueRouter({
  routes
})

export default router
