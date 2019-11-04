<template>
  <div class="mainPage">
    <CTFHeader></CTFHeader>
    <CTFNavbar></CTFNavbar>
    <div>
      <CTFCode v-on:printResult="print"></CTFCode>
      <!-- <CTFCode codeStyle="userCode"></CTFCode>
      <CTFCode codeStyle="rightCode"></CTFCode> -->
    </div>
    <CTFProgressbar></CTFProgressbar>
    <div>
      <CTFTestcase v-bind:ins="testcase"></CTFTestcase>
      <CTFResult v-bind:subs="user" resultStyle="userResult"></CTFResult>
      <CTFResult v-bind:ans="right" resultStyle="rightResult"></CTFResult>
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
    /*jslint devel: true */
    /* eslint-disable no-console */
    /*eslint no-undef: "error"*/
    /*eslint-env node*/
    components: {
      CTFHeader,
      CTFNavbar,
      CTFCode,
      CTFProgressbar,
      CTFResult,
      CTFTestcase
    },
    data: function(){
      return {
        testcase: '',
        user: '',
        right: ''
      }
    },
    methods: {
      print: function(tc, u, r){ // eslint-disable-line no-unused-vars
        console.log(tc);
        this.testcase = tc;
        this.user = u;
        this.right = r;
      }
    }
  }
</script>

<style>
  .mainPage {
    width: 100%;
    height: 100%;
  }

</style>