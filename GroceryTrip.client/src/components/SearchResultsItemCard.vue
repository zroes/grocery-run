<template>
  <div class="row py-3 px-2 bg-grey">
    <div class="col-3 d-flex align-items-center justify-content-center p-0">
      <img class="rounded itemPic" :src="r?.image" :alt="r?.name">
    </div>
    <div class="col-9">
      <div class="d-flex justify-content-between">
        <h6>
          <img class="img-fluid" width="70"
            src="https://www.vhv.rs/dpng/d/200-2009833_fred-meyer-logo-png-transparent-png.png" alt="Fred Meyer"
            v-if="r.store?.includes('FRED MEYER')">
          <img class="img-fluid" width="70" src="../assets/img/GenericCompanyPic.png" alt="Generic"
            v-if="r?.store == null">
          <span v-if="r?.distance">{{ r?.distance + ' Miles' }}</span> <span v-else> 0 Miles </span>
        </h6>
        <h5>{{ '$' + r?.price }}</h5>
      </div>
      <h6>{{ r?.name }}</h6>
      <div class="d-flex justify-content-between">
        <h6 class="d-flex align-items-center m-0">{{ r?.size }}</h6>
        <div class="d-flex align-items-center"> <i class="mdi mdi-cart-outline text-dark display-6"></i> <span
            class="bg-light py-1 px-2 rounded">{{
              r?.quantity }}</span>
        </div>
        <button class="btn-warning rounded" @click="addToTrip()">Add to Trip</button>
      </div>
    </div>
  </div>
</template>


<script lang="ts">
import { SearchResult } from '../models/SearchResult';
import { logger } from '../utils/Logger';
import Pop from '../utils/Pop';

export default {
  props: {
    r: { type: SearchResult, required: true }
  },
  setup(props) {
    return {
      addToTrip() {
        try {
          // logger.log('Adding to Trip')
          props.r.quantity++
        } catch (error) {
          logger.error(error.message);
          Pop.error(error.message);
        }
      }
    }
  }
}
</script>


<style lang="scss" scoped>
.itemPic {
  max-width: 24vw;
  height: 12vh;
}
</style>