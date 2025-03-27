<script setup>
import FilmCard from '@/components/FilmCard.vue'

defineProps({
  films: Array,
})
</script>

<template>
  <div class="flex flex-col gap-4 my-12">
    <form class="flex gap-2">
      <input
        type="search"
        class="bg-indigo-100 w-full py-2 px-2"
        placeholder="Veuillez chercher un film"
      />
      <button type="submit">Rechercher</button>
    </form>
    <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
      <FilmCard v-for="(film, index) in films" :key="index" :film="film" />
    </div>
  </div>
</template>

<style scoped></style>
