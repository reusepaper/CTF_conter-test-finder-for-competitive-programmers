<template>
  <div class="result">
    {{ resultStyle }}
  </div>
</template>

<script>
  export default {
    props: {
      resultStyle: String
    }
  }
</script>

<style scoped>
  .result {
    height: 25vh;
    width: 25%;
    float: left;
    background-color: white;
  }
</style>