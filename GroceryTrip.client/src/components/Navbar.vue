<template>
  <nav class="navbar navbar-dark bg-dark px-3 border-success border-bottom border-4">
    <router-link class="navbar-brand d-flex" :to="{ name: 'Home' }">
      <div class="d-flex flex-column align-items-center">
        <img alt="logo" src="../assets/img/logo2.png" height="45" />
      </div>
    </router-link>
    <button class="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasTop"
      aria-controls="offcanvasTop">
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="offcanvas offcanvas-top bg-dark" tabindex="-1" id="offcanvasTop" aria-labelledby="offcanvasTopLabel">
      <div class="offcanvas-header pb-0">
        <h5 class="offcanvas-title" id="offcanvasTopLabel">Account</h5>
        <button type="button" class="navbar-toggler" data-bs-dismiss="offcanvas" aria-label="Close"><span
            class="navbar-toggler-icon"></span></button>
      </div>
      <div class="offcanvas-body pt-0">
        <Login />
      </div>
    </div>
  </nav>
</template>

<script>
import Login from './Login.vue'

export default {
  setup() {
  },
  components: { Login }
}
</script>

<style scoped>
a:hover {
  text-decoration: none;
}

.nav-link {
  text-transform: uppercase;
}

.navbar-nav .router-link-exact-active {
  border-bottom: 2px solid var(--bs-success);
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}

@media screen and (min-width: 768px) {
  nav {
    height: 70px;
  }
}
</style>
