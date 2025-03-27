<script setup>
defineProps({
  film: Object,
})
</script>

<template>
  <div class="bg-neutral-100 flex flex-col place-items-center p-4 rounded-lg">
    <div class="w-48 h-full rounded-lg overflow-hidden">
      <img :src="film.imageURL" class="object-cover size-full" />
    </div>
    <p class="">{{ film.titre }}</p>
    <p class="italic text-sm" v-if="film.titreOriginal != null">"{{ film.titreOriginal }}"</p>
    <p>{{ film.duree }} minutes</p>
    <ul class="flex gap-1 flex-wrap">
      <li
        v-for="(genre, index) in film.genre"
        :key="index"
        class="bg-indigo-200 border border-indigo-600 px-2 rounded-lg text-center text-indigo-600"
      >
        {{ genre }}
      </li>
    </ul>
  </div>
</template>

<style scoped></style>
