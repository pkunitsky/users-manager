<template>
  <div id="app">
    <Navbar />
    <div class="container mt-4">
      <router-view />
    </div>
  </div>
</template>

<script>
  import Navbar from '@/components/Navbar'

  export default {
    name: 'App',
    components: {
      Navbar
    }
  }
</script>
