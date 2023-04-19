<template>
  <h4>My Trip</h4>
  <div v-for="location in locations">
    <Location :location="location" />
  </div>
  <button v-if="tripItems.length != 0" @click="clearTrip()" class="btn btn-danger col-5 py-2">Clear Trip</button>
  <p v-else class="text-light fw-bold opacity-50">You have nothing added to your trip.<br>
    Get started by searching for an item and adding it!</p>
</template>

<script>
import { computed, onMounted } from "vue"
import { AppState } from "../AppState.js"
import { logger } from "../utils/Logger.js"
import Pop from "../utils/Pop.js"
import { tripService } from "../services/TripService.js"
import Location from "../components/Location.vue"

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
      locations: computed(() => AppState.account.krogerLocations),
      tripItems: computed(() => AppState.tripItems),
      async clearTrip() {
        if (await Pop.confirm("Are you sure you want to clear this trip? This can't be undone"))
          try {
            await tripService.clearTrip()
          } catch (error) {
            logger.error(error)
            Pop.error(error.message)
          }
      }
      // public variables and methods here
    }
  },
  components: { Location }
}
</script>

<style scoped></style>