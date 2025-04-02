import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import FilmCard from '@/components/FilmCard.vue'
import { films } from '@/assets/arena-lapraille.js'
import { createRouter, createWebHistory } from 'vue-router'
import { createPinia, setActivePinia } from 'pinia'

// Là on crée un petit router pour le test
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/film/:titre',
      name: 'film-details',
      component: {},
    },
  ],
})

describe('FilmCard', () => {
  const film = films[0]

  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('renders the film title correctly', () => {
    const wrapper = mount(FilmCard, {
      props: { film },
      global: {
        plugins: [router],
      },
    })

    expect(wrapper.text()).toContain('Kung Fu Panda 4')
  })

  it('does not display the film description', () => {
    const wrapper = mount(FilmCard, {
      props: { film },
      global: {
        plugins: [router],
      },
    })

    const description = 'Le guerrier dragon Po affronte un nouveau type de super-vilain'
    expect(wrapper.text()).not.toContain(description)
  })

  it('displays the film genre correctly', () => {
    const wrapper = mount(FilmCard, {
      props: { film },
      global: {
        plugins: [router],
      },
    })

    film.genre.forEach((genre) => {
      expect(wrapper.text()).toContain(genre)
    })
  })

  it('displays the film duration correctly', () => {
    const wrapper = mount(FilmCard, {
      props: { film },
      global: {
        plugins: [router],
      },
    })

    expect(wrapper.text()).toContain(`${film.duree} min`)
  })
})
