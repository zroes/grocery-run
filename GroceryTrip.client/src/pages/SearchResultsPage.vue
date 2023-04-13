<template>
  <div class="container-fluid">

    <section class="row justify-content-center p-2 mt-1">

      <!-- STUB Search Bar Component -->
      <SearchBar />

      <div class="col-3 col-md-1 text-center p-0">
        <div class="dropdown">
          <button class="btn btn-info dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
            Filter
          </button>
          <ul class="dropdown-menu p-0">
            <li class="border-bottom border-dark p-2">
              <div class="d-flex"><button class="dropdown-item p-0">Sort by
                  Price</button>
                <i class="mdi mdi-check"></i>
              </div>
            </li>
            <li class="border-bottom border-dark p-2">
              <div class="d-flex"><button class="dropdown-item p-0">Sort by
                  Distance</button>
                <i class="mdi mdi-check"></i>
              </div>
            </li>
          </ul>
        </div>
      </div>

    </section>

  </div>
</template>


<script lang="ts">
export default {
  setup() {
    return {}
  }
}
</script>


<style lang="scss" scoped></style>