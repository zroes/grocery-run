<template>
  <h4>My Trip</h4>
</template>

<script>
import { computed, onMounted } from "vue"
import { AppState } from "../AppState.js"
import { logger } from "../utils/Logger.js"
import Pop from "../utils/Pop.js"
import { tripService } from "../services/TripService.js"
export default {
  setup() {
    // private variables and methods here
    async function getMyTripItems() {
      try {
        await tripService.getMyTripItems()
      } catch (error) {
        logger.error(error)
        Pop.error(error.message)
      }
    }

    onMounted(() => {
      getMyTripItems()
    })
    return {
      // public variables and methods here
    }
  },
}
</script>

<style></style>