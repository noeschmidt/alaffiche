<script setup>
import { useSelectedFilmsStore } from '@/stores/selectedFilms'
import { storeToRefs } from 'pinia'

const selectedFilmsStore = useSelectedFilmsStore()
const { selectedFilms, selectedCount } = storeToRefs(selectedFilmsStore)
const { removeFilm, clearSelection } = selectedFilmsStore
</script>

<template>
  <div class="bg-gray-800 p-4 rounded-lg border border-gray-700 mb-8">
    <div class="flex justify-between items-center mb-4">
      <h2 class="text-lg font-bold text-amber-400">Films sélectionnés ({{ selectedCount }})</h2>
      <button
        v-if="selectedCount > 0"
        @click="clearSelection"
        class="text-sm text-gray-400 hover:text-amber-500"
      >
        Tout effacer
      </button>
    </div>

    <div v-if="selectedCount === 0" class="text-gray-400 text-center py-4">
      Aucun film sélectionné
    </div>

    <ul v-else class="space-y-2">
      <li
        v-for="film in selectedFilms"
        :key="film.titre"
        class="flex justify-between items-center bg-gray-700 p-3 rounded-lg"
      >
        <div class="flex items-center space-x-3">
          <img :src="film.imageURL" :alt="film.titre" class="w-10 h-10 object-cover rounded" />
          <span class="text-white">{{ film.titre }}</span>
        </div>
        <button @click="removeFilm(film.titre)" class="text-gray-400 hover:text-amber-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clip-rule="evenodd"
            />
          </svg>
        </button>
      </li>
    </ul>
  </div>
</template>
