<template>
  <v-app>
    <v-container fluid fill-height>
      <v-layout flex align-center justify-center>
        <v-flex xs12 sm4 elevation-6>
          <v-card>
            <v-card-title>Sign Up</v-card-title>
            <v-card-text class="pt-4">
              <validation-observer
                ref="observer"
                v-slot="{ invalid }"
              >
                <v-form>
                  <v-alert v-if="type===`success`" show type="success">{{ message }}</v-alert>
                  <v-alert v-if="type===`error`" show type="error">{{ message }}</v-alert>
                  
                  <div class="my-3">
                    <validation-provider
                      v-slot="{ errors }"
                      name="Email"
                      rules="required|email"
                    >
                    <v-text-field type="email" id="email" name="email" label="Email" v-model="form.email" :error-messages="errors"></v-text-field>
                    </validation-provider>
                  </div>

                  <div class="my-3">
                    <validation-provider
                      v-slot="{ errors }"
                      name="Name"
                      rules="required"
                    >
                    <v-text-field type="text" id="name" name="name" label="name" v-model="form.name" :error-messages="errors"></v-text-field>
                    </validation-provider>
                  </div>
                  
                  <div class="my-3">
                    <validation-provider
                      v-slot="{ errors }"
                      name="Password"
                      rules="required|min:5|confirmed:confirm"
                    >
                    <v-text-field type="password" id="password" name="password" label="Password"  v-model="form.password" :error-messages="errors" @keyup.enter="onLogin($event)"></v-text-field>
                    </validation-provider>
                  </div>

                  <div class="my-3">
                    <validation-provider
                      v-slot="{ errors }"
                      vid="confirm"
                      name="Confirm Password"
                      rules="required|min:5"
                    >
                    <v-text-field type="password" id="re-password" name="re-password" label="Confirm Password"  v-model="form.re_password" :error-messages="errors" @keyup.enter="submit($event)"></v-text-field>
                    </validation-provider>
                  </div>

                  <div class="my-2">
                    <v-btn depressed block color="info" elevation="3" @click="submit($event)" :loading="loading" :disabled="invalid">
                      Sign up
                    </v-btn>
                  </div>
                  <p>
                    have an account ? 
                    <router-link tag="a" :to="{ name: 'login' }">Sign In</router-link>
                  </p>

                </v-form>
              </validation-observer>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-app>     
</template>

<script>
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import AuthService from '../../services/AuthService'

export default {
  name: 'register',
  components: {
    ValidationObserver,
    ValidationProvider
  },
  data() {
    return {
      message: undefined,
      type: undefined,
      loading: false,
      form: {
        email: '',
        name: '',
        password: '',
        re_password: ''
      }
    }
  },

  methods: {
    submit(e) {
      e.preventDefault()
      this.loading = true
      this.$refs.observer.validate().then(valid => {
        if (valid) {
          const data = {
            email: this.form.email,
            name: this.form.name,
            password: this.form.password
          }

          AuthService.signup(data).then((response) => {
            console.log('ieu response ',response)
            this.type = 'success'
            this.loading = false
            this.message = response.message
          },
            (error) => {
              console.log(error)
              this.type = 'error'
              this.loading = false
              this.message = error.message
          })
        } else {
          this.type = 'error'
          this.loading = false
          this.message = 'Data not valid'
        }
      })
    }
  },
}
</script>

<style>

</style>