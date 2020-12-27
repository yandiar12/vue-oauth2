<template>
  <v-app>
    <v-container fluid fill-height class="loginOverlay">
      <v-layout flex align-center justify-center>
        <v-flex xs12 sm4 elevation-6>
          <v-card>
            <v-card-title>Sign In</v-card-title>
            <v-card-text class="pt-4">
              <validation-observer
                ref="observer"
                v-slot="{ invalid }"
              >
                <v-form>
                  <v-alert v-show="message" type="error">{{ message }}</v-alert>
                  
                  <div class="my-3">
                    <validation-provider
                      v-slot="{ errors }"
                      name="Email"
                      rules="required|email"
                    >
                    <v-text-field type="email" id="email" name="email" label="Email" v-model="form.email" :error-messages="errors" @keyup.enter="onLogin($event)"></v-text-field>
                    </validation-provider>
                  </div>
                  
                  <div class="my-3">
                    <validation-provider
                      v-slot="{ errors }"
                      name="Password"
                      rules="required"
                    >
                    <v-text-field type="password" id="password" name="password" label="Password"  v-model="form.password" :error-messages="errors" @keyup.enter="onLogin($event)"></v-text-field>
                    </validation-provider>
                  </div>

                  <div class="my-2">
                    <v-btn 
                      depressed 
                      block 
                      color="info" 
                      elevation="3" 
                      @click="onLogin($event)" 
                      :loading= "loading"
                      :disabled="invalid || loading"
                    >
                      Sign in
                    </v-btn>
                  </div>
                  
                  <div class="or-separator">
                    <span class="or-text">OR</span>
                  </div>

                  <div class="my-2" align="center">
                    <v-btn block outlined color="error" :href="google_auth_url" :disabled="loading">
                      <v-icon left>
                        fa fa-google fa-fw
                      </v-icon>
                      Sign in With Google
                    </v-btn>
                  </div>
                  <div class="my-2" align="center">
                    <v-btn block outlined color="primary" :href="facebook_auth_url" :disabled="loading">
                      <v-icon left>
                        fa fa-facebook fa-fw
                      </v-icon>
                      Sign in With Facebook
                    </v-btn>
                  </div>
                  <div class="my-2" align="center">
                    <v-btn block outlined :href="github_auth_url" :disabled="loading">
                      <v-icon left>
                        fa fa-github fa-fw
                      </v-icon>
                      Sign in With Github
                    </v-btn>
                  </div>
                  <p>
                    don't have an account ? 
                    <router-link tag="a" :to="{ name: 'register' }">Create Account</router-link>
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
import { FACEBOOK_AUTH_URL, GOOGLE_AUTH_URL, GITHUB_AUTH_URL } from '../../config/constant'
import { mapActions } from 'vuex'
import AuthService from '../../services/AuthService'

export default {
  name: 'login',
  components: {
    ValidationObserver,
    ValidationProvider
  },
  data() {
    return {
      loading: undefined,
      message: this.$route.query.error,
      facebook_auth_url: FACEBOOK_AUTH_URL,
      google_auth_url: GOOGLE_AUTH_URL,
      github_auth_url: GITHUB_AUTH_URL,
      form: {
        email: '',
        password: ''
      }
    }
  },
  computed: {
    
  },
  methods: {
    ...mapActions('auth', ['fetchUser']),
    onLogin: async function(e) {
      e.preventDefault();
      
      this.loading = true
      this.$refs.observer.validate().then(valid => {
          if (valid) {
            this.doLogin()
          } else {
            this.loading = false
            this.message = "not valid"
          }
      })
    },
    doLogin: async function() {
      const data = {
        email: this.form.email,
        password: this.form.password
      }
      
      await AuthService.signin(data).then(
        (res) => {
          console.log(res)
          this.loading = false
          this.fetchUser(res)
          this.$router.replace('/')
        },
        (err) => {
          console.log(err)
          this.loading = false
          if (err.status === 401) {
            this.message = 'Email or password incorrect!!'
          } else {
            this.message = err.message
          }
        }
      )
    },
    loginWithGoogle: function(e) {
      e.preventDefault()
    },
    loginWithFacebook: function(e) {
      e.preventDefault()

    }
  }
}
</script>

<style scoped>
  .or-separator {
    border-bottom: 1px solid #eee;
    padding: 10px 0;
    position: relative;
    display: block;
    margin-top: 20px;
    margin-bottom: 30px;
    font-size: 1em;    
  }

  .or-text {
    position: absolute;
    left: 46%;
    top: 0;
    background: #fff;
    padding: 10px;
    color: rgba(0,0,0,.45);
  }
</style>