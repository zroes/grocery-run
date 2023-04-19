<template>
  <h1 class="bigger p-3 text-light">{{ groceryList?.name }}</h1>
  <ul class="container-fluid">
    <div v-for="(item, index) in groceryListItems" class="row p-2 justify-content-between"
      :class="{ 'bg-grey': index % 2 == 0 }, { 'opacity-50 bg-dark': !item.included }" @click="toggleInclude(item.id)">
      <div class="filler"></div>
      <li class="text-light d-flex">
        <h5 class="my-3 col-8">•{{ item.name }}</h5>
        <div class="text-end my-2 col">
          <button @click.stop="deleteItem(item.id)" class="btn text-danger btn-dark" title="Remove Item"
            :disabled="!item.included">
            <i class="mdi mdi-delete-outline"></i></button>
        </div>
      </li>
      <div v-if="!item.included" class="excluded bg-light"></div>
      <div v-else class="filler"></div>
    </div>
    <div v-if="toggle" class="">
      <form class="row m-2" @submit.prevent="addItem">
        <div class="col-10 p-0">
          <input v-model="editable.name" class="form-control" type="text">
        </div>
        <button class="btn btn-primary col-2">Add</button>
      </form>
      <div class="text-center">
        <button @click="switchToggle" class="col-3 btn btn-secondary border-warning text-warning">Cancel</button>
      </div>
    </div>
    <button v-if="!toggle" @click="switchToggle" class="my-3 btn btn-dark"><i class="mdi mdi-note-plus-outline"> Add
        Item</i></button>
  </ul>
  <div class="container-fluid">
    <div class="row">
    </div>
    <div class="row justify-content-evenly my-3">
      <button @click="deleteList" class="btn btn-secondary border-danger text-danger col-4">Delete List</button>
      <button @click="addListToTrip" class="col-5 btn btn-primary py-2">Add List to Trip</button>

    </div>
  </div>
</template>

<script>
import { computed, watchEffect, ref, onMounted, popScopeId } from "vue"
import { AppState } from "../AppState.js"
import { logger } from "../utils/Logger.js"
import Pop from "../utils/Pop.js"
import { listsService } from "../services/ListsService.js"
import { groceryListItemsService } from "../services/GroceryListItemsService.js"
import { useRoute } from "vue-router"
import { router } from "../router.js"
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
    onMounted(() => { AppState.activeGroceryListItems = [] })
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
      },

      async deleteList() {
        if (await Pop.confirm("Are you sure you want to delete this list?")) {
          try {
            await listsService.deleteList(route.params.listId)
            router.push('/')
          } catch (error) {
            logger.error(error)
            Pop.error(error.message)
          }
        }
      },

      async toggleInclude(itemId) {
        try {
          await groceryListItemsService.toggleInclude(itemId)
        } catch (error) {
          logger.error(error)
          Pop.error(error.message)
        }
      },

      async addListToTrip() {
        try {
          const itemsToSend = []
          AppState.activeGroceryListItems.forEach(item => {
            itemsToSend.push(item.name)
          })
          const locations = AppState.account.krogerLocations
          const body = { query: itemsToSend, locations: locations }
          // debugger 
          const sortType = await Pop.filterButtons()

          if (sortType) {
            await groceryListItemsService.sortListResults(body, sortType)
            router.push({ name: 'Home' })
          }
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

.excluded {
  height: 5px;
  /* opacity: 0; */
  border-radius: 1em;
  position: relative;
  bottom: 30px;
}

.filler {
  height: 5px;
}

.parent:hover .child {
  opacity: 100;

}
</style>