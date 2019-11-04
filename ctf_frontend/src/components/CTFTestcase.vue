<template>
  <div class="testcase">
    <div>테스트케이스</div>
    <pre>{{ ins.join('\n') }}
    </pre>
  </div>
</template>

<script>
  export default {
    props: ['ins']
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