<template>

  <div style="
    width: 100%;
    height: 100%;
">
    <div id="map" ref="rootmap">
      <div id="mouse-position" class="custom-mouse-position"> </div>
      <div class="custom-zoom" id="zoomControl"> </div>
      <div class="custom-scaleLine" id="scaleLineControl"> </div>
      
    </div>
  <mapChange />
      <mapLayersearch />
     <mapTools/>
  </div>
</template>

<script>
  import "ol/ol.css"
  import {
    toolsHelper,
    mapHelper
  } from '../../utils/mapHelper.js'
  import mapTools from '@/views/map/map-tools'
  import mapChange from '@/views/map/map-change'
  import mapControls from '@/views/map/map-controls'
  import olmap from '@/views/map/olmap'
  import mapLayermanager from '@/views/map/map-layermanager'
  import mapLayersearch from '@/views/map/map-layersearch'
  import mapLocationsearch from '@/views/map/map-locationsearch'
  import mapFeatureinfotable from '@/views/map/map-featureinfotable'
  import test from '@/views/map/test'
  import cesuimmap from '@/views/map/cesuimmap'
 
  export default {
    name: 'map-index',

    data() {
      return {
        olmapshow: true,
        cesuimmapshow: false
      }
    },
    components: {
      olmap,
      mapControls,
      mapChange,
      mapTools,
      mapLayersearch,
      mapLocationsearch,
      mapFeatureinfotable,
      cesuimmap

    },
    mounted() {
      this.getPath()
       mapHelper.initMap()
        mapHelper.changeBaseMapVisible(["tdtImg", "tdtCia"])
          //console.log(mapHelper.olmap)
     console.log('我被加载了')
    },
    methods: {
      //  getShowinfo(olmapshowinfo) {
      //   console.log('收到子组件值')
      //   this.olmapshow = olmapshowinfo
      //   this.cesuimmapshow = !olmapshowinfo
      //   console.log(this.olmapshow)
      // }
      getPath() {
        // console.log(this.$route.path);
        // if (this.$route.path == '/map') {
        //   console.log('路由加载了');
        //   mapHelper.initMap()
        //   console.log(mapHelper.olmap)
        //   // this.map = mapHelper.map
        //   //设置默认显示图层
        //   mapHelper.changeBaseMapVisible(["tdtImg", "tdtCia"])
        
        // }
      }
    },

    watch: {
      '$route': 'getPath'
    },
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