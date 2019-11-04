<template>
  <div class="code">
    <form v-on:submit.prevent="submitForm" id="codeForm">
        <textarea v-model="userInputCode" form="codeForm" placeholder="// 유저코드를 입력하는 부분입니다.">
        </textarea>
        <textarea v-model="rightInputCode" form="codeForm" placeholder="// 정답코드를 입력하는 부분입니다.">
        </textarea>
        <button>RUN</button>
    </form>
    <div class="clear"></div>
  </div>
</template>

<script>
  import axios from 'axios';

  export default {
    /*jslint devel: true */
    /* eslint-disable no-console */
    /*eslint no-undef: "error"*/
    /*eslint-env node*/
    props: {
      codeStyle: String
    },
    data: function(){
      return {
        userInputCode: '',
        rightInputCode: ''
      }
    },
    methods: {
      submitForm: function(){
        var scope = this;
        var url = 'http://52.78.48.222:3000/mark_code'
        var data = {
          userInputCode: this.userInputCode,
          rightInputCode: this.rightInputCode
        }
        axios.post(url, data)
          .then(function(response) {
            console.log(response);
            // console.log(response.data.ins);
            // console.log(response.data.ans);
            // console.log(response.data.subs);
            var data = JSON.parse(response.data)
            var tc = data.ins
            var u = data.subs
            var r = data.ans
            scope.$emit('printResult', tc, u, r);
          })
          .catch(function(error) {
            console.log(error);
          });
        }
    }
  }
</script>

<style scoped>
  .code {
    height: 45vh;
    width: 100%;
    margin: 0;
    padding: 0;
    float: left;
    background-color: white;
  }

  .code textarea {
    height: 320px;
    width: 49%;
    border: 0px;
  }

  .clear {
    clear: both;
  }
</style>