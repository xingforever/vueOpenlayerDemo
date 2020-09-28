<template>
  <div id="app">

    <!-- <olmap>   
    <mapControls />
    </olmap>
    <mapChange />
    <mapTools />
<mapLayersearch></mapLayersearch> -->
<mapLocationsearch></mapLocationsearch>
  </div>
</template>

<script>
  import mapTools from '@/views/map/map-tools'
  import mapChange from '@/views/map/map-change'
  import mapControls from '@/views/map/map-controls'
  import olmap from '@/views/map/olmap'
  import mapLayermanager from '@/views/map/map-layermanager'
 import mapLayersearch from '@/views/map/map-layersearch'
 import mapLocationsearch from '@/views/map/map-locationsearch'

  // 测试
  export default {
    name: 'app',
    components: {
      olmap,
      mapControls,
      mapChange,
      mapTools,     
      mapLayersearch,
      mapLocationsearch
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