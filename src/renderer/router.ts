import { createRouter, createWebHashHistory } from 'vue-router'

import StopWatch from './pages/Timer.vue'
import Configuration from './pages/Configuration.vue';

const routes = [
  { path: '/', component: StopWatch },
  { path: '/timer', component: StopWatch },
  { path: '/settings', component: Configuration },
]

export default createRouter({
  history: createWebHashHistory(),
  routes,
})