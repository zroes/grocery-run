<template>
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
</template>

<script>
import { computed } from "vue"
import { AppState } from "../AppState.js"
import { logger } from "../utils/Logger.js"
import Pop from "../utils/Pop.js"
import { tripItem } from "../models/SearchResult.js"
export default {
  props: {
    item: { type: tripItem, required: true }
  },
  setup() {
    // private variables and methods here
    return {
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
</style>