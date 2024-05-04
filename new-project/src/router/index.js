import { createRouter, createWebHistory } from 'vue-router'
import StartView from '../views/StartView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'start',
      component: StartView
    },
    {
      path: '/choice',
      name: 'choice',
      component: () => import('../views/ChoiceView.vue')
    },
    {
      path: '/card',
      name: 'card',
      component: () => import('../views/CardView.vue')
    },
    {
      path: '/quote',
      name: 'quote',
      component: () => import('../views/QuoteView.vue')
    },
    {
      path: '/result',
      name: 'result',
      component: () => import('../views/ResultView.vue')
    },
    {
      path: '/pick_minister',
      name: 'pick_minister',
      component: () => import('../views/PickMinisterView.vue')
    },
    {
      path: '/government',
      name: 'government',
      component: () => import('../views/GovernmentView.vue')
    }
  ]
})

export default router
