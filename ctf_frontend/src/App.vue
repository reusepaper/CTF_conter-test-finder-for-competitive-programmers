<template>
  <div id="app">
    <CTFMainPage/>
  </div>
</template>

<script>
import CTFMainPage from './views/CTFMainPage.vue'

export default {
  name: 'app',
  components: {
    CTFMainPage
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
