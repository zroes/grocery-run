<template>
  <div class="d-flex justify-content-center my-5 py-5">
    <div class="loader-wrapper">
      <div class="ball-pulse-sync loader">
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from "vue"
import { AppState } from "../AppState.js"
import { logger } from "../utils/Logger.js"
import Pop from "../utils/Pop.js"
import 'loaders.css/loaders.min.css'


export default {
  setup() {
    // private variables and methods here
    return {
      // public variables and methods here
    }
  },
}
</script>

<style></style>