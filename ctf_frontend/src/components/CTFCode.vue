<template>
  <div class="code">
    {{ this.codeStyle }}
  </div>
</template>

<script>
  export default {
    props: {
      codeStyle: String
    }
  }
</script>

<style scoped>
  .code {
    height: 45vh;
    width: 50%;
    margin: 0;
    padding: 0;
    float: left;
    background-color: white;
  }
</style>