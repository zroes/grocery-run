<template>
  <div class="col-md-5 col-9 p-0">
    <form @submit.prevent="search()" class="d-flex">
      <input class="form-control" type="text" id="search" required placeholder="Search..." v-model="editable.search"
        minlength="3" maxlength="25">

      <button type="submit" class="btn btn-warning"> <i class="mdi mdi-magnify"></i> </button>
    </form>
  </div>
</template>


<script lang="ts">
import { ref } from 'vue';
import { logger } from '../utils/Logger';
import Pop from '../utils/Pop';
import { router } from '../router';

export default {
  setup() {

    const editable = ref({})

    return {
      editable,

      async search() {
        try {
          logger.log(`Searching`)
          let query = editable.value.search
          router.push({ name: 'SearchResults', params: { searchQuery: query } })
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