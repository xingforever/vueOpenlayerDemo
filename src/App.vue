<template>
  <div id="app">

    <olmap>   
    <mapControls />
    </olmap>
    <mapChange />
    <mapTools />
<mapTree2></mapTree2>
  </div>
</template>

<script>
  import mapTools from '@/views/map/map-tools'
  import mapChange from '@/views/map/map-change'
  import mapControls from '@/views/map/map-controls'
  import olmap from '@/views/map/olmap'
  import mapTree2 from '@/views/map/map-tree2'
  // 测试
  export default {
    name: 'app',
    components: {
      olmap,
      mapControls,
      mapChange,
      mapTools,
      mapTree2
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