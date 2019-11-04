<template>
  <div class="code">
    <form v-on:submit.prevent="submitForm" id="codeForm">
      <div v-if="codeStyle === 'userCode'">
        <form action="post">
          <textarea id="userInputCode" form="codeForm" placeholder="// 유저코드를 입력하는 부분입니다.">
            
          </textarea>
        </form>
        <button>RUN</button>
      </div>
      <div v-if="codeStyle === 'rightCode'">
        <textarea id="rightInputCode" form="codeForm" placeholder="// 정답코드를 입력하는 부분입니다.">

        </textarea>
      </div>
    </form>
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
        var url = 'http://localhost:3000/mark_code'
        var data = {
          userInputCode: this.userInputCode,
          rightInputCode: this.rightInputCode
        }
        axios.post(url, data)
          .then(function(response) {
            this.$emit('printResult', response.testcase, response.user, response.right);
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
    width: 50%;
    margin: 0;
    padding: 0;
    float: left;
    background-color: white;
  }

  .code textarea {
    height: 320px;
    width: 98%;
    border: 0px;
  }
</style>