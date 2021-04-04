import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/create',
    name: 'create',
    component: () => import('@/views/CreateTask.vue')
  },
  {
    path: '/',
    name: 'list',
    component: () => import('@/views/List.vue')
  },
  {
    path: '/task/:id',
    name: 'task',
    component: () => import('@/views/EditTask.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes
})

export default router