<script setup>
import { useRouter } from 'vue-router'
defineProps({
  film: Object,
})

const router = useRouter()

const naviguerAuFilm = (film) => {
  router.push({
    name: 'film-details',
    params: { titre: film.titre },
    state: { film },
  })
}
</script>

<template>
  <div
    class="bg-gray-800 text-gray-100 flex flex-col place-items-center p-4 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer border border-gray-700 hover:border-amber-500 group"
    @click="naviguerAuFilm(film)"
  >
    <div class="w-full h-full max-h-96 rounded-lg overflow-hidden relative mb-4">
      <img
        :src="film.imageURL"
        class="object-cover w-full h-full transition duration-500 group-hover:scale-105"
        :alt="film.titre"
      />
      <div
        class="absolute inset-0 bg-gradient-to-t from-gray-900/70 to-transparent opacity-0 group-hover:opacity-100 transition duration-300 flex items-end p-3"
      >
        <span class="text-white font-medium">Voir les séances →</span>
      </div>
    </div>

    <h3 class="text-lg font-bold text-center text-amber-400 mb-1">{{ film.titre }}</h3>
    <p class="italic text-sm text-gray-400 mb-2" v-if="film.titreOriginal != null">
      "{{ film.titreOriginal }}"
    </p>

    <div class="flex items-center gap-2 text-sm text-gray-300 mb-3">
      <span class="flex items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-4 w-4 mr-1"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        {{ film.duree }} min
      </span>
    </div>

    <ul class="flex gap-2 flex-wrap justify-center">
      <li
        v-for="(genre, index) in film.genre"
        :key="index"
        class="bg-gray-700 text-amber-400 text-xs font-medium px-2 py-1 rounded-full border border-gray-600 group-hover:bg-amber-500 group-hover:text-gray-900 transition duration-200"
      >
        {{ genre }}
      </li>
    </ul>
  </div>
</template>
