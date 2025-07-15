<template>
  <v-card class="pa-4">
    <v-form @submit.prevent="calculateWalkTime">
      <v-text-field v-model="dogName" label="Dog Name" placeholder="e.g., Princess Cynthia" />
      <v-select
        v-model="dogSize"
        label="Dog Size"
        :items="['Small', 'Medium', 'Large', 'Extra-Large']"
      />
      <v-select
        v-model="energyLevel"
        label="Energy Level"
        :items="['Low', 'Moderate', 'High']"
      />
      <v-select
        v-model="coatType"
        label="Coat Type"
        :items="['Short', 'Medium', 'Thick']"
      />
      <v-select
        v-model="gear"
        label="Gear"
        :items="['None', 'Sweater', 'Cooling Vest']"
      />
      <v-text-field v-model="location" label="Location" placeholder="e.g., Vancouver, BC" />
      <v-switch v-model="useFahrenheit" label="Show Fahrenheit" />
      <v-btn type="submit" color="primary">Calculate Walk Time</v-btn>
    </v-form>
    <v-card-text v-if="result">
      <p>
        Walk {{ dogName }} for {{ result.walkTime }} min at
        {{ displayTemperature }} {{ useFahrenheit ? '°F' : '°C' }}.
      </p>
      <p v-if="result.warning">{{ result.warning }}</p>
      <p>Disclaimer: This is a guide; monitor your dog and consult a vet.</p>
    </v-card-text>
  </v-card>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      dogName: 'Princess Cynthia',
      dogSize: 'Large',
      energyLevel: 'High',
      coatType: 'Medium',
      gear: 'None',
      location: 'Vancouver, BC',
      useFahrenheit: false,
      temperatureCelsius: null,
      result: null,
    }
  },
  computed: {
    displayTemperature() {
      return this.useFahrenheit && this.temperatureCelsius !== null
        ? (this.temperatureCelsius * 9/5 + 32).toFixed(1)
        : this.temperatureCelsius
    },
  },
  methods: {
    async calculateWalkTime() {
      try {
        const response = await axios.post('/api/calculate-walk', {
          dogSize: this.dogSize,
          energyLevel: this.energyLevel,
          gear: this.gear,
          location: this.location,
        })
        this.temperatureCelsius = response.data.temp
        this.result = {
          walkTime: response.data.walkTime,
          warning: response.data.warning,
        }
      } catch (error) {
        this.result = { walkTime: 0, warning: 'Error fetching weather data.' }
      }
    },
  },
}
</script>