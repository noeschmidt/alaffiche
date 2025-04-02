import { defineStore } from 'pinia'

export const useSelectedFilmsStore = defineStore('selectedFilms', {
  state: () => ({
    films: [],
  }),
  getters: {
    selectedFilms: (state) => state.films,
    isFilmSelected: (state) => (film) => {
      return state.films.some((f) => f.titre === film.titre)
    },
    selectedCount: (state) => state.films.length,
  },
  actions: {
    addFilm(film) {
      if (!this.films.some((f) => f.titre === film.titre)) {
        this.films.push(film)
      }
    },
    removeFilm(titre) {
      this.films = this.films.filter((film) => film.titre !== titre)
    },
    clearSelection() {
      this.films = []
    },
  },
})
