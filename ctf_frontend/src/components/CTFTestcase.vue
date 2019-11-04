<template>
  <div class="testcase">
    {{ propsTestcase }}
  </div>
</template>

<script>
  export default {
    props: ['propsTestcase']
  }
</script>

<style scoped>
  .testcase {
    height: 25vh;
    width: 50%;
    float: left;
    background-color: white;
  }

</style>