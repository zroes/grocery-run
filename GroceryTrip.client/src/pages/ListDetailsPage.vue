<template>
  <h1 class="p-3 text-light">{{ groceryList?.name }}</h1>
  <ul class="container-fluid">
    <div v-for="(item, index) in groceryListItems" class="row p-2 selectable" :class="{ 'bg-grey': index % 2 == 0 }">
      <li class="text-light d-flex">
        <h5 class="my-3 col-8">•{{ item.name }}</h5>
        <div class="text-end my-2 col">
          <button @click="deleteItem(item.id)" class="btn text-danger btn-dark" title="Remove Item"> <!--:class="{
            'btn-secondary': index % 2 == 0,
            'btn-grey': index % 2 == 1
          }"-->
            <i class="mdi mdi-delete"></i></button>
        </div>
      </li>
    </div>
    <div v-if="toggle" class="">
      <form class="row m-2" @submit.prevent="addItem">
        <div class="col-10 p-0">
          <input v-model="editable.name" class="form-control" type="text">
        </div>
        <button class="btn btn-primary col-2">Add</button>
      </form>
      <div class="text-center">
        <button @click="switchToggle" class="col-4 btn btn-danger">Cancel</button>
      </div>
    </div>
    <button v-if="!toggle" @click="switchToggle" class="btn btn-dark"><i class="mdi mdi-note-plus-outline"> Add
        Item</i></button>
  </ul>
</template>

<script>
import { computed, watchEffect, ref, onMounted } from "vue"
import { AppState } from "../AppState.js"
import { logger } from "../utils/Logger.js"
import Pop from "../utils/Pop.js"
import { listsService } from "../services/ListsService.js"
import { groceryListItemsService } from "../services/GroceryListItemsService.js"
import { useRoute } from "vue-router"
export default {
  setup() {
    // private variables and methods here
    const route = useRoute()
    const editable = ref({})

    async function getListById() {
      try {
        const listId = route.params.listId
        await listsService.getListById(listId)
      } catch (error) {
        logger.error(error)
        Pop.error(error.message)
      }
    }

    async function getItemsOnList() {
      try {
        const listId = route.params.listId
        await groceryListItemsService.getItemsOnList(listId)
      } catch (error) {
        logger.error(error)
        Pop.error(error.message)
      }
    }

    watchEffect(() => {
      if (AppState.account.id) {
        getListById()
        getItemsOnList()
      }
    })
    // onMounted(() => { getItemsOnList() })
    return {
      editable,
      groceryList: computed(() => AppState.activeGroceryList),
      groceryListItems: computed(() => AppState.activeGroceryListItems),
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
      async addItem() {
        editable.value.listId = route.params.listId
        logger.log('adding item', editable.value)
        try {
          await groceryListItemsService.addItem(editable.value)
        } catch (error) {
          logger.error(error)
          Pop.error(error.message)
        }
        editable.value = {}
      },

      async deleteItem(itemId) {
        try {
          if (await Pop.confirm("are you sure you want to delete this item?"))
            await groceryListItemsService.deleteItem(itemId)
        } catch (error) {
          logger.error(error)
          Pop.error(error.message)
        }
      }
      // public variables and methods here
    }
  },
}
</script>

<style scoped>
.child {
  opacity: 0;
  transition: all 0.2s ease-in-out;
  /* background-color: #dc3545;
  color: #f7f5f5; */
}

.parent:hover .child {
  opacity: 100;

}
</style>