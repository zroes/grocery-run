<template>
  <span class="navbar-text">
    <button class="btn selectable text-success lighten-30 text-uppercase my-2 my-lg-0" @click="login"
      v-if="!user.isAuthenticated">
      Login
    </button>
    <div v-else>
      <div class="my-2 my-lg-0 text-center">
        <div v-if="account.picture || user.picture" class="mb-1">
          <img :src="account.picture || user.picture" alt="" height="60" class="rounded" />
        </div>
        <div class="d-flex flex-column">
          <router-link :to="{ name: 'Account' }">
            <button class="btn btn-warning wide my-1">
              Manage Account
            </button>
          </router-link>
          <div>
            <button class="btn btn-danger wide text-dark my-1" @click="logout">
              <i class="mdi mdi-logout"></i>
              logout
            </button>
          </div>
        </div>
      </div>
    </div>
  </span>
</template>

<script>
import { computed } from 'vue'
import { AppState } from '../AppState'
import { AuthService } from '../services/AuthService'
export default {
  setup() {
    return {
      user: computed(() => AppState.user),
      account: computed(() => AppState.account),
      async login() {
        AuthService.loginWithPopup()
      },
      async logout() {
        AuthService.logout({ returnTo: window.location.origin })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@media (max-width: 576px) {
  .wide {
    width: 100%;
  }

}
</style>
