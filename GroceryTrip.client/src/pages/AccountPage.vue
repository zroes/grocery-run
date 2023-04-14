<template>
  <div class="about text-center text-light">
    <h1>Welcome {{ account.name }}</h1>
    <img class="rounded" :src="account.picture" alt="" />
    <p>{{ account.email }}</p>
    <button @click="promptLocation" class="btn btn-primary">Get my Location</button>
  </div>
</template>

<script>
import { computed } from 'vue'
import { AppState } from '../AppState'
import { logger } from "../utils/Logger.js"
import Pop from "../utils/Pop.js"
import { locationsService } from "../services/LocationsService.js"

export default {
  setup() {
    return {
      account: computed(() => AppState.account),
      async promptLocation() {
        try {
          async function success(pos) {
            const crd = pos.coords
            logger.log(crd.latitude, crd.longitude)
            const coords = {
              lat: crd.latitude,
              long: crd.longitude
            }
            await locationsService.sendLatLong(coords)
          }
          navigator.geolocation.getCurrentPosition(success)
        } catch (error) {
          logger.error(error)
          Pop.error(error.message)
        }
      }
    }
  }
}
</script>

<style scoped>
img {
  max-width: 100px;
}
</style>
