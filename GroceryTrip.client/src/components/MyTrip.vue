<template>
  <h4>My Trip</h4>
  <div class="d-flex justify-content-between mb-3">
    <img class="logo" src="../assets/img/fredmeyer logo.png" alt="Fred Meyer">
    <h4 class="my-2">{{ fredItems[0]?.distance }} miles</h4>
    <h4 class="my-2"> ${{ fredPrice.toFixed(2) }}</h4>
  </div>
  <div class="row my-2" v-for="item in fredItems">
    <div class="col-3 d-flex align-items-center justify-content-center p-0">
      <img class="rounded itemPic" :src="item?.image" :alt="item?.name">
    </div>
    <div class="col-9">
      <h5 :title="item?.name">{{ item?.name.length <= 35 ? item?.name : item?.name.slice(0, 35) + '...' }}</h5>
          <div class="d-flex justify-content-between">

            <h6>{{ '$' + item?.price.toFixed(2) }}</h6>
          </div>
          <div class="d-flex justify-content-end">
            <h6 class="d-flex align-items-center m-0">{{ item?.size }}</h6>
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
      fredItems: computed(() => AppState.fredMeyerTripItems),
      fredPrice: computed(() => {
        let price = 0
        AppState.fredMeyerTripItems.forEach(item => price += item.price * item.quantity)
        return price
      })
      // public variables and methods here
    }
  },
}
</script>

<style>
.itemPic {
  max-width: 24vw;
  height: 12vh;
}

.logo {
  width: 40%;
  filter: drop-shadow(0 2px 5px #2d2b37);
}
</style>