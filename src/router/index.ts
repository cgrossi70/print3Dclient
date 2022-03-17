import Vue,{Component} from 'vue'
import VueRouter from 'vue-router'
import Dashboard from '@/views/Dashboard.vue'
import History from "@/views/History.vue"
import Console from "@/views/Console.vue"
import Hardware from "@/views/Hardware.vue"
import GCodes from "@/views/GCodes.vue"
import Settings from "@/views/Settings.vue"

Vue.use(VueRouter)

const routes: AppRoute[] = [
  {
    path: '/',
    name: 'Dashboard',
    component: Dashboard,
    icon: "mdi-home"
  },
  {
    path: '/console',
    name: 'Console',
    component: Console,
    icon: "mdi-console"
  },
  {
     path: '/gcodes',
     name: 'GCodes',
     component: GCodes,
     icon: "mdi-folder"
  },
  {
    path: '/history',
    name: 'History',
    component: History,
    icon: "mdi-clipboard-text-clock"
  },
  {
    path: '/hardware',
    name: 'Hardware',
    component: Hardware,
    icon: "mdi-laptop"

  },
  {
    path: '/settings',
    name: 'Settings',
    component: Settings,
    icon: "mdi-cog"

  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

export interface AppRoute {
  path: string,
  name: string,
  component: Component,
  icon: string
}
