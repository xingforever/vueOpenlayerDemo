<template>

    <div id="map" ref="rootmap">

    </div>



</template>

<script>
  import "ol/ol.css"
  import mapHelper from '../../utils/mapHelper.js'

  export default {
    name: 'Map',
    data() {
      return {
        map: null
      };
      components: {
        MapChange
      }
    },
    mounted() {
      //初始化地图
      mapHelper.initMap()
      this.map = mapHelper.map
      mapHelper.changeBaseMapVisible(["tdtVec","tdtCva"])

    }
  };
</script>

<style>
  #map {
    height: 100%;
  }

  /*隐藏ol的一些自带元素*/
  .ol-attribution {
    display: none;
  }
</style>