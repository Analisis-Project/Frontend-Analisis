import { createRouter, createWebHistory } from 'vue-router'
import Graph from '../views/Graph.vue'
import NewGraph from '../views/NewGraph.vue'
import OpenJson from '../views/OpenJson.vue'

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
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    }
  ]
})

export default router
