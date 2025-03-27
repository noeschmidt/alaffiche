<script setup>
import CinemaHeader from '@/components/CinemaHeader.vue'
import { films } from '@/assets/arena-lapraille.js'
import FilmList from '@/components/FilmList.vue'
</script>

<template>
  <main class="mx-auto flex flex-col m-8 max-w-xl md:max-w-2xl size-full">
    <CinemaHeader />
    <FilmList :films="films" />
  </main>
</template>
