<template>
  <div id="app" style="width:100% height:100%">
       <router-link to="/map">地图</router-link>
    <router-link to="/back">后台</router-link>
      <router-view></router-view>
   
   
  </div>
</template>

<script>

  // 测试
  export default {
    name: 'app',
    
  
  }
</script>

<style>
  * {
    padding: 0;
    margin: 0;
  }

  html,
  body {
    height: 100%;
  }

  #app {
    height: 100%;
  }
</style>