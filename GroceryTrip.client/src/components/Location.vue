<template>
  <div class="d-flex justify-content-between mb-3">
    <div class="col-5 my-2">
      <img class="logo" :src="location?.logo" alt="Fred Meyer">
    </div>
    <h4 class="my-2">{{ location?.distance }} miles</h4>
    <h4 class="my-2"> ${{ price0?.toFixed(2) }}</h4>
  </div>

  <!-- <div class="row my-2" v-for="item in Items0" v-if="location == " laction#1">
      ***Item Component Here***
    </div>
    <div class="row my-2" v-for="item in Items1" v-if="location == " laction#1">
      ***Item Component Here***
    </div> -->


  <div class="row my-2" v-for="item in items0">
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
</template>

<script>
import { computed } from "vue"
import { AppState } from "../AppState.js"
import { logger } from "../utils/Logger.js"
import Pop from "../utils/Pop.js"
export default {
  setup() {
    // private variables and methods here
    return {
      // public variables and methods here
    }
  },
}
</script>

<style></style>