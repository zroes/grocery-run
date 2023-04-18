<template>
  <h4>My Trip</h4>
  <div v-for="location in locations">
    <div class="d-flex justify-content-between mb-3">
      <div class="col-5 my-2">
        <img class="logo" :src="location?.logo" alt="Fred Meyer">
      </div>
      <h4 class="my-2">{{ location?.distance }} miles</h4>
      <h4 class="my-2"> ${{ Price0?.toFixed(2) }}</h4>
    </div>

    <!-- <div class="row my-2" v-for="item in Items0" v-if="location == " laction#1">
      ***Item Component Here***
    </div>
    <div class="row my-2" v-for="item in Items1" v-if="location == " laction#1">
      ***Item Component Here***
    </div> -->


    <div class="row my-2" v-for="item in Items0">
      <!-- NOTE use <TripItem /> component -->
      <div class="col-3 d-flex align-items-center justify-content-center p-0 bg-white rounded elevation-3">
        <img class="rounded itemPic" :src="item?.image" :alt="item?.name">
      </div>
      <div class="col-9">
        <h5 :title="item?.name">{{ item?.name.length <= 50 ? item?.name : item?.name.slice(0, 50) + '...' }} </h5>
            <div class="d-flex justify-content-between">

              <h6>{{ '$' + item?.price.toFixed(2) }}</h6>
              <h6 class="">{{ item?.size }}</h6>
            </div>
      </div>

    </div>
  </div>
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
      // NOTE This will need Refactoring
      Items0: computed(() => AppState.tripItems.filter(t => t.locationId == AppState.account.krogerLocations[0].locationId)),
      Price0: computed(() => {
        let price = 0
        AppState.tripItems.filter(t => t.locationId == AppState.account.krogerLocations[0].locationId).forEach(item => price += item.price * item.quantity)
        return price
      }),
      Items1: computed(() => AppState.tripItems.filter(t => t.locationId == AppState.account.krogerLocations[1].locationId)),
      Price1: computed(() => {
        let price = 0
        AppState.tripItems.filter(t => t.locationId == AppState.account.krogerLocations[1].locationId).forEach(item => price += item.price * item.quantity)
        return price
      }),
      locations: computed(() => AppState.account.krogerLocations)
      // public variables and methods here
    }
  },
}
</script>

<style scoped>
.itemPic {
  max-width: 24vw;
  height: 12vh;
}

.logo {
  width: 100%;
  height: auto;
  filter: drop-shadow(0 2px 5px #2d2b37);
}
</style>