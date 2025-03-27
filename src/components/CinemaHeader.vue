<script setup>
import { ref } from 'vue'

const nomSalle = ref('La Praille')
const prenom = ref('Noé')
</script>

<template>
  <p>{{ nomSalle }} - {{ prenom }}</p>
</template>

<style scoped></style>
