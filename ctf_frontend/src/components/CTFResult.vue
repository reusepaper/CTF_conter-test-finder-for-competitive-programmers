<template>
  <div class="result">
    <div v-if="resultStyle === 'userResult'">
      <div>유저결과</div>
      <pre>{{ subs.join('\n') }}
      </pre>
    </div>
    <div v-if="resultStyle === 'rightResult'">
      <div>정답결과</div>
      <pre>{{ ans.join('\n') }}
      </pre>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      resultStyle: String,
      ans: Array,
      subs: Array
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