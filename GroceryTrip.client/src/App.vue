<template>
  <header>
    <Navbar />
  </header>
  <main>
    <h1 class="p-4 selectable bg-primary"> Awesome!</h1>
    <h1 class="p-4 selectable bg-secondary"> Awesome!</h1>
    <h1 class="p-4 selectable bg-grey"> Awesome!</h1>
    <h1 class="p-4 selectable bg-dark"> Awesome!</h1>
    <h1 class="p-4 selectable bg-light"> Awesome!</h1>
    <h1 class="p-4 selectable bg-warning"> Awesome!</h1>
    <h1 class="p-4 selectable bg-danger"> Awesome!</h1>
    <h1 class="p-4 selectable bg-success"> Awesome!</h1>
    <router-view />
  </main>
  <footer class="bg-dark text-light">
    Made with 💖 by CodeWorks
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


footer {
  display: grid;
  place-content: center;
  height: 32px;
}
</style>
