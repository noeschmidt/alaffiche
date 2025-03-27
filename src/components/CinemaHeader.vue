<script setup>
import { ref } from 'vue'

const nomSalle = ref('Salle 2')
const prenom = ref('Noé')
</script>

<template>
  <p>{{ nomSalle }} - {{ prenom }}</p>
</template>

<style scoped></style>
