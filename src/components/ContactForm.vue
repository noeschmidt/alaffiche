<script setup>
import { reactive, ref } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { required, email, minLength, maxLength } from '@vuelidate/validators'

const state = reactive({
  nom: '',
  email: '',
  message: '',
})

// Les règles
const rules = {
  nom: { required, minLength: minLength(2), maxLength: maxLength(150) },
  email: { required, email },
  message: {
    required,
    minLength: minLength(10),
    maxLength: maxLength(100000),
  },
}

// Messages d'erreur custom
const messages = {
  nom: {
    required: 'Le nom est requis',
  },
  email: {
    required: "L'email est requis",
    email: 'Veuillez entrer un email valide',
  },
  message: {
    required: 'Le message est requis',
    minLength: "Le message doit contenir au moins 10 caractères et max 100'000 caractères!",
  },
}

const v$ = useVuelidate(rules, state)
const formSubmitted = ref(false)

// En gros cette fonction me permet de récup. le message d'erreur en fonction de l'erreur qu'on va avoir
const getErrorMessage = (field) => {
  if (!v$.value[field].$errors.length) return ''

  const error = v$.value[field].$errors[0].$validator
  return messages[field][error] || 'Champ invalide'
}

const submitForm = async () => {
  const isFormValid = await v$.value.$validate()

  if (isFormValid) {
    // Dans un cas réel, on aurait un système qui pourrait nous notifier par mail + un enregistrement dans une DB. Mais dans notre cas on peut simplement le log dans la console
    console.log('Formulaire soumis:', { ...state })

    state.nom = ''
    state.email = ''
    state.message = ''

    formSubmitted.value = true

    v$.value.$reset()

    setTimeout(() => {
      formSubmitted.value = false
    }, 3000)
  }
}
</script>

<template>
  <div class="max-w-lg mx-auto bg-white p-8 rounded-lg shadow-md">
    <h2 class="text-2xl font-bold mb-6 text-gray-800 border-b pb-3">Contactez-nous</h2>

    <form @submit.prevent="submitForm" class="space-y-5">
      <div>
        <label for="nom" class="block text-sm font-medium text-gray-700 mb-1">Nom Entier*</label>
        <input
          id="nom"
          v-model="state.nom"
          placeholder="Entrer votre nom en entier"
          class="w-full px-4 py-2 bg-gray-50 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
          :class="{
            'border-red-500 bg-red-50': v$.nom.$dirty && v$.nom.$invalid,
            'border-gray-300': !(v$.nom.$dirty && v$.nom.$invalid),
          }"
          @blur="v$.nom.$touch()"
          @input="v$.nom.$touch()"
        />
        <div v-if="v$.nom.$dirty && v$.nom.$invalid" class="text-red-500 text-xs mt-1">
          {{ getErrorMessage('nom') }}
        </div>
      </div>

      <div>
        <label for="email" class="block text-sm font-medium text-gray-700 mb-1">Email*</label>
        <input
          id="email"
          v-model="state.email"
          placeholder="Entrer votre email"
          class="w-full px-4 py-2 bg-gray-50 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
          :class="{
            'border-red-500 bg-red-50': v$.email.$dirty && v$.email.$invalid,
            'border-gray-300': !(v$.email.$dirty && v$.email.$invalid),
          }"
          @blur="v$.email.$touch()"
          @input="v$.email.$touch()"
        />
        <div v-if="v$.email.$dirty && v$.email.$invalid" class="text-red-500 text-xs mt-1">
          {{ getErrorMessage('email') }}
        </div>
      </div>

      <div>
        <label for="message" class="block text-sm font-medium text-gray-700 mb-1">Message*</label>
        <textarea
          id="message"
          placeholder="Entrer un message avec au moins 10 caractères"
          v-model="state.message"
          class="w-full px-4 py-2 bg-gray-50 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
          :class="{
            'border-red-500 bg-red-50': v$.message.$dirty && v$.message.$invalid,
            'border-gray-300': !(v$.message.$dirty && v$.message.$invalid),
          }"
          rows="5"
          @blur="v$.message.$touch()"
          @input="v$.message.$touch()"
        ></textarea>
        <div v-if="v$.message.$dirty && v$.message.$invalid" class="text-red-500 text-xs mt-1">
          {{ getErrorMessage('message') }}
        </div>
      </div>

      <button
        type="submit"
        class="w-full bg-blue-600 text-white font-medium py-2.5 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        :disabled="v$.$invalid"
      >
        Envoyer
      </button>
    </form>

    <div
      v-if="formSubmitted"
      class="mt-6 p-4 bg-green-50 border border-green-200 text-green-700 rounded-md flex items-center space-x-2"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-5 w-5 text-green-500"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fill-rule="evenodd"
          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
          clip-rule="evenodd"
        />
      </svg>
      <span>Votre message a été envoyé avec succès !</span>
    </div>
  </div>
</template>
