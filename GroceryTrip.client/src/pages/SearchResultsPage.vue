<template>
  <div class="container-fluid">

    <section class="row justify-content-center p-2 mt-1">

      <!-- STUB Search Bar Component -->
      <SearchBar :sortType="route.params.sortType" />

      <div class="col-3 col-md-1 text-center p-0">
        <div class="dropdown">
          <button class="btn btn-info dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
            Sort
          </button>
          <ul class="dropdown-menu p-0">
            <li class="border-bottom border-dark p-2" @click="setSortType(`price`)">
              <div class="d-flex"><button class="dropdown-item p-0">Sort by
                  Price</button>
                <i class="mdi mdi-check" v-if="priceCheck"></i>
              </div>
            </li>
            <li class="border-bottom border-dark p-2">
              <div class="d-flex"><button class="dropdown-item p-0" @click="setSortType(`distance`)">Sort by
                  Distance</button>
                <i class="mdi mdi-check" v-if="distanceCheck"></i>
              </div>
            </li>
          </ul>
        </div>
      </div>

    </section>

    <section class="row justify-content-center p-2 mt-1">

      <div class="col-md-10 p-2 px-3" v-for="r in SearchResults">

        <!-- STUB SearchResultItem Card -->
        <SearchResultsItemsCard :r="r" />
        <!-- <div class="row py-3 px-2 bg-grey">
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
              <button class="btn-warning rounded">Add to Trip</button>
            </div>
          </div>
        </div> -->

      </div>

    </section>

  </div>
</template>


<script lang="ts">
import { useRoute } from 'vue-router';
import { logger } from '../utils/Logger';
import Pop from '../utils/Pop';
import { router } from '../router';
import { watchEffect, computed } from 'vue';
import { searchesService } from '../services/SearchesService';
import { AppState } from '../AppState';
import SearchResultsItemsCard from '../components/SearchResultsItemCard.vue'

export default {
  setup() {
    const route = useRoute();

    watchEffect(() => {
      AppState.account.id
      getSearchResults();
    })


    watchEffect(() => {
      route.params
      sortSearchResults();
    })


    async function getSearchResults() {
      try {
        const search = {
          query: route.params.searchQuery,
          locations: AppState.account.krogerLocations
        }
        await searchesService.getSearchResults(search);
      } catch (error) {
        logger.error(error.message);
        Pop.error(error.message);
      }
    }


    async function sortSearchResults() {
      try {
        await searchesService.sortSearchResults(route.params.sortType);
      } catch (error) {
        logger.error(error.message);
        Pop.error(error.message);
      }
    }

    return {
      route,

      priceCheck: true,
      distanceCheck: false,
      SearchResults: computed(() => AppState.searchResults),

      async setSortType(newSortType) {
        try {
          router.push({ name: 'SearchResults', params: { searchQuery: route.params.searchQuery, sortType: newSortType } })
          if (newSortType == 'distance') {
            this.priceCheck = false
            this.distanceCheck = true
          } else {
            this.priceCheck = true
            this.distanceCheck = false
          }
        } catch (error) {
          logger.error(error.message);
          Pop.error(error.message);
        }
      }

    }
  },
  components: { SearchResultsItemsCard }
}
</script>


<style lang="scss" scoped></style>