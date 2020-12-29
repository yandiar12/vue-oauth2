<template>
  <v-container fluid fill-height>
    <v-layout flex align-center justify-center>
      <v-flex xs12 sm4 elevation-6>
        <v-card>
          <v-card-text class="pt-4">
            <p class="caption text-lg-h6">
              <v-icon left>fa fa-user</v-icon>{{ authData.user.name }}
            </p>
            <p class="caption text-lg-h6">
              <v-icon left>fa fa-envelope</v-icon>{{ authData.user.email }}
            </p>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { AuthHeader } from '../services/StorageService'
export default {
  name: 'profile',
  data() {
    return {
      authData: AuthHeader.getAuthData()
    }
  }
}
</script>

<style lang="scss" scoped></style>
