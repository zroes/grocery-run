<template>
  <div class="container-fluid">

    <!--NOTE search bar goes here -->
    <div class="row justify-content-center p-2 mt-1">
      <!-- STUB Search Bar Component -->
      <SearchBar :sortType="sortType" />
    </div>


    <!-- SECTION Trip component goes here -->
    <section class="row">

    </section>


    <!-- SECTION Lists -->
    <section class="row justify-content-center mb-3 rounded m-1 bg-grey py-2">
      <MyLists />
    </section>
  </div>
</template>

<script>
import MyLists from "../components/MyLists.vue"
import SearchBar from "../components/SearchBar.vue"

export default {
  setup() {
    return {
      sortType: 'price',
    }
  },
  components: { MyLists, SearchBar }
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
