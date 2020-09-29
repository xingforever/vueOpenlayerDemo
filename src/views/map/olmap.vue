<template>


  <div id="map" ref="rootmap">

 
  </div>

 

</template>

<script>
  import "ol/ol.css"
  import{ toolsHelper, mapHelper}  from '../../utils/mapHelper.js'

  export default {
    name: 'olmap',
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
      //设置默认显示图层
      mapHelper.changeBaseMapVisible(["tdtImg","tdtCia"])
      toolsHelper.navigation();
      
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
  .ol-tooltip-measure,
  .ol-tooltip-static {
	color: red;
}

</style>