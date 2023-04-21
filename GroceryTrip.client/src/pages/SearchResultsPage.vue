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

    <Loading v-if="loading" />

    <section class="row justify-content-center p-2 mt-1">

      <div class="col-md-10 p-2 px-3" v-for="r in SearchResults">

        <!-- STUB SearchResultItem Card -->
        <SearchResultsItemsCard :r="r" />

      </div>

    </section>
    <p class="text-light opacity-75">Not seeing what you want? Try a more specific search!</p>

  </div>
</template>


<script lang="ts">
import { useRoute } from 'vue-router';
import { logger } from '../utils/Logger';
import Pop from '../utils/Pop';
import { router } from '../router';
import { watchEffect, computed, onMounted } from 'vue';
import { searchesService } from '../services/SearchesService';
import { AppState } from '../AppState';
import SearchResultsItemsCard from '../components/SearchResultsItemCard.vue'
import Loading from '../components/Loading.vue'


export default {
  setup() {
    let route = useRoute();

    watchEffect(() => {
      if (AppState.account.id && AppState.activeQuery != route.params.searchQuery) {
        getSearchResults();
      }
    })

    watchEffect(() => {
      route.params.sortType
      sortSearchResults();
    })

    watchEffect(() => {
      route.params
      AppState.searchResults = [];
    })


    async function getSearchResults() {
      try {
        AppState.activeQuery = route.params.searchQuery
        const search = {
          query: [route.params.searchQuery],
          locations: AppState.account.locations
        }
        await searchesService.getSearchResults(search);
      }
      catch (error) {
        logger.error(error.message);
        Pop.error(error.message);
        AppState.loading = false
      }
    }


    async function sortSearchResults() {
      try {
        logger.log("Sorting")
        await searchesService.sortSearchResults(route.params.sortType);
      } catch (error) {
        logger.error(error.message);
        Pop.error(error.message);
      }
    }

    return {
      route,
      loading: computed(() => AppState.loading),
      priceCheck: true,
      distanceCheck: false,
      SearchResults: computed(() => AppState.searchResults),

      async setSortType(newSortType) {
        try {
          router.replace({ name: 'SearchResults', params: { searchQuery: route.params.searchQuery, sortType: newSortType } })
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
  components: { SearchResultsItemsCard, Loading }
}
</script>


<style lang="scss" scoped></style>