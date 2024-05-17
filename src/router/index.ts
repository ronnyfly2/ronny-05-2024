import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import DefaultLayout from '../layouts/DefaultLayout.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'init',
      component: DefaultLayout,
      children: [
        {
          path: '',
          name: 'home',
          component: HomeView
        },
      ]
    },
    {
      path: '/team',
      name: 'teamPage',
      component: DefaultLayout,
      children: [
        {
          path: '',
          name: 'PageTeam',
          component: () => import('@/views/TeamView.vue')
        },
        {
          path: ':id',
          name: 'detail',
          component: () => import('@/views/DetailView.vue')
        }
      ]
    },
  ]
})

export default router
