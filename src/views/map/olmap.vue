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
     // toolsHelper.navigation();
//    const url='http://192.168.1.112:6080/arcgis/rest/services/test/WFSService/MapServer/0/query?where=geometry '
//    + encodeURIComponent(
//         '{"xmin":' +
//          3.85735331064E7 +
//           ',"ymin":' +
//           2845214.6052 +
//           ',"xmax":' +
//            3.86027192041E7 +
//           ',"ymax":' +
//           2872162.221 +
//           "}"
//       ) +
// '&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&returnGeometry=true&returnTrueCurves=false&maxAllowableOffset=returnM=false&gdbVersion=&returnDistinctValues=false&f=pjson'
//  console.log(url)
      
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