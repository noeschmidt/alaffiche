import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import FilmList from '@/components/FilmList.vue'
import { films } from '@/assets/arena-lapraille.js'
import { createRouter, createWebHistory } from 'vue-router'
import { createPinia, setActivePinia } from 'pinia'

vi.mock('@/components/FilmCard.vue', () => ({
  default: {
    name: 'FilmCard',
    props: ['film'],
    template: '<div class="film-card">{{ film.titre }}</div>',
  },
}))

vi.mock('@/components/SelectedFilms.vue', () => ({
  default: {
    template: '<div class="selected-films"></div>',
  },
}))

const router = createRouter({
  history: createWebHistory(),
  routes: [],
})

describe('FilmList', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('renders all films when no search term is provided', () => {
    const wrapper = mount(FilmList, {
      props: { films },
      global: {
        plugins: [router],
      },
    })

    const filmCards = wrapper.findAll('.film-card')
    expect(filmCards.length).toBe(films.length)
  })

  it('filters films correctly based on search term', async () => {
    const wrapper = mount(FilmList, {
      props: { films },
      global: {
        plugins: [router],
      },
    })

    const searchInput = wrapper.find('input[type="search"]')
    await searchInput.setValue('Dune')

    const filmCards = wrapper.findAll('.film-card')
    expect(filmCards.length).toBe(1)
    expect(filmCards[0].text()).toContain('Dune')
  })

  it('is case insensitive when filtering films', async () => {
    const wrapper = mount(FilmList, {
      props: { films },
      global: {
        plugins: [router],
      },
    })

    const searchInput = wrapper.find('input[type="search"]')
    await searchInput.setValue('kung')

    const filmCards = wrapper.findAll('.film-card')
    expect(filmCards.length).toBe(1)
    expect(filmCards[0].text()).toContain('Kung Fu Panda 4')
  })

  it('shows no films when search term has no matches', async () => {
    const wrapper = mount(FilmList, {
      props: { films },
      global: {
        plugins: [router],
      },
    })

    const searchInput = wrapper.find('input[type="search"]')
    await searchInput.setValue('nonexistentfilm')

    const filmCards = wrapper.findAll('.film-card')
    expect(filmCards.length).toBe(0)
  })

  it('updates filtered films when search term changes', async () => {
    const wrapper = mount(FilmList, {
      props: { films },
      global: {
        plugins: [router],
      },
    })

    const searchInput = wrapper.find('input[type="search"]')
    await searchInput.setValue('Dune')

    let filmCards = wrapper.findAll('.film-card')
    expect(filmCards.length).toBe(1)

    await searchInput.setValue('Panda')

    filmCards = wrapper.findAll('.film-card')
    expect(filmCards.length).toBe(1)
    expect(filmCards[0].text()).toContain('Kung Fu Panda 4')
  })
})
