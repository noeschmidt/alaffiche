<script setup>
import { films } from '@/assets/arena-lapraille.js'
import FilmList from '@/components/FilmList.vue'
</script>

<template>
  <main class="mx-auto flex flex-col m-8 max-w-xl md:max-w-5xl size-full">
    <FilmList :films="films" />
  </main>
</template>
