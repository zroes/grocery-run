<template>
  <div class="col-2"></div>
  <div class="col-6 text-center border-success border-custom my-4">
    <h1 class="text-success bigger mb-0">My Lists</h1>
  </div>
  <div class="col-2 d-flex my-4 align-items-center">
    <button @click="switchToggle" title="Add Item" class="btn btn-warning"><i class="mdi mdi-plus"></i></button>
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
      <div v-for="list in groceryLists" class="col text-nowrap my-3">
        <!-- NOTE Break into component -->
        <router-link v-if="list?.id" :to="{ name: 'ListDetails', params: { listId: list.id } }">
          <div class="p-3 bg-light rounded">
            <h3 class="text-center">{{ list.name }}</h3>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, watchEffect, ref } from "vue"
import { AppState } from "../AppState.js"
import { logger } from "../utils/Logger.js"
import Pop from "../utils/Pop.js"
import { listsService } from "../services/ListsService.js"
import { router } from "../router.js"

export default {
  setup() {
    // private variables and methods here
    async function getMyLists() {
      try {
        await listsService.getMyLists()
      } catch (error) {
        logger.error(error)
        Pop.error(error.message)
      }
    }
    watchEffect(() => {
      if (AppState.account.id) {
        getMyLists()
      }
    })
    const editable = ref({})


    return {
      editable,
      toggle: computed(() => AppState.toggle),
      groceryLists: computed(() => AppState.groceryLists),
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
          const newList = await listsService.createList(editable.value)
          router.push({ name: 'ListDetails', params: { listId: newList.id } })
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
</style>