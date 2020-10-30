<template>


  <div id="map" ref="rootmap"> 
     <div id="mouse-position" class="custom-mouse-position">
  </div>
    <div class="custom-zoom" id="zoomControl"> 
 </div>   
   <div class="custom-scaleLine" id="scaleLineControl">
 
 </div>


  </div>

</template>

<script>
  import "ol/ol.css"
  import {
    toolsHelper,
    mapHelper
  } from '../../utils/mapHelper.js'

  export default {
    name: 'olmap',

      data() {
      return {
       
      }
    },
      
    mounted() {
      //初始化地图
      mapHelper.initMap()
      this.map = mapHelper.map
      //设置默认显示图层
      mapHelper.changeBaseMapVisible(["tdtImg", "tdtCia"])
    
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
  .custom-zoom {
    position: absolute !important;
    float: right !important;
    width: 38px !important;
    height: 57px !important;
    bottom: 100px !important;
    right: 15px !important;
    z-Index: 2 !important;
    background-color: rgba(255, 255, 255, 0.0) !important;
  }

  .custom-scaleLine {
    position: absolute;
    background: rgba(0, 60, 136, 0.3);
    border-radius: 4px;
    bottom: 20px;
    left: 8px;
    padding: 2px;
    position: absolute;
    line-height: 14px !important;
  }

  .ol-scale-line {
    bottom: 25px !important;
    line-height: 14px !important;
  }

  .custom-mouse-position {
    color: red;
    font-size: 15;
    bottom: 2px;
    padding-left: 10px;
    position: absolute;
    line-height: 14px !important;
  }
</style>