import { createRouter, createWebHistory } from 'vue-router'
import AccueilView from '../views/AccueilView.vue'
import CinemaInfoView from '@/views/CinemaInfoView.vue'
import FilmDetails from '@/views/FilmDetails.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'accueil',
      component: AccueilView,
    },
    {
      path: '/cinema-info',
      name: 'cinema-info',
      component: CinemaInfoView,
    },
    {
      path: '/film-details/:titre',
      name: 'film-details',
      component: FilmDetails,
      props: true,
    },
  ],
})

export default router
