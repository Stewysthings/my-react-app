<template>
  <v-app>
    <v-container>
      <h1>Dog Walking Calculator</h1>
      <DogWalkForm />
    </v-container>
  </v-app>
</template>

<script>
import DogWalkForm from './components/DogWalkForm.vue'

export default {
  components: { DogWalkForm }
}
</script>