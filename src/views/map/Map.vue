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
      //初始化 tem图层
      console.log(this.map)
      mapHelper.initTemLayers()
      //设置默认显示图层
      mapHelper.changeBaseMapVisible(["tdtVec","tdtCva"])

    }
  };
</script>

<style>
  #map {
    height: 100%;
    width: 100%;
  }

  /*隐藏ol的一些自带元素*/
  .ol-attribution {
    display: none;
  }
</style>