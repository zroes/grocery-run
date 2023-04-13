<template>
  <div class="col-4 text-center border-success border-custom">
    <h1 class="text-success mbn-1">My Lists</h1>
  </div>
  <div class="col-11 text-end mtn-3">
    <div class="row justify-content-end">
      <button @click="switchToggle" class="btn btn-warning col-3">Add List</button>
    </div>
  </div>
  <div v-if="toggle" class="col-11 my-3">
    <div class="row justify-content-between">
      <input v-model="editable.name" type="text" class="form-control col-8" name="" id="" placeholder="Name your list">
      <button @click="switchToggle" class="col-3 btn btn-danger my-4">Cancel</button>
      <button @click="createList" class="col-3 btn btn-primary my-4">Create</button>
    </div>
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
import { computed, ref } from "vue"
import { AppState } from "../AppState.js"
import { logger } from "../utils/Logger.js"
import Pop from "../utils/Pop.js"
import { listsService } from "../services/ListsService.js"

export default {
  setup() {
    // private variables and methods here
    const editable = ref({})
    return {
      editable,
      toggle: computed(() => AppState.toggle),
      switchToggle() {
        try {
          listsService.toggleForm()
          editable.value = {}
        } catch (error) {
          logger.error(error)
          Pop.error(error.message)
        }
      },

      async createList() {
        try {
          await listsService.createList(editable.value)
        } catch (error) {
          logger.error(error)
          Pop.error(error.message)
        }
      },
      // public variables and methods here
    }
  },
}
</script>

<style scoped>
.border-custom {
  border-bottom: 5px solid;
}

.mbn-1 {
  /* margin-top: -1em; */
  margin-bottom: -1px;
}

.mtn-3 {
  margin-top: -35px;
}
</style>