<template>
  <div class="container-fluid">

    <!--NOTE search bar goes here -->
    <div class="row justify-content-center">

      <!-- STUB Search Bar Component -->
      <SearchBar />

    </div>


    <!-- SECTION Trip component goes here -->
    <section class="row">

    </section>


    <!-- SECTION Lists -->
    <section class="row justify-content-center my-3 bg-grey py-2">
      <MyLists />
    </section>
  </div>
</template>

<script>
import MyLists from "../components/MyLists.vue"
import SearchBar from "../components/SearchBar.vue";

export default {
  setup() {
    return {}
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
