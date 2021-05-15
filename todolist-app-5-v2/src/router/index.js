import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/list/:id',
    name: 'list',
    component: () => import('@/views/List.vue')
  },
  {
    path: '/all-tasks/',
    name: 'all-tasks',
    component: () => import('@/views/List.vue')
  },
  {
    path: '/',
    name: 'unselect',
    component: () => import('@/views/ListNotSelected.vue')
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