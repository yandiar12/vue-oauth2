<template>
  <div class="container">
    <div class="justify-content-center">
      <div class="text-center">
        <h1>404</h1>
        <h3>Page not found</h3>
        <router-link tag="a" :to="{ name: 'home' }">back to home</router-link>
      </div>
    </div>
  </div>    
</template>

<script>
export default {
  name: 'page404'
}
</script>

<style>

</style>