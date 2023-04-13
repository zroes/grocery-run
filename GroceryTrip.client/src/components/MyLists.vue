<template>
  <div class="col-4 text-center border-success border-custom">
    <h1 class="text-success margin-negative">My Lists</h1>
  </div>
  <div class="col-12 text-end">
    <button class="btn btn-warning">Add List</button>
  </div>
  <div class="col-12">
    <div class="row">
      <div class="col-md-3 col-6">
        <h3>List</h3>
      </div>
      <div class="col-md-3 col-6">
        <h3>List</h3>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  setup() {
    // private variables and methods here
    return {
      // public variables and methods here
    }
  },
}
</script>

<style scoped>
.border-custom {
  border-bottom: 5px solid;
}

.margin-negative {
  /* margin-top: -1em; */
  margin-bottom: -1px;
}
</style>