<template>
  <div v-if="items.length != 0" class="d-flex justify-content-between mb-3">
    <div class="col-5 my-2">
      <img class="logo" :src="location?.logo" alt="Fred Meyer">
    </div>
    <h4 class="my-2">{{ location?.distance }} miles</h4>
    <h4 class="my-2"> ${{ finalPrice?.toFixed(2) }}</h4>
  </div>
  <div class="row my-2" v-for="item in items">
    <!-- NOTE use <TripItem /> component -->
    <StoreTripCard :item="item" />

  </div>
</template>

<script>
import { computed } from "vue"
import { AppState } from "../AppState.js"
import { logger } from "../utils/Logger.js"
import Pop from "../utils/Pop.js"
import { StoreLocation } from "../models/StoreLocation.js"
import StoreTripCard from "./StoreTripCard.vue"


export default {
  props: {
    location: { type: StoreLocation, required: true }
  },
  setup(props) {
    // private variables and methods here
    const items = computed(() => AppState.tripItems.filter(t => t.locationId == props.location.locationId))
    return {
      items: computed(() => items.value),
      finalPrice: computed(() => {
        let price = 0
        items.value.forEach(item => price += item.price * item.quantity)
        return price
      }),
      // location: props.location
      // public variables and methods here
    }
  },
  components: { StoreTripCard }
}
</script>

<style scoped>
.logo {
  width: 100%;
  height: auto;
  filter: drop-shadow(0 2px 5px #2d2b37);
}
</style>