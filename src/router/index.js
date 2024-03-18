import { createRouter, createWebHistory } from 'vue-router'
import Graph from '../views/Graph.vue'
import NewGraph from '../views/NewGraph.vue'
import OpenJson from '../views/OpenJson.vue'
import OpenTXT from '@/views/OpenTXT.vue'
import TableView from '@/views/TableView.vue'
import ManualView from '@/views/ManualView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'graph',
      component: Graph
    },
    {
      path: '/new',
      name: 'new',
      component: NewGraph
    },
    {
      path: '/openjson',
      name: 'openjson',
      component: OpenJson
    },
    {
      path: '/opentxt',
      name: 'opentxt',
      component: OpenTXT
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/table',
      name: 'table',
      component: TableView
    },
    {
      path: '/manual',
      name: 'manual',
      component: ManualView
    }
    
  ]
})

export default router
