<template>
  <div class="col-3 d-flex align-items-center justify-content-center p-0 bg-white rounded elevation-3">
    <img class="rounded itemPic" :src="item?.image" :alt="item?.name">
  </div>
  <div class="col-9">
    <h5 :title="item?.name">{{ item?.name.length <= 50 ? item?.name : item?.name.slice(0, 50) + '...' }} </h5>
        <section class="row justify-content-between">

          <div class="col-4 d-flex flex-column justify-content-between">
            <h6 class="">{{ item?.size }}</h6>
            <h6>{{ '$' + item?.price.toFixed(2) }}</h6>
          </div>

          <div class="col-2 p-0 my-3">
            <button class="btn text-primary border border-primary itemBtn"
              @click="editItemChoice(item?.query)">Edit</button>
          </div>

          <div class="col-6 d-flex justify-content-end">
            <div class="d-flex align-items-center me-3">
              <div class="p-1"><i class="mdi mdi-cart-outline display-6 text-dark"></i></div>
              <div>
                <span class="bg-light p-2 rounded"> {{ item?.quantity }} </span>
              </div>
            </div>
            <div>
              <div title="Increase Quantity" class="py-1 px-2 bg-light text-dark rounded mb-1 itemBtn"> <i
                  class="mdi mdi-chevron-up"></i> </div>

              <div title="Decrease Quantity" class="py-1 px-2 bg-light text-dark rounded mt-1 itemBtn"
                v-if="item?.quantity > 1"> <i class="mdi mdi-chevron-down"></i> </div>
              <div title="Delete Item" class="py-1 px-2 bg-light text-danger rounded mt-1 itemBtn" v-else> <i
                  class="mdi mdi-delete-outline"></i> </div>
            </div>
          </div>

        </section>

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
      async editItemChoice(query) {
        try {
          Pop.confirm("Are you sure that you want to edit this Item? This Item will be removed from your trip")
        } catch (error) {
          logger.error(error.message);
          Pop.error(error.message);
        }
      }
    }
  },
}
</script>

<style scoped>
.itemPic {
  max-width: 23vw;
  height: 12vh;
}

.itemBtn:hover {
  filter: brightness(0.95);
}

.itemBtn:active {
  filter: brightness(0.95);
  transform: scale(0.95);
}
</style>