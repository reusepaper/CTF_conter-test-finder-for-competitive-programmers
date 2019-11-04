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
      <CTFTestcase v-bind:propsTestcase="testcase" v-on:printResult="printTestCase(tc, u, r)"></CTFTestcase>
      <CTFResult v-bind:propsUser="user" v-on:printResult="printUser(tc, u, r)" resultStyle="userResult"></CTFResult>
      <CTFResult v-bind:propsRight="right" v-on:printResult="printRight(tc, u, r)" resultStyle="rightResult"></CTFResult>
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
    },
    data: function(){
      return {
        testcase: '',
        user: '',
        right: ''
      }
    },
    methods: {
      printTestCase: function(tc, u, r){ // eslint-disable-line no-unused-vars
        this.testcase = tc;
      },
      printUser: function(tc, u, r){ // eslint-disable-line no-unused-vars
        this.user = u;
      },
      printRight: function(tc, u, r){ // eslint-disable-line no-unused-vars
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