<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { films } from '@/assets/arena-lapraille.js'

const route = useRoute()
const film = ref(null)

// j'ai fait pour dans un cas où le state que j'ai mis dans mon composant FilmCard
// ne passerait pas, ça permet de venir chercher dans la liste de film au cas où
onMounted(() => {
  if (route.state && route.state.film) {
    film.value = route.state.film
  } else {
    const filmTitre = route.params.titre
    film.value = films.find((f) => f.titre === filmTitre)
  }
})
</script>

<template>
  <div class="min-h-screen py-12">
    <div class="bg-amber-600 to-black py-4 mb-8 shadow-xl">
      <div class="container mx-auto px-4">
        <h1 class="text-2xl md:text-4xl font-bold text-white">Détails du Film</h1>
      </div>
    </div>

    <div class="container mx-auto px-4">
      <div
        v-if="film"
        class="bg-gray-100 rounded-xl shadow-2xl overflow-hidden border border-gray-700"
      >
        <div class="bg-amber-50 p-6 border-b border-amber-500">
          <h1 class="text-3xl md:text-4xl font-bold text-amber-500 mb-1">{{ film.titre }}</h1>
          <p class="italic text-xl text-amber-600" v-if="film.titreOriginal">
            Titre original: "{{ film.titreOriginal }}"
          </p>
        </div>

        <div class="flex flex-col md:flex-row gap-8 p-6">
          <div class="md:w-1/3 lg:w-1/4">
            <div class="relative group">
              <img
                :src="film.imageURL"
                class="w-full h-auto rounded-lg shadow-xl transform transition duration-500 group-hover:scale-102 border-4 border-gray-700"
                alt="Affiche du film"
              />
              <div
                class="absolute inset-0 bg-amber-500/10 rounded-lg opacity-0 group-hover:opacity-100 transition duration-300"
              ></div>
            </div>
          </div>

          <div class="md:w-2/3 lg:w-3/4 space-y-6">
            <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div class="bg-gray-50 p-3 rounded-lg border border-gray-600">
                <p class="text-amber-400 font-semibold flex items-center gap-2">Durée</p>
                <p class="text-gray-800">{{ film.duree }} minutes</p>
              </div>

              <div class="bg-gray-50 p-3 rounded-lg border border-gray-600">
                <p class="text-amber-400 font-semibold flex items-center gap-2">Âge légal</p>
                <p class="text-gray-800">{{ film.ageLegal }}+</p>
              </div>

              <div class="bg-gray-50 p-3 rounded-lg border border-gray-600">
                <p class="text-amber-400 font-semibold flex items-center gap-2">Langue</p>
                <p class="text-gray-800">{{ film.langue }}</p>
              </div>
            </div>

            <div>
              <h2 class="text-xl font-bold text-amber-400 mb-3 flex items-center gap-2">Genres</h2>
              <ul class="flex gap-2 flex-wrap">
                <li
                  v-for="(genre, index) in film.genre"
                  :key="index"
                  class="bg-amber-500/10 text-amber-400 border border-amber-500/30 px-3 py-1 rounded-full text-sm font-medium hover:bg-amber-500 hover:text-gray-900 transition duration-200"
                >
                  {{ genre }}
                </li>
              </ul>
            </div>

            <div>
              <h2 class="text-xl font-bold text-amber-400 mb-3 flex items-center gap-2">
                Synopsis
              </h2>
              <p class="text-gray-600 leading-relaxed">{{ film.description }}</p>
            </div>

            <div>
              <h2 class="text-xl font-bold text-amber-400 mb-3 flex items-center gap-2">Séances</h2>
              <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                <div
                  v-for="(seance, index) in film.seances"
                  :key="index"
                  class="bg-gray-200 hover:bg-amber-500 hover:text-gray-900 p-3 rounded-lg text-center transition duration-300 cursor-pointer border border-gray-600 group"
                >
                  <p class="font-bold text-lg group-hover:text-gray-900">{{ seance.heure }}</p>
                  <p class="text-sm text-gray-400 group-hover:text-gray-700">
                    Salle {{ seance.salle }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- En local, il y apas de chargement normalement mais si c'était un site en prod
       on mettrait quelque chose comme ça pour montrer que ça charge le film
       Même mieux on pourrait mettre un squellete mais j'ai pas le temps de faire ça ce matin -->
      <div v-else class="text-center py-20">
        <div class="inline-flex flex-col items-center">
          <div
            class="w-16 h-16 border-4 border-amber-500 border-t-transparent rounded-full animate-spin"
          ></div>
          <p class="mt-4 text-xl text-amber-400 animate-pulse">Chargement du film...</p>
        </div>
      </div>
    </div>
  </div>
</template>
