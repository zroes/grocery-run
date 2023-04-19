<template>
  <h4>My Trip</h4>
  <div v-for="location in locations">
    <Location :location="location" />
  </div>
  <button class="btn btn-danger col-5 py-2">Clear Trip</button>
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
    } // TODO use components instead
    const items0 = computed(() => AppState.tripItems.filter
      (t => t.locationId == AppState.account.krogerLocations[0].locationId))

    const items1 = computed(() => AppState.tripItems.filter
      (t => t.locationId == AppState.account.krogerLocations[1].locationId))

    onMounted(() => {
      getMyTripItems()
    })
    return {
      // NOTE This will need Refactoring
      items0: computed(() => items0.value),
      price0: computed(() => {
        let price = 0
        items0.value.forEach(item => price += item.price * item.quantity)
        return price
      }),
      items1: computed(() => items1.value),
      price1: computed(() => {
        let price = 0
        items1.value.forEach(item => price += item.price * item.quantity)
        return price
      }),
      locations: computed(() => AppState.account.krogerLocations)
      // public variables and methods here
    }
  },
  components: { Location }
}
</script>

<style scoped></style>