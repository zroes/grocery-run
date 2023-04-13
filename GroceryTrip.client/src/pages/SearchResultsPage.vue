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

  </div>
</template>


<script lang="ts">
import { useRoute } from 'vue-router';
import { logger } from '../utils/Logger';
import Pop from '../utils/Pop';
import { router } from '../router';
import { watchEffect } from 'vue';
import { searchesService } from '../services/SearchesService';

export default {
  setup() {
    const route = useRoute();

    watchEffect(() => {
      route.params
      sortSearchResults();
    })

    async function getSearchResults() {
      try {
        const search = {
          queries: route.params.searchQuery
        }
        const searchData = await searchesService.getSearchResults(search);
        return searchData
      } catch (error) {
        logger.error(error.message);
        Pop.error(error.message);
      }
    }


    async function sortSearchResults() {
      try {
        const searchData = await getSearchResults();
        await searchesService.sortSearchResults(searchData, route.params.sortType);
      } catch (error) {
        logger.error(error.message);
        Pop.error(error.message);
      }
    }

    return {
      route,

      priceCheck: true,
      distanceCheck: false,

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
  }
}
</script>


<style lang="scss" scoped></style>