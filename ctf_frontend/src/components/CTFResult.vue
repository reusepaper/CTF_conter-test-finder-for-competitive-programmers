<template>
  <div class="result">
    <div v-if="resultStyle === userResult">
      {{ propsUser }}
    </div>
    <div v-if="resultStyle === rightResult">
      {{ propsRight }}
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      resultStyle: String,
      propsUser: String,
      propsRight: String
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