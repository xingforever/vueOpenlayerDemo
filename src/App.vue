<template>
  <div id="app">

    <olmap>   
   
    </olmap>
    <mapChange />
    <mapTools />
<mapLayersearch></mapLayersearch>

<!-- <mapLocationsearch></mapLocationsearch> -->
<!-- <test></test> -->
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
 import mapFeatureinfotable from '@/views/map/map-featureinfotable'
  import test from '@/views/map/test'
  // 测试
  export default {
    name: 'app',
    components: {
      olmap,
      mapControls,
      mapChange,
      mapTools,     
      mapLayersearch,
      mapLocationsearch,
      mapFeatureinfotable
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