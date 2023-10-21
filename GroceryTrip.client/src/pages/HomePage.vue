<template>
  <Loading v-if="loading" />
  <div v-else class="container-fluid">

    <!--NOTE search bar goes here -->
    <div class="row justify-content-center p-2 mt-1" v-if="account.id">
      <!-- STUB Search Bar Component -->
      <SearchBar :sortType="sortType" />
    </div>

    <div class="row justify-content-center p-2 mt-5" v-else>
      <div class="col-10">
        <h4 class="text-center text-light opacity-75">Please login to continue</h4>
        <h5 class="text-center text-light opacity-50 p-3">Tap / click <i class="mdi mdi-menu"></i></h5>
      </div>
    </div>


    <!-- SECTION Trip component goes here -->
    <section class="row justify-content-center my-3 rounded m-1 bg-grey py-2" v-if="account.id">
      <MyTrip />
    </section>


    <!-- SECTION Lists -->
    <section class="row justify-content-center mb-3 rounded m-1 bg-grey py-2" v-if="account.id">
      <MyLists />
    </section>
  </div>
</template>

<script>
import MyLists from "../components/MyLists.vue"
import SearchBar from "../components/SearchBar.vue"
import { computed } from "@vue/reactivity"
import { AppState } from "../AppState.js"
import MyTrip from "../components/MyTrip.vue"
import Loading from "../components/Loading.vue"
import { onMounted } from "vue"

export default {
  setup() {

    onMounted(() => {
      AppState.searchResults = []
    })
    return {
      sortType: 'price',
      loading: computed(() => AppState.loading),
      account: computed(() => AppState.account),

    }
  },
  components: { MyLists, SearchBar, MyTrip, Loading }
}
</script>

<style scoped lang="scss">
.home {
  display: grid;
  height: 80vh;
  place-content: center;
  text-align: center;
  user-select: none;

  .home-card {
    width: 50vw;

    >img {
      height: 200px;
      max-width: 200px;
      width: 100%;
      object-fit: contain;
      object-position: center;
    }
  }
}
</style>
