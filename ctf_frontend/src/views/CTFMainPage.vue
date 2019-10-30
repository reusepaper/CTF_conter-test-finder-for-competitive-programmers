<template>
  <div class="mainPage">
    <CTFHeader></CTFHeader>
    <CTFNavbar></CTFNavbar>
    <div>
      <CTFCode codeStyle="userCode"></CTFCode>
      <CTFCode codeStyle="rightCode"></CTFCode>
    </div>
    <CTFProgressbar></CTFProgressbar>
    <div>
      <CTFTestcase></CTFTestcase>
      <CTFResult resultStyle="userResult"></CTFResult>
      <CTFResult resultStyle="rightResult"></CTFResult>
    </div>
  </div>
</template>

<script>
  import CTFHeader from '../components/CTFHeader';
  import CTFNavbar from '../components/CTFNavbar';
  import CTFCode from '../components/CTFCode';
  import CTFProgressbar from '../components/CTFProgressbar';
  import CTFResult from '../components/CTFResult';
  import CTFTestcase from '../components/CTFTestcase';

  export default {
    components: {
      CTFHeader,
      CTFNavbar,
      CTFCode,
      CTFProgressbar,
      CTFResult,
      CTFTestcase
    }
  }
</script>

<style>
  .mainPage {
    width: 100%;
    height: 100%;
  }

</style>