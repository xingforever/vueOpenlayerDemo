<template>
  <div id="app">

    <Map>
 
       </Map>
    
            <MapTool/>
<MapChange/>
  <MapControls/>


  </div>
</template>

<script>
  import Map from '@/views/map/Map.vue' 
  import test from '@/views/map/test'
  import MapChange from '@/views/map/MapChange'
  import MapControls from '@/views/map/MapControls'
  import MapTool from '@/views/map/MapTool'
// 测试
  export default {
    name: 'app',
    components: {
      Map,
      MapChange,
      MapControls,
      MapTool
  }
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