<script setup>
import { RouterLink } from 'vue-router'
import CinemaHeader from './CinemaHeader.vue'
</script>

<template>
  <header class="sticky top-0 z-50 shadow-xl">
    <!-- Navigation principale -->
    <div class="bg-neutral-100 border-b border-amber-500/30">
      <div class="container mx-auto px-4 flex items-center justify-between">
        <!-- Logo ou titre -->
        <RouterLink
          to="/"
          class="text-2xl font-bold text-amber-400 py-4 hover:text-amber-300 transition duration-300 flex items-center"
        >
          Cinema
        </RouterLink>

        <!-- Liens de navigation -->
        <nav class="hidden md:flex items-center space-x-8">
          <RouterLink
            to="/"
            class="relative py-4 px-2 text-gray-800 hover:text-amber-400 transition duration-300 group"
            active-class="text-amber-400 font-medium"
          >
            Accueil
          </RouterLink>

          <RouterLink
            to="/cinema-info"
            class="relative py-4 px-2 text-gray-800 hover:text-amber-400 transition duration-300 group"
            active-class="text-amber-400 font-medium"
          >
            Infos Cinéma
          </RouterLink>
        </nav>

        <div class="flex items-center">
          <CinemaHeader />
        </div>
      </div>
    </div>
  </header>
</template>
