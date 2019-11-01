<template>
  <div class="header">
    <div class="title">
      맞왜틀
    </div>
    <button class="loginbutton">Login</button>
    <div class="clear"></div>
  </div>
</template>

<script>
  export default {
    
  }
</script>

<style scoped>
  .header {
    height: 10vh;
    width: 100%;
    background-color: #E8F5FF;
  }

  .title {
    float: left;
    font-family: 'Black Han Sans', sans-serif;
    font-size: 5vh;
    color: rgb(68, 68, 68);
    margin: 0;
    padding: 0;
  }

  .loginbutton {
    float: right;
    box-sizing: border-box;
    appearance: none;
    background-color: transparent;
    border: 2px solid rgb(68, 68, 68);
    border-radius: 0.6em;
    color: rgb(68, 68, 68);
    cursor: pointer;
    display: flex;
    align-self: center;
    font-size: 3vh;
    font-weight: 400;
    line-height: 1;
    margin: 1vh;
    padding: 0.8em 2.0em;
    text-decoration: none;
    text-align: center;
    text-transform: uppercase;
    font-family: 'Montserrat', sans-serif;
    font-weight: 700;
    transition: box-shadow 300ms ease-in-out, color 300ms ease-in-out;
  }
  
  .loginbutton::hover,
  .loginbutton::focus {
    color: #fff;
    outline: 0;
    box-shadow: 0 0 40px 40px rgb(68, 68, 68) inset;
  }

  .clear {
    clear: both;
  }
</style>