<template>
  <div class="row py-3 px-2 bg-grey rounded">
    <div class="col-3 d-flex align-items-center justify-content-center p-0">
      <img class="rounded itemPic" :src="r?.image" :alt="r?.name">
    </div>
    <div class="col-9">
      <div class="d-flex justify-content-between">
        <h6>
          <img class="img-fluid logo me-2" width="90" src="../assets/img/fredmeyer-logo.png" alt="Fred Meyer"
            v-if="r.store?.includes('FRED MEYER')">
          <img class="img-fluid logo me-2" width="90"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/Albertsons_logo.svg/2560px-Albertsons_logo.svg.png"
            alt="Generic" v-else-if="r.store?.includes('Albertsons')">
          <img class="img-fluid logo me-2" width="80" src="../assets/img/GenericCompanyPic.png" alt="Generic" v-else>
          <span v-if="r?.distance">{{ r?.distance + ' Miles' }}</span> <span v-else> 0 Miles </span>
        </h6>
        <h5>{{ '$' + r?.price.toFixed(2) }}</h5>
      </div>
      <h6>{{ r?.name }}</h6>
      <div class="d-flex justify-content-between">
        <h6 class="d-flex align-items-center m-0">{{ r?.size }}</h6>
        <button class="btn-warning rounded fw-custom" @click="createTripItem(r)" v-if="account.id">Add to Trip</button>
      </div>
    </div>
  </div>
</template>


<script lang="ts">
import { computed } from '@vue/reactivity';
import { SearchResult } from '../models/SearchResult';
import { logger } from '../utils/Logger';
import Pop from '../utils/Pop';
import { AppState } from '../AppState';
import { tripService } from '../services/TripService';

export default {
  props: {
    r: { type: SearchResult, required: true }
  },
  setup(props) {
    return {

      account: computed(() => AppState.account),

      async createTripItem(selectedSearchResult) {
        try {
          await tripService.createTripItem(selectedSearchResult);
          Pop.toast("Added item to trip!", 'success', 'top', 1700)
        } catch (error) {
          logger.error(error.message);
          Pop.error(error.message);
        }
      },

    }
  }
}
</script>


<style lang="scss" scoped>
.itemPic {
  max-width: 24vw;
  height: 12vh;
}

.fw-custom {
  font-weight: 500;
}

.logo {
  filter: drop-shadow(0 2px 5px #2d2b37);
}
</style>