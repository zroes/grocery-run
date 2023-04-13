<template>
  <header>
    <Navbar />
  </header>
  <main>
    <!-- <h1 class="p-4 bg-primary"> Test!</h1>
    <h1 class="p-4 bg-secondary"> Test!</h1>
    <h1 class="p-4 bg-grey"> Test!</h1>
    <h1 class="p-4 bg-dark"> Test!</h1>
    <h1 class="p-4 bg-light"> Test!</h1>
    <h1 class="p-4 bg-warning"> Test!</h1>
    <h1 class="p-4 bg-danger"> Test!</h1>
    <h1 class="p-4 bg-success"> Test!</h1> -->
    <router-view />
  </main>
  <footer class="bg-dark text-light">
    •••
  </footer>
</template>

<script>
import { computed } from 'vue'
import { AppState } from './AppState'
import Navbar from './components/Navbar.vue'

export default {
  setup() {
    return {
      appState: computed(() => AppState)
    }
  },
  components: { Navbar }
}
</script>
<style lang="scss">
@import "./assets/scss/main.scss";

:root {
  --main-height: calc(100vh - 32px - 64px);
}

.bigger {
  font-size: 42px;
}


footer {
  display: grid;
  place-content: center;
  height: 32px;
}
</style>
