<template>
  <div id="app">

    <!-- <Map>
       </Map>
<MapChange/>
<MousePosition/> -->
<MapTools/>

  </div>
</template>

<script>
  import Map from '@/views/map/Map.vue' 
  import test from '@/views/map/test'
  import MapChange from '@/views/map/MapChange'
  import MousePosition from '@/views/map/MousePosition'
  import MapTools from '@/views/map/MapTools'

  export default {
    name: 'app',
    components: {
      Map,
      MapChange,
      MousePosition,
      MapTools
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