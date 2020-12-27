<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-toolbar-title>
        <div class="d-flex align-center mr-2">
          <h3>Vue OAuth2</h3>
        </div>
      </v-toolbar-title>
      
      <v-btn depressed color="primary" v-if="isLoggedIn">
        {{ getUser.name }} Profile
      </v-btn>

      <v-spacer></v-spacer>

      <v-btn 
        depressed 
        color="primary"
        @click="doLogout"
      >
        Logout
        <v-icon right>mdi-logout</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'home',
  data() {
    return {
    }
  },
  computed: {
    ...mapGetters('auth', ['token', 'user']),
    getUser() {
      return this.user
    },
    isLoggedIn() {
      return this.token
    }
  },
  methods: {
    ...mapActions('auth', ['logout']),
    doLogout() {
      this.logout()
    }
  }

}
</script>

<style lang="scss" scoped></style>
