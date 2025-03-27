<script setup>
import { ref, computed } from 'vue'
import FilmCard from '@/components/FilmCard.vue'

const props = defineProps({
  films: Array,
})

const recherche = ref('')

const filmsFiltre = computed(() => {
  if (!recherche.value) return props.films

  return props.films.filter((film) =>
    film.titre.toLowerCase().includes(recherche.value.toLowerCase()),
  )
})
</script>

<template>
  <div class="flex flex-col gap-8 my-12 w-full px-4">
    <div class="max-w-7xl mx-auto w-full">
      <form class="flex gap-4 w-full" @submit.prevent>
        <input
          type="search"
          v-model="recherche"
          class="bg-gray-800 text-white w-full py-3 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 placeholder-gray-400"
          placeholder="Rechercher un film..."
        />
        <button
          type="submit"
          class="bg-amber-500 hover:bg-amber-600 text-gray-900 font-bold py-3 px-6 rounded-lg transition duration-300 transform hover:scale-105 whitespace-nowrap"
        >
          Rechercher
        </button>
      </form>
    </div>

    <div class="max-w-7xl mx-auto w-full">
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-8">
        <FilmCard
          v-for="(film, index) in filmsFiltre"
          :key="index"
          :film="film"
          class="transition duration-300 hover:scale-105 hover:z-10"
        />
      </div>
    </div>
  </div>
</template>
