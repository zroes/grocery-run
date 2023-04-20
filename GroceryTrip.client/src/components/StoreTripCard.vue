<template>
  <div class="filler"></div>
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
            <button class="btn text-primary border border-primary itemBtn" @click.stop="editItemChoice(item)"
              v-if="item.included">Edit</button>
          </div>

          <div class="col-6 d-flex justify-content-end">
            <div class="d-flex align-items-center me-3">
              <div class="p-1"><i class="mdi mdi-cart-outline display-6 text-black"></i></div>
              <div>
                <span class="bg-light p-2 rounded"> {{ item?.quantity }} </span>
              </div>
            </div>
            <div>

              <div title="Increase Quantity" class="py-1 px-2 bg-light text-dark rounded mb-1 itemBtn"
                @click.stop="increaseQuantity(item)" v-if="item.included">
                <i class="mdi mdi-chevron-up"></i>
              </div>

              <div title="Decrease Quantity" class="py-1 px-2 bg-light text-dark rounded mt-1 itemBtn"
                v-if="item?.quantity > 1 && item.included" @click.stop="decreaseQuantityOrDelete(item)"
                :disabled="!item.included"> <i class="mdi mdi-chevron-down"></i>
              </div>
              <div title="Delete Item" class="py-1 px-2 bg-light text-danger rounded mt-1 itemBtn"
                v-else-if="item.included" @click.stop="decreaseQuantityOrDelete(item)"> <i
                  class="mdi mdi-delete-outline"></i> </div>
            </div>
          </div>

        </section>
  </div>
  <div v-if="!item.included" class="excluded bg-light"></div>
  <div v-else class="filler"></div>
</template>

<script>
import { logger } from "../utils/Logger.js"
import Pop from "../utils/Pop.js"
import { tripItem } from "../models/SearchResult.js"
import { tripService } from "../services/TripService.js"
import { router } from "../router.js"

export default {
  props: {
    item: { type: tripItem, required: true }
  },
  setup() {
    // private variables and methods here
    return {

      async editItemChoice(item) {
        try {
          const query = item.query
          if (await Pop.confirm("Are you sure that you want to edit this Item? This Item will be removed from your trip")) {
            router.push({ name: 'SearchResults', params: { searchQuery: query, sortType: "price" } })
            await tripService.deleteTripItem(item)
          }
        } catch (error) {
          logger.error(error.message);
          Pop.error(error.message);
        }
      },

      async increaseQuantity(item) {
        try {
          await tripService.increaseQuantity(item)
        } catch (error) {
          logger.error(error.message);
          Pop.error(error.message);
        }
      },

      async decreaseQuantityOrDelete(item) {
        try {
          if (item.quantity <= 1) {
            if (await Pop.confirm("Are you Sure you want to delete this Item?")) {
              await tripService.deleteTripItem(item)
            }
          } else {
            await tripService.decreaseQuantity(item)
          }
        } catch (error) {
          logger.error(error);
          Pop.error(error.message);
        }
      },
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

.excluded {
  height: 5px;
  /* opacity: 0; */
  border-radius: 1em;
  position: relative;
  bottom: 60px;
}

.filler {
  height: 5px;
}
</style>